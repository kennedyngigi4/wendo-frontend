"use client";

import React, { useEffect } from 'react';
import { serviceSchema } from '@/lib/validations/all-validations';
import { Controller, useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import { useServicesStore } from '@/stores/services-store';
import { SelectItem } from '@/components/ui/select';
import { CustomMultiSelect } from '@/components/ui/custom-multiselect';
import { CustomRichTextarea } from '@/components/ui/custom-rich-textarea';
import CustomButton from '@/components/ui/custom-button';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { toast } from 'sonner';
import { ApiRequests } from '@/lib/requests/api-requests';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ServiceOfferingDetailsModel } from '@/lib/models/service-models';

interface ServiceFormProps {
    id?: string;
    data?: ServiceOfferingDetailsModel;
}

const ServiceForm = ({ id, data }: ServiceFormProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
    
    const form = useForm<z.infer<typeof serviceSchema>>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            service: "",
            price: "",
            isAvailable: "",
            description: "",
            specialties: [],
        }
    });
    const { isSubmitting } = form.formState;

    const services = useServicesStore((state) => state.services);
    const specialties = useServicesStore((state) => state.specialties);
    const loading = useServicesStore((state) => state.loading);
    const fetchData = useServicesStore((state) => state.fetchData);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    useEffect(() => {
        if (data && services.length > 0 && specialties.length > 0) {
            form.reset({
                service: String(data.service ?? ""),
                price: data.price?.toString() ?? "",
                isAvailable: data.is_available ? "true" : "false",
                description: data.description || "",
                specialties: data.specialties || [],
            });
        }
    }, [data, services, specialties, form]);


    const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
        
        console.log(activeWorkspace.provider_type);
        console.log(activeWorkspace.type);

        try{
            const formData = new FormData();
            formData.append("service", values.service);
            formData.append("price", values.price);
            formData.append("is_available", values.isAvailable);
            formData.append("description", values.description);
            values.specialties.forEach((id) => {
                formData.append("specialties", id);
            });


            let query = "";

            if (activeWorkspace.provider_type === "hospital" || activeWorkspace.provider_type === "clinic") {
                formData.append("branch", activeWorkspace.id);
                query = `?owner_type=branch&branch_id=${activeWorkspace.id}`;
            }
            else if (activeWorkspace.type === "provider") {
                formData.append("provider", activeWorkspace.id);
                query = `?owner_type=provider&provider_id=${activeWorkspace.id}`;
            }
            else if (activeWorkspace.provider_type === "professional") {
                formData.append("professional", activeWorkspace.id);
                query = `?owner_type=professional&professional_id=${activeWorkspace.id}`;
            }


            let resp;
            if (id) {
                resp = await ApiRequests.patch(
                    `services/offerings/${id}/${query}`,
                    formData,
                    session?.accessToken
                );
            } else {
                resp = await ApiRequests.post(
                    `services/offerings/${query}`,
                    formData,
                    session?.accessToken
                );
            }

            
            if(resp.success){
                toast.success(resp.message);
                router.push("/dashboard/provider/hospital/services");
            } else {
                toast.error(resp.message);
            }

        } catch(err){
            toast.error("A network error occured."+err);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <CustomFormField
                            fieldType="select"
                            label="Select Service"
                            control={form.control}
                            name="service"
                            placeholder="Choose a service"
                        >
                            {loading ? (
                                <p>Loading services...</p>
                            ) : (
                                services.map((service) => (
                                    <SelectItem key={service.id} value={service.id}>
                                        {service.name}
                                    </SelectItem>
                                ))
                            )}
                        </CustomFormField>
                    </div>
                    <div>
                        <Controller
                            control={form.control}
                            name="specialties"
                            render={({ field, fieldState }) => (
                                <div>
                                    <FieldLabel className="pb-1.5">Specialties</FieldLabel>

                                    <CustomMultiSelect
                                        options={specialties}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Select specialties"
                                    />

                                    {fieldState.error && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <CustomFormField 
                            fieldType="input"
                            inputType="number"
                            label="Price (optional)"
                            name="price"
                            control={form.control}
                            placeholder="e.g 5000"
                        />
                    </div>
                    <div>
                        <CustomFormField
                            fieldType="select"
                            label="Is it available?"
                            control={form.control}
                            name="isAvailable"
                            placeholder="Choose an option"
                        >
                            <SelectItem value="true">Yes it's available</SelectItem>
                            <SelectItem value="false">No it's not available at the moment</SelectItem>
                        </CustomFormField>
                    </div>
                </div>
                
                <div className="pt-3">
                    <FieldLabel htmlFor="Specialties" className="pb-1.5">
                        Service Description
                    </FieldLabel>

                    <Controller
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <CustomRichTextarea
                                value={field.value || ""}
                                onChange={(html, textLength) => {
                                    field.onChange(html);

                                    if (textLength < 100) {
                                        form.setError("description", {
                                            message: "Bio must be at least 100 characters."
                                        });
                                    } else {
                                        form.clearErrors("description");
                                    }
                                }}
                                error={fieldState.error?.message}
                                placeholder="Describe your experience..."
                            />
                        )}
                    />

                    <FieldDescription className="text-xs text-muted-foreground pt-1">
                        Provide detailed and accurate information about your service and specialties. A detailed service description helps patients understand your expertise and choose you with confidence.
                    </FieldDescription>
                    
                    
                </div> 
                

                <div>
                    <CustomButton
                        label="Save"
                        btnType="submit"
                        variant="secondary"
                        isLoading={isSubmitting}
                    />
                </div>
            </FieldGroup>
        </form>
    )
}

export default ServiceForm
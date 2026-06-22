"use client";

import React, { useEffect, useMemo } from 'react';
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
            serviceCategory: "",
            price: "",
            isAvailable: "",
            description: "",
            service: "",
        }
    });
    const { isSubmitting } = form.formState;
     

    const servicecategories = useServicesStore((state) => state.servicecategories);
    const allservices = useServicesStore((state) => state.services);
    const loading = useServicesStore((state) => state.loading);
    const fetchData = useServicesStore((state) => state.fetchData);

    const selectedCategory = form.watch("serviceCategory");
    const filteredServices = useMemo(() => {
        if (!selectedCategory) return [];

        return allservices
            .filter(service => service.category.id === selectedCategory)
            .map(service => ({
                value: service.id,
                label: service.name,
            }));
    }, [allservices, selectedCategory]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    useEffect(() => {
        if (data && allservices.length > 0 && servicecategories.length > 0) {
            form.reset({
                serviceCategory: String(data.service ?? ""),
                price: data.price?.toString() ?? "",
                isAvailable: data.is_available ? "true" : "false",
                description: data.description || "",
                service: data.service || "",
            });
        }
    }, [data, allservices, servicecategories, form]);


    const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
        
        

        try{
            const formData = new FormData();
            formData.append("service_category", values.serviceCategory);
            formData.append("price", values.price);
            formData.append("is_available", values.isAvailable);
            formData.append("description", values.description);
            formData.append("service", values.service);


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
                            label="Select Service Category"
                            control={form.control}
                            name="serviceCategory"
                            placeholder="Choose a service category"
                            onValueChange={(value) => {
                                form.setValue("serviceCategory", value);
                                form.setValue("service", ""); 
                            }}
                        >
                            {loading ? (
                                <p>Loading services...</p>
                            ) : (
                                servicecategories.map((service) => (
                                    <SelectItem key={service.id} value={service.id}>
                                        {service.name}
                                    </SelectItem>
                                ))
                            )}
                        </CustomFormField>
                    </div>
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
                                filteredServices.map((service) => (
                                    <SelectItem key={service.value} value={service.value}>
                                        {service.label}
                                    </SelectItem>
                                ))
                            )}
                        </CustomFormField>
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
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { clinicSchema } from '@/lib/validations/provider-validations';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import { CustomRichTextarea } from '@/components/ui/custom-rich-textarea';
import CustomButton from '@/components/ui/custom-button';
import { ImagePlus, Pencil, PlusSquareIcon, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { CustomMultiSelect } from '@/components/ui/custom-multiselect';
import { CONSTANTS } from '@/lib/constants/constants';
import { ApiRequests } from '@/lib/requests/api-requests';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { ClinicDetailsModel, SpecialistCardModel } from '@/lib/models/provider-models';

interface ClinicFormProps {
    id?: string;
    data?: ClinicDetailsModel;
    specialistsOptions?: SpecialistCardModel[];
    branch_id?: string;
}


const formatTime = (t: string) => t?.length === 5 ? `${t}:00` : t;

const ClinicForm = ({ id, data, branch_id, specialistsOptions }: ClinicFormProps) => {

    const {data:session} = useSession();
    const router = useRouter();
    const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);

    const bannerInputRef = useRef<HTMLInputElement | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof clinicSchema>>({
        resolver: zodResolver(clinicSchema),
        defaultValues: {
            title: "",
            consultation_fee: "",
            description: "",
            specialists: [],
            days_of_week: [],
            start_time: "",
            end_time: "",
        }
    });
    const { isSubmitting } = form.formState;


    useEffect(() => {
        if(!data) return;
        
        form.reset({
            title: data.title ?? "",
            consultation_fee: data.consultation_fee ?? "",
            description: data.description ?? "",

            specialists: Array.isArray(data.specialists)
                ? data.specialists.map((s: any) => s.id ?? s)
                : [],

            days_of_week: Array.isArray(data.days_of_week)
                ? data.days_of_week.map(String)
                : ["1"],
            start_time: data.start_time ?? "",
            end_time: data.end_time ?? "",
        });

        if(data.banner){
            setBannerPreview(data.banner);
        }
        
    }, [data, form])


    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setBannerFile(file);
            setBannerPreview(url);
        }
    }

    const removeBanner = () => {
        setBannerPreview(null);
        if (bannerInputRef.current) bannerInputRef.current.value = "";
    };

    const onSubmit = async(values: z.infer<typeof clinicSchema>) => {

        console.log(id);
        console.log(branch_id);


        try{
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("consultation_fee", String(values.consultation_fee));
            formData.append("days_of_week", JSON.stringify(values.days_of_week.map(Number)));
            formData.append("start_time", formatTime(values.start_time));
            formData.append("end_time", formatTime(values.end_time));
            formData.append("description", values.description);
            formData.append("branch", activeWorkspace.id);
            values.specialists.forEach((id) => {
                formData.append("specialists", id);
            });
            if (bannerFile) {
                formData.append("banner", bannerFile);
            }

            let resp;
            if(id){
                resp = await ApiRequests.patch(`providers/branch_clinics/${id}/?owner_type=branch&branch_id=${branch_id}`, formData, session?.accessToken);
            } else {
                resp = await ApiRequests.post(`providers/branch_clinics/`, formData, session?.accessToken);
            }

            if(resp.success){
                toast.success(resp.message);
                router.push("/dashboard/provider/hospital/clinics");
            } else {
                toast.error(resp.message);
            }

        } catch(err){
            toast.error("A network error occured.")
        }
    }

    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h1 className="font-semibold text-lg text-secondary">
                    {id ? "Edit Clinic" : "Add New Clinic Session"}
                </h1>
            </div>
        
            <div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">
                    <div className="md:col-span-8">
                        <h3 className="font-semibold text-primary">Banner</h3>

                        <div
                            onClick={() => bannerInputRef.current?.click()}
                            className="relative overflow-hidden md:h-[200px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50"
                        >
                            {bannerPreview ? (
                                <>
                                    <Image
                                        src={bannerPreview}
                                        alt="Banner preview"
                                        fill
                                        unoptimized
                                        className="object-contain"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                bannerInputRef.current?.click();
                                            }}
                                            className="bg-white p-1 rounded-full shadow"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeBanner();
                                            }}
                                            className="bg-white p-1 rounded-full shadow"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <ImagePlus size={28} />
                                    <span className="text-sm">Upload Clinic Banner</span>
                                    <span className="text-sm font-semibold">1920px by 1080px</span>
                                </div>
                            )}

                            <input
                                ref={bannerInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleBannerChange}
                            />
                        </div>
                    </div>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                            <div className="md:col-span-9">
                                <CustomFormField
                                    fieldType="input"
                                    name="title"
                                    control={form.control}
                                    label="Title"
                                    placeholder="e.g Mother and child health clinic"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <CustomFormField
                                    fieldType="input"
                                    name="consultation_fee"
                                    control={form.control}
                                    inputType="number"
                                    label="Consultation Fee(optional)"
                                    placeholder="e.g 2500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <div>
                                <FieldLabel htmlFor="days_of_week" className="pb-1.5">
                                    Clinic Days
                                </FieldLabel>
                                <CustomMultiSelect
                                    options={CONSTANTS.weekDays}
                                    value={form.watch("days_of_week")}
                                    onChange={(vals) => form.setValue("days_of_week", vals)}
                                    placeholder="Select clinic days"
                                />
                            </div>
                            <div>
                                <CustomFormField
                                    fieldType="input"
                                    inputType="time"
                                    name="start_time"
                                    control={form.control}
                                    label="Start Time"
                                    placeholder="e.g 2500"
                                />
                            </div>
                            <div>
                                <CustomFormField
                                    fieldType="input"
                                    inputType="time"
                                    name="end_time"
                                    control={form.control}
                                    label="End time"
                                    placeholder="e.g 2500"
                                />
                            </div>
                            <div>
                                <FieldLabel htmlFor="days_of_week" className="pb-1.5">
                                    Specialists
                                </FieldLabel>
                                <CustomMultiSelect
                                    options={specialistsOptions ?? []}
                                    value={form.watch("specialists")}
                                    onChange={(vals) => form.setValue("specialists", vals)}
                                    placeholder="Choose specialists"
                                />
                            </div>
                        </div>
                        <div>
                            <FieldLabel htmlFor="Specialties" className="pb-1.5">
                                Clinic Description
                            </FieldLabel>

                            <CustomRichTextarea
                                value={form.watch("description")}
                                onChange={(html, textLength) => {
                                    form.setValue("description", html, { shouldValidate: true })

                                    if (textLength < 100) {
                                        form.setError("description", { message: "Bio must be at least 100 characters." })
                                    } else {
                                        form.clearErrors("description")
                                    }
                                }}
                                error={form.formState.errors.description?.message}
                                placeholder="Describe your experience..."
                            />

                            <FieldDescription className="text-xs text-muted-foreground pt-1">
                                Provide detailed and accurate information about this clinic session. A complete description helps patients understand and choose you with confidence.
                            </FieldDescription>
                        </div>

                        <div>
                            <CustomButton 
                                label={id ? "Save Changes" : "Add Clinic"}
                                btnType="submit"
                                isLoading={isSubmitting}
                                loadingText="processing"
                                variant="secondary"
                                prefixIcon={{ type: "lucide", icon: PlusSquareIcon }}
                                size="sm"
                            />
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
}

export default ClinicForm
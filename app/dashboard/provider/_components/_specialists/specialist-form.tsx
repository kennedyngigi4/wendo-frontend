"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { specialistSchema } from '@/lib/validations/provider-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, Pencil, PlusSquareIcon, X } from 'lucide-react';
import Image from 'next/image';
import CustomFormField from '@/components/ui/custom-form-field';
import { CONSTANTS } from '@/lib/constants/constants';
import { SelectItem } from '@/components/ui/select';
import { FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { CustomMultiSelect } from '@/components/ui/custom-multiselect';
import { useProfessionStore } from '@/stores/profession-store';
import { useServicesStore } from '@/stores/services-store';
import { CustomRichTextarea } from '@/components/ui/custom-rich-textarea';
import CustomButton from '@/components/ui/custom-button';
import { toast } from 'sonner';
import { ApiRequests } from '@/lib/requests/api-requests';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { SpecialistDetailsModel } from '@/lib/models/provider-models';


interface SpecialistFormProps {
    id?: string;
    data?: SpecialistDetailsModel;
    branch_id?: string;
}

const SpecialistForm = ({ id, data, branch_id }: SpecialistFormProps) => {
    const { data:session } = useSession();
    const router = useRouter();
    const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
    
    const profilePhotoInputRef = useRef<HTMLInputElement | null>(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

    // Profession and specialties change watch
    const professions = useProfessionStore((state) => state.professions)
    const specialties = useServicesStore((state) => state.specialties);

    const form = useForm<z.infer<typeof specialistSchema>>({
        resolver: zodResolver(specialistSchema),
        defaultValues: {
            title: "",
            name: "",
            profession: "",
            specialties: [],
            bio: "",
        }
    });
    const { isSubmitting } = form.formState;


    useEffect(() => {
        if(data){
            form.reset({
                title: data.title ?? "",
                name: data.name ?? "",
                profession: data.profession ?? "",
                specialties: data.specialties ?? [],
                bio: data.bio ?? "",
            });

            if (data.photo) {
                setProfilePhotoPreview(data.photo);
            }
        }
    }, [data, form]);

    const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            const url = URL.createObjectURL(file);
            setProfilePhotoFile(file);
            setProfilePhotoPreview(url);
        }
    }

    const removeProfilePhoto = () => {
        setProfilePhotoPreview(null);
        if(profilePhotoInputRef.current) profilePhotoInputRef.current.value = "";
    }


    const onSubmit = async (values: z.infer<typeof specialistSchema>) => {
        
        try{ 
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("name", values.name);
            formData.append("profession", values.profession);
            formData.append("bio", values.bio);
            values.specialties?.forEach((id) => {
                formData.append("specialties", id);
            });
            if (profilePhotoFile) {
                formData.append("photo", profilePhotoFile);
            }
            formData.append("branch", activeWorkspace.id);

            let resp;
            if(id){
                resp = await ApiRequests.patch(`providers/branch_specialists/${id}/?owner_type=branch&branch_id=${branch_id}`, formData, session?.accessToken);
            } else {
                resp = await ApiRequests.post("providers/branch_specialists/", formData, session?.accessToken);
            }
            
            if(resp.success){
                toast.success(resp.message);
                router.push("/dashboard/provider/hospital/specialists/");
            } else {
                toast.error(resp.message);
            }
            
        } catch(err){
            toast.error("A network error occured.");
        }
    }

    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h1 className="font-semibold text-lg text-secondary">
                    {id ? "Edit Specialist" : "Add New Specialist"}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">
                <div className="md:col-span-4">
                    <h3 className="font-semibold text-primary">Profile Photo</h3>
                    <div
                    onClick={() => profilePhotoInputRef.current?.click()}
                    className="relative overflow-hidden md:h-[200px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                    {profilePhotoPreview ? ( 
                        <>
                        <Image 
                            src={profilePhotoPreview}
                            alt="Logo preview"
                            fill
                            unoptimized
                            className="object-contain"
                        />

                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                            onClick={(e) => {
                                e.stopPropagation();
                                profilePhotoInputRef.current?.click();
                            }}
                            className="bg-white p-1 rounded-full shadow"
                            >
                            <Pencil size={16} />
                            </button>

                            <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeProfilePhoto();
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
                            <span className="text-sm">Upload Profile Photo</span>
                            <span className="text-xs text-center px-1">Use a clear photo of yourself to build trust with patients.</span>
                            <span className="text-xs font-semibold text-center px-1">500px by 500px</span>
                        </div>
                    )}
                    
                    <input
                        ref={profilePhotoInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleProfilePhotoChange}
                    />
                    </div>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        <div className="md:col-span-3">
                            <CustomFormField
                                fieldType="select"
                                label="Title"
                                control={form.control}
                                name="title"
                                placeholder="Choose a title"
                            >
                                {CONSTANTS.titles.map((title) => (
                                    <SelectItem value={title.value} key={title.value}>{title.label}</SelectItem>
                                ))}
                            </CustomFormField>
                        </div>
                        <div className="md:col-span-9">
                            <CustomFormField
                                fieldType="input"
                                label="Full Name"
                                control={form.control}
                                name="name"
                                placeholder="Enter specialist full name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="">
                            <CustomFormField
                                fieldType="select"
                                label="Specialist Profession"
                                control={form.control}
                                name="profession"
                                placeholder="Choose a profession"
                            >
                                {professions.map((profession) => (
                                    <SelectItem value={profession.id} key={profession.id}>{profession.name}</SelectItem>
                                ))}
                            </CustomFormField>
                        </div>
                        <div className="">
                            <FieldLabel htmlFor="Specialties" className="pb-1.5">
                                Specialties
                            </FieldLabel>
                            <CustomMultiSelect
                                options={specialties}
                                value={form.watch("specialties")}
                                onChange={(vals) => form.setValue("specialties", vals)}
                                placeholder="Select specialties"
                            />
                        </div>
                    </div>

                    <div>
                        <FieldLabel htmlFor="Specialties" className="pb-1.5">
                            Specialist bio
                        </FieldLabel>

                        <CustomRichTextarea
                            value={form.watch("bio")}
                            onChange={(html, textLength) => {
                                form.setValue("bio", html, { shouldValidate: true })

                                if (textLength < 100) {
                                    form.setError("bio", { message: "Bio must be at least 100 characters." })
                                } else {
                                    form.clearErrors("bio")
                                }
                            }}
                            error={form.formState.errors.bio?.message}
                            placeholder="Describe your experience..."
                        />

                        <FieldDescription className="text-xs text-muted-foreground pt-1">
                            Provide detailed and accurate information about your specialist, specialties, and services. A complete profile helps patients understand their expertise and choose you with confidence.
                        </FieldDescription>
                    </div>

                    <div>
                        <CustomButton 
                            label={id ? "Save Changes" : "Add Specialist"}
                            btnType="submit"
                            variant="secondary"
                            isLoading={isSubmitting}
                            loadingText="Processing ..."
                            size="xs"
                            prefixIcon={{ type: "lucide", icon: PlusSquareIcon }}
                        />
                    </div>
                </FieldGroup>
            </form>
        </div>
    )
}

export default SpecialistForm
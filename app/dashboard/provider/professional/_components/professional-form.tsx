"use client";

import React, { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { professionalSchema } from "@/lib/validations/professional-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldDescription, FieldGroup, FieldLabel, FieldSet, } from "@/components/ui/field";
import CustomFormField from "@/components/ui/custom-form-field";
import { CONSTANTS } from "@/lib/constants/constants";
import { SelectItem } from "@/components/ui/select";
import { CustomMultiSelect } from "@/components/ui/custom-multiselect";
import CustomButton from "@/components/ui/custom-button";
import { CustomRichTextarea } from "@/components/ui/custom-rich-textarea";
import { toast } from "sonner";
import { ApiRequests } from "@/lib/requests/api-requests";
import { useSession } from "next-auth/react";
import { ImagePlus, Pencil, Send, X, MapPin, } from "lucide-react";
import Image from "next/image";
import { Specialty, } from "@/lib/models/profession-models";
import { useProfessionStore } from "@/stores/profession-store";
import { useServicesStore } from "@/stores/services-store";
import { useRouter } from "next/navigation";

// IMPORT YOUR LOCATION COMPONENT
import LocationAutocomplete from "@/components/ui/location-autocomplete";

interface ProfessionalFormProps {
    id?: string;
    userData?: any;
}

const ProfessionalForm = ({ id, userData }: ProfessionalFormProps) => {

    

    const { data: session } = useSession();
    const router = useRouter();

    // IMAGE STATES
    const profilePhotoInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);

    const [profilePhotoPreview, setProfilePhotoPreview] =
        useState<string | null>(null);

    const [profilePhotoFile, setProfilePhotoFile] =
        useState<File | null>(null);

    const [bannerFile, setBannerFile] =
        useState<File | null>(null);

    const [bannerPreview, setBannerPreview] =
        useState<string | null>(null);

    // FORM
    const form = useForm<z.infer<typeof professionalSchema>>({
        resolver: zodResolver(professionalSchema),

        defaultValues: {
            title: "",
            name: "",
            licenseNumber: "",
            yearsOfExperience: "",
            fee: "",
            profession: "",
            specialties: [],
            bio: "",
            gender: "",
            phone: "",
            email: "",
            website: "",

            // LOCATION
            country: "ke",
            location_name: "",
            latitude: "",
            longitude: "",

            consultationTypes: [],
            introductionVideoUrl: "",
        },
    });

    const { isSubmitting } = form.formState;

    // STORES
    const professions = useProfessionStore(
        (state) => state.professions
    );

    const specialties = useServicesStore(
        (state) => state.specialties
    );

    // WATCHERS

    const selectedCountry = form.watch("country");

    useEffect(() => {

        if (!userData?.professional) return;

        const professional = userData.professional;

        form.reset({
            title: professional.title || "",
            name: professional.name || "",
            licenseNumber: professional.license_number || "",
            yearsOfExperience: professional.years_of_experience?.toString() || "",
            fee: professional.consultation_fee?.toString() || "",

            // IMPORTANT
            profession: professional.professional_type?.id || "",

            specialties:
                professional.specialties?.map(
                    (item: any) => item.id
                ) || [],

            bio: professional.bio || "",
            gender: professional.gender || "",
            phone: professional.phone || "",
            email: professional.email || "",
            website: professional.website || "",

            country: professional.country || "ke",
            location_name: professional.location_name || "",
            latitude: professional.latitude?.toString() || "",
            longitude: professional.longitude?.toString() || "",

            // IMPORTANT
            consultationTypes:
                professional.consultation_types || [],

            introductionVideoUrl:
                professional.introduction_video_url || "",
        });

        // IMAGE PREVIEWS
        if (professional.profile_photo) {
            setProfilePhotoPreview(
                professional.profile_photo
            );
        }

        if (professional.banner) {
            setBannerPreview(
                professional.banner
            );
        }

    }, [userData, form]);


    // PROFILE PHOTO
    const handleProfilePhotoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);

            setProfilePhotoFile(file);
            setProfilePhotoPreview(url);
        }
    };

    const removeProfilePhoto = () => {
        setProfilePhotoPreview(null);

        if (profilePhotoInputRef.current) {
            profilePhotoInputRef.current.value = "";
        }
    };

    // BANNER
    const handleBannerChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);

            setBannerFile(file);
            setBannerPreview(url);
        }
    };

    const removeBanner = () => {

        setBannerPreview(null);

        if (bannerInputRef.current) {
            bannerInputRef.current.value = "";
        }
    };

    // SUBMIT
    const onSubmit = async (values: z.infer<typeof professionalSchema>) => {

        

        try {

            if (!session?.accessToken) return;

            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("title", values.title);
            formData.append(
                "license_number",
                values.licenseNumber
            );

            formData.append("bio", values.bio);

            formData.append(
                "years_of_experience",
                values.yearsOfExperience
            );

            formData.append(
                "consultation_fee",
                values.fee
            );

            formData.append(
                "professional_type",
                values.profession
            );

            formData.append("gender", values.gender);
            formData.append("phone", values.phone);
            formData.append("email", values.email);
            formData.append("website", values.website);

            // LOCATION
            formData.append(
                "country",
                values.country
            );

            formData.append("location_name",values.location_name);
            formData.append( "latitude", String(values.latitude));
            formData.append("longitude", String(values.longitude));

            if (profilePhotoFile) {
                formData.append(
                    "profile_photo",
                    profilePhotoFile
                );
            }

            if (bannerFile) {
                formData.append(
                    "banner",
                    bannerFile
                );
            }

            values.specialties.forEach((id) => {
                formData.append("specialties", id);
            });

            values.consultationTypes.forEach((type) => {
                formData.append("consultation_types", type);
            });

            formData.append("introduction_video_url", values.introductionVideoUrl);


            


            let resp;
            if(id){
                resp = await ApiRequests.patch(
                    `professionals/profession/update/`,
                    formData,
                    session?.accessToken
                );
            } else {
                resp = await ApiRequests.post(
                    "professionals/profession/",
                    formData,
                    session?.accessToken
                );
            }

            console.log(resp);
           

            if (resp.success) {

                toast.success(resp.message);

                window.location.href =
                    "/dashboard/provider/professional";

            } else {
                toast.error(resp.message);
            }

        } catch (error) {

            toast.error(
                "A network error occurred."
            );
        }
    };

    const onError = (errors: any) => {
        console.log("FORM ERRORS", errors);
    };

    return (
        <div className="space-y-8">

            {/* MEDIA */}
            <div className="bg-white border rounded-3xl p-6">

                <h2 className="text-xl font-bold text-secondary mb-6">
                    Media Uploads
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                    {/* PROFILE PHOTO */}
                    <div className="md:col-span-4">

                        <h3 className="font-semibold text-primary mb-3">
                            Profile Photo
                        </h3>

                        <div
                            onClick={() =>
                                profilePhotoInputRef.current?.click()
                            }
                            className="
                                relative
                                overflow-hidden
                                h-[180px]
                                md:h-[220px]
                                border-2
                                border-dashed
                                border-gray-300
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:bg-gray-50
                                transition
                            "
                        >
                            {profilePhotoPreview ? (
                                <>
                                    <Image
                                        unoptimized
                                        src={profilePhotoPreview}
                                        alt="Profile Preview"
                                        fill
                                        className="object-cover"
                                    />

                                    <div className="absolute top-3 right-3 flex gap-2">

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                profilePhotoInputRef.current?.click();
                                            }}
                                            className="bg-white p-2 rounded-full shadow"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeProfilePhoto();
                                            }}
                                            className="bg-white p-2 rounded-full shadow"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500 px-4">

                                    <ImagePlus size={30} />

                                    <span className="text-sm font-medium mt-2">
                                        Upload Profile Photo
                                    </span>

                                    <span className="text-xs text-center mt-1">
                                        Use a clear professional photo to build trust.
                                    </span>

                                    <span className="text-xs font-semibold mt-2">
                                        Recommended: 500 × 500
                                    </span>
                                </div>
                            )}

                            <input
                                ref={profilePhotoInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfilePhotoChange}
                            />
                        </div>
                    </div>

                    {/* BANNER */}
                    <div className="md:col-span-8">

                        <h3 className="font-semibold text-primary mb-3">
                            Profile Banner
                        </h3>

                        <div
                            onClick={() =>
                                bannerInputRef.current?.click()
                            }
                            className="
                                relative
                                overflow-hidden
                                h-[180px]
                                md:h-[220px]
                                border-2
                                border-dashed
                                border-gray-300
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:bg-gray-50
                                transition
                            "
                        >
                            {bannerPreview ? (
                                <>
                                    <Image
                                        src={bannerPreview}
                                        alt="Banner Preview"
                                        fill
                                        className="object-cover"
                                    />

                                    <div className="absolute top-3 right-3 flex gap-2">

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                bannerInputRef.current?.click();
                                            }}
                                            className="bg-white p-2 rounded-full shadow"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeBanner();
                                            }}
                                            className="bg-white p-2 rounded-full shadow"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500 px-4">

                                    <ImagePlus size={30} />

                                    <span className="text-sm font-medium mt-2">
                                        Upload Banner
                                    </span>

                                    <span className="text-xs text-center mt-1">
                                        Upload a banner representing your practice.
                                    </span>

                                    <span className="text-xs font-semibold mt-2">
                                        Recommended: 1400 × 400
                                    </span>
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
            </div>

            {/* FORM */}
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-8"
            >

                {/* PROFESSIONAL INFO */}
                <div className="bg-white border rounded-3xl p-6 space-y-6">

                    <h2 className="text-xl font-bold text-secondary">
                        Professional Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                        <div className="md:col-span-3">
                            <CustomFormField
                                fieldType="select"
                                label="Title"
                                control={form.control}
                                name="title"
                                placeholder="Choose title"
                            >
                                {CONSTANTS.titles.map((title) => (
                                    <SelectItem
                                        value={title.value}
                                        key={title.value}
                                    >
                                        {title.label}
                                    </SelectItem>
                                ))}
                            </CustomFormField>
                        </div>

                        <div className="md:col-span-6">
                            <CustomFormField
                                fieldType="input"
                                label="Full Name"
                                control={form.control}
                                name="name"
                                placeholder="e.g Dr. John Doe"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <CustomFormField
                                fieldType="input"
                                label="License Number"
                                inputType="text"
                                control={form.control}
                                name="licenseNumber"
                                placeholder="Enter license number"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                        <div className="md:col-span-2">
                            <CustomFormField
                                fieldType="input"
                                label="Experience"
                                inputType="number"
                                control={form.control}
                                name="yearsOfExperience"
                                placeholder="Years"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <CustomFormField
                                fieldType="input"
                                label="Consultation Fee"
                                inputType="number"
                                control={form.control}
                                name="fee"
                                placeholder="KES 3500"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <CustomFormField
                                fieldType="select"
                                label="Profession"
                                control={form.control}
                                name="profession"
                                placeholder="Choose profession"
                            >
                                {professions.map((profession) => (
                                    <SelectItem
                                        value={profession.id}
                                        key={profession.id}
                                    >
                                        {profession.name}
                                    </SelectItem>
                                ))}
                            </CustomFormField>
                        </div>

                        <div className="md:col-span-5">

                            <FieldLabel className="pb-1.5">
                                Specialties
                            </FieldLabel>

                            <CustomMultiSelect
                                options={specialties}
                                value={form.watch("specialties")}
                                onChange={(vals) =>
                                    form.setValue(
                                        "specialties",
                                        vals
                                    )
                                }
                                placeholder="Select specialties"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        
                        <div className="md:col-span-4">

                            <FieldLabel className="pb-1.5">
                                Consultation Types
                            </FieldLabel>

                            <CustomMultiSelect
                                options={CONSTANTS.CONSULTATION_TYPES}
                                value={form.watch("consultationTypes")}
                                onChange={(vals) =>
                                    form.setValue(
                                        "consultationTypes",
                                        vals
                                    )
                                }
                                placeholder="Select consultation type"
                            />
                        </div>
                        

                        <div className="md:col-span-4">
                            <CustomFormField
                                fieldType="input"
                                label="Video Url"
                                control={form.control}
                                name="introductionVideoUrl"
                                placeholder="e.g https://youtube.com/...."
                            />
                        </div>
                    </div>
                </div>

                {/* CONTACT & LOCATION */}
                <div className="bg-white border rounded-3xl p-6 space-y-6">

                    <h2 className="text-xl font-bold text-secondary">
                        Contact & Location
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                        <CustomFormField
                            fieldType="select"
                            label="Gender"
                            control={form.control}
                            name="gender"
                            placeholder="Choose gender"
                        >
                            <SelectItem value="female">
                                Female
                            </SelectItem>

                            <SelectItem value="male">
                                Male
                            </SelectItem>
                        </CustomFormField>

                        <CustomFormField
                            fieldType="phone"
                            label="Phone Number"
                            control={form.control}
                            name="phone"
                            placeholder="e.g 0740733604"
                        />

                        <CustomFormField
                            fieldType="input"
                            label="Email"
                            control={form.control}
                            name="email"
                            placeholder="e.g doctor@email.com"
                        />

                        <CustomFormField
                            fieldType="input"
                            label="Website"
                            inputType="url"
                            control={form.control}
                            name="website"
                            placeholder="https://website.com"
                        />
                    </div>

                    {/* LOCATION */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                        <div className="md:col-span-3">

                            <CustomFormField
                                fieldType="select"
                                label="Country"
                                control={form.control}
                                name="country"
                                placeholder="Select country"
                            >
                                <SelectItem value="ke">
                                    Kenya
                                </SelectItem>

                                <SelectItem value="ug">
                                    Uganda
                                </SelectItem>

                                <SelectItem value="rw">
                                    Rwanda
                                </SelectItem>
                            </CustomFormField>
                        </div>

                        <div className="md:col-span-9">

                            <LocationAutocomplete
                                label="Location"
                                placeholder="Search your clinic location"
                                value={form.watch("location_name")}
                                countries={[
                                    selectedCountry.toLowerCase(),
                                ]}
                                onChange={(data) => {

                                    form.setValue(
                                        "location_name",
                                        data.location_name
                                    );

                                    form.setValue(
                                        "latitude",
                                        String(data.latitude)
                                    );

                                    form.setValue(
                                        "longitude",
                                        String(data.longitude)
                                    );
                                }}
                            />
                            <FieldDescription className="text-xs text-muted-foreground">
                                Your location helps patients discover nearby healthcare services and improves visibility within your region.
                            </FieldDescription>
                        </div>
                    </div>

                    
                </div>

                {/* BIO */}
                <div className="bg-white border rounded-3xl p-6 space-y-5">

                    <h2 className="text-xl font-bold text-secondary">
                        Professional Bio
                    </h2>

                    <div>

                        <FieldLabel className="pb-2">
                            Your Bio
                        </FieldLabel>

                        <CustomRichTextarea
                            value={form.watch("bio")}
                            onChange={(html, textLength) => {

                                form.setValue(
                                    "bio",
                                    html,
                                    {
                                        shouldValidate: true,
                                    }
                                );

                                if (textLength < 100) {

                                    form.setError(
                                        "bio",
                                        {
                                            message:
                                                "Bio must be at least 100 characters.",
                                        }
                                    );

                                } else {

                                    form.clearErrors("bio");
                                }
                            }}
                            error={
                                form.formState.errors.bio?.message
                            }
                            placeholder="
Describe your experience, specialties,
treatment approach, achievements,
and the type of patients you commonly help.
                            "
                        />

                        <FieldDescription className="text-xs text-muted-foreground pt-2">
                            A complete profile builds trust and helps patients understand your expertise before booking.
                        </FieldDescription>
                    </div>
                </div>

                {/* SUBMIT */}
                <div className="flex justify-end">

                    <CustomButton
                        label="Submit Profile"
                        btnType="submit"
                        isLoading={isSubmitting}
                        loadingText="Processing ..."
                        variant="secondary"
                        suffixIcon={{
                            type: "lucide",
                            icon: Send,
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProfessionalForm;


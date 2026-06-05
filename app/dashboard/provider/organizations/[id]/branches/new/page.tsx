"use client";

import React, { useRef, useState } from 'react'
import * as z from "zod";
import { providerBranchSchema } from '@/lib/validations/provider-validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import CustomButton from '@/components/ui/custom-button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImagePlus, Pencil, X } from 'lucide-react';
import { SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { ApiRequests } from '@/lib/requests/api-requests';
import { useSession } from 'next-auth/react';
import LocationAutocomplete from '@/components/ui/location-autocomplete';

type NewBranchPageProps = {
  id: string;
}

const NewBranchPage = ({ params }: { params: Promise<NewBranchPageProps>}) => {
  const { id } = React.use(params);

  const router = useRouter();
  const { data:session} = useSession();

  const form = useForm<z.infer<typeof providerBranchSchema>>({
    resolver: zodResolver(providerBranchSchema),
    defaultValues: {
      name: "",
      phone: "",
      emergencyPhone: "",
      email: "",
      location_name: "",
      latitude: "",
      longitude: "",
      isMainBranch: "",
    }
  });
  const { isSubmitting } = form.formState;

  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const url = URL.createObjectURL(file);
      setBannerPreview(url);
      setBannerFile(file);
    }
  }

  const removeBanner = () => {
    setBannerPreview(null);
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  }

  const onSubmit = async(values: z.infer<typeof providerBranchSchema>) => {
    try {
      if(!session?.accessToken) return;

      const formData = new FormData;
      formData.append("provider", id);
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("location_name", values.location_name);
      formData.append("latitude", String(values.latitude));
      formData.append("longitude", String(values.longitude));
      
      if(values.email){
        formData.append("email", values.email);
      }

      if (values.emergencyPhone) {
        formData.append("emergency_phone", values.emergencyPhone);
      }

      if (values.isMainBranch) {
        formData.append("is_main_branch", values.isMainBranch);
      }

      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      const resp = await ApiRequests.post("providers/branches/", formData, session?.accessToken);
    
      if(resp.success){
        toast.success(resp.message);
        window.location.href = "/dashboard/provider/branches";
      } else {
        toast.error(resp.message);
      }

    } catch(err){
      toast.error("A network error occurred.");
    }
  }

  return (
    <div className="bg-white shadow my-5 p-5 rounded-lg">
      <div className="pb-6">
        <h1 className="text-secondary font-semibold">Create new branch</h1>
        <p className="text-muted-foreground text-sm">Now add the physical locations where your services are offered (e.g. clinics, hospitals, outlets).</p>
      </div>

      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-4">
                  <CustomFormField
                    fieldType="input"
                    label="Branch Name"
                    control={form.control}
                    name="name"
                    placeholder="e.g Afyhub Kenya"
                  />


                  <CustomFormField
                    fieldType="input"
                    inputType="email"
                    label="Email"
                    control={form.control}
                    name="email"
                    placeholder="e.g afyhubkenya@afyhub.africa"
                  />

                  <div>
                    <LocationAutocomplete
                        label="Location"
                        placeholder="Search your location"
                        value={form.watch("location_name")}
                        countries={[
                            "ke"
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

                  <CustomFormField
                    fieldType="phone"
                    label="Phone Number"
                    control={form.control}
                    name="phone"
                    
                  />


                  <CustomFormField
                    fieldType="phone"
                    label="Emergency Number"
                    control={form.control}
                    name="emergencyPhone"

                  />


                  

                  

                </div>

                <div className="flex flex-col space-y-4">
                  <CustomFormField
                    fieldType="select"
                    label="Is Main Branch?"
                    control={form.control}
                    name="isMainBranch"
                    placeholder="Choose an option"
                  >
                    <SelectItem value="true">Yes - It is main branch</SelectItem>
                    <SelectItem value="false">No - It is not the main branch</SelectItem>
                  </CustomFormField>

                  <div className="md:col-span-8">
                    <p className="pb-1.5">Banner</p>
  
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
                          <span className="text-sm">Upload Banner</span>
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

              

              <div className="mx-auto">
                <CustomButton 
                  label="Finish Setup" 
                  btnType="submit" 
                  isLoading={isSubmitting}
                  loadingText="Processing ..."
                  className="hover:bg-secondary"
                />
              </div>

            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}

export default NewBranchPage
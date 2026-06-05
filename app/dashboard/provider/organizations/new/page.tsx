"use client";

import React, { useRef, useState } from 'react'
import z from 'zod';
import CustomFormField from '@/components/ui/custom-form-field';
import { FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { SelectItem } from '@/components/ui/select';
import { providerSchema } from '@/lib/validations/provider-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/ui/custom-button';
import { ImagePlus, Pencil, X } from 'lucide-react';
import { CONSTANTS } from '@/lib/constants/constants';
import Image from 'next/image';
import { toast } from 'sonner';
import { ApiRequests } from '@/lib/requests/api-requests';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CustomRichTextarea } from '@/components/ui/custom-rich-textarea';


const page = () => {
  const router = useRouter();
  const { data:session } = useSession();


  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: "",
      type: "",
      country: "",
      description: "",
      email: "",
      website: "",
    }
  });
  const { isSubmitting } = form.formState;

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const url = URL.createObjectURL(file);
      setLogoFile(file);
      setLogoPreview(url);
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerFile(file);
      setBannerPreview(url);
    }
  }

  const removeLogo = () => {
    setLogoPreview(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const removeBanner = () => {
    setBannerPreview(null);
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  

  const onSubmit = async(values: z.infer<typeof providerSchema>) => {

    if(!session?.accessToken)return;

    try{

      

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("provider_type", values.type);
      formData.append("country", values.country);
      formData.append("description", values.description);
      formData.append("logo", logoFile);
      formData.append("banner", bannerFile);

      if(values.email){
        formData.append("email", values.email);
        
      }

      if(values.website){
        formData.append("website", values.website);
      }

      const resp = await ApiRequests.post("providers/organizations/", formData, session?.accessToken);
      console.log(resp);

      if(resp.success){
        toast.success(resp.message);
        router.push(`/dashboard/provider/organizations/${resp.id}/branches/new/`)
      } else {
        toast.error(resp.errors);
      }
    } catch(err){
      toast.error("A network error occurred.");
    }
  }

  return (
    <div className="bg-white shadow p-5 my-4 rounded-xl space-y-6">

      <div className="pb-4">
        <h1 className="text-lg font-bold text-secondary">Create Your Healthcare Provider Profile</h1>
        <p className="text-sm text-muted-foreground">This captures your main organization details (not locations). You'll add branches or facilities in the next step.</p>
      </div>


      <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <FieldSet>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="font-semibold text-primary">Logo</h3>
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="relative overflow-hidden md:h-[200px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    {logoPreview ? ( 
                      <>
                        <Image 
                          src={logoPreview}
                          alt="Logo preview"
                          fill
                          className="object-contain"
                        />

                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              logoInputRef.current?.click();
                            }}
                            className="bg-white p-1 rounded-full shadow"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeLogo();
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
                        <span className="text-sm">Upload Logo</span>
                      </div>
                    )}
                    
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>


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

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5">
                <div className="md:col-span-8">
                  <CustomFormField 
                    fieldType="input"
                    inputType="text"
                    label="Organization/ Company Name"
                    control={form.control}
                    name="name"
                    placeholder="e.g Afyhub Africa"
                  />
                </div>
                <div className="md:col-span-4">
                  <CustomFormField
                    fieldType="select"
                    label="Provider Type"
                    control={form.control}
                    name="type"
                    placeholder="Choose a provider type"
                  >
                    {CONSTANTS.providerTypes.map((ptype) => (
                      <SelectItem value={ptype.value} key={ptype.value}>{ptype.label}</SelectItem>
                    ))}
                    
                    
                  </CustomFormField>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="">
                  <CustomFormField
                    fieldType="input"
                    inputType="email"
                    label="Email"
                    control={form.control}
                    name="email"
                    placeholder="e.g info@afyhub.africa"
                  />
                </div>
                <div className="">
                  <CustomFormField
                    fieldType="input"
                    inputType="text"
                    label="Organization website (optional)"
                    control={form.control}
                    name="website"
                    placeholder="e.g https://afyhub.africa"
                  />
                </div>
                <div className="">
                  <CustomFormField
                    fieldType="select"
                    label="Country"
                    control={form.control}
                    name="country"
                    placeholder="Choose your country"
                  >
                    {CONSTANTS.countries.map((country) => (
                      <SelectItem value={country.value} key={country.value}>{country.label}</SelectItem>
                    ))}
                  </CustomFormField>
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="Specialties" className="pb-1.5">
                  Description
                </FieldLabel>

                <CustomRichTextarea
                  value={form.watch("description")}
                  onChange={(html, textLength) => {
                    form.setValue("description", html, { shouldValidate: true })

                    if (textLength < 100) {
                      form.setError("description", { message: "Description must be at least 100 characters." })
                    } else {
                      form.clearErrors("description")
                    }
                  }}
                  error={form.formState.errors.description?.message}
                  placeholder="Describe your company here..."
                />

                <FieldDescription className="text-xs text-muted-foreground pt-1">
                  Provide detailed and accurate information about your company, specialties, and services. A complete description helps patients understand your organization and choose you with confidence.
                </FieldDescription>
              </div>


              

            </FieldSet>

            <div className="mt-6">
              <CustomButton 
                label="Continue to Branch" 
                btnType="submit" 
                isLoading={isSubmitting} 
                loadingText="Processing ..." 
                variant="secondary"
                className="hover:bg-secondary" 
              />
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}

export default page
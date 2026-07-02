"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Camera,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
  Trash2Icon,
} from "lucide-react";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomFormField from "@/components/ui/custom-form-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/auth-validations";
import { SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { ApiRequests } from "@/lib/requests/api-requests";
import { signOut, useSession } from "next-auth/react";
import CustomButton from "@/components/ui/custom-button";

interface ProfileClientPageProps {
  data: any;
}

const ProfileClientPage = ({ data }: ProfileClientPageProps) => {

  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(
    data?.patientprofile?.profile_picture || null
  );

  const [image, setImage] = useState<File | null>(null);

  

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "",
      email: "",
      dob: "",
      gender: "",
      country: "",
      phone: "",
    }
  });
  const { isSubmitting } = form.formState;

  useEffect(() => {
    if(data){
      form.reset({
        "fullname": data?.fullname || "",
        "email": data?.email || "",
        "phone": data?.phone || "",
        "gender": data?.gender || "",
        "dob": data?.dob || "",
        "country": data?.country || ""
      });
    }
  }, [data, form])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      if (image) {
        formData.append("profile_picture", image);
      }

      const response = await ApiRequests.patch("account/profile", formData, session?.accessToken);
      console.log(response);
      if (!response.success) {
        throw new Error();
      }

      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Unable to update profile.");
    }
  };


  const handleDelete = async () => {
    if (!confirm("Delete your account permanently?")) return;

    try {
      await ApiRequests.delete("account/profile", session?.accessToken);

      toast.success("Account deleted.");

      signOut({
        callbackUrl: "/",
      });

    } catch {
      toast.error("Unable to delete account.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-xl font-bold">
          My Profile
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">

        {/* LEFT */}

        <Card className="p-6">

          <div className="flex flex-col items-center">

            <div
              onClick={() => fileInputRef.current?.click()}
              className="
              relative
              flex
              h-40
              w-40
              cursor-pointer
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-2
              border-dashed
              border-gray-300
              bg-muted
              transition
              hover:border-primary
              hover:bg-primary/5
            "
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Camera size={32} />
                  <span className="text-sm font-medium">
                    Upload Photo
                  </span>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            <h2 className="mt-6 text-xl font-semibold">
              {data?.fullname}
            </h2>

            <span className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {data?.role}
            </span>

            <div className="mt-8 w-full space-y-5">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-muted-foreground"
                />

                <span className="text-sm">
                  {data?.email}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-muted-foreground"
                />

                <span className="text-sm">
                  {data?.phone}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={18}
                  className="text-green-600"
                />

                <span className="text-sm">
                  Verified Account
                </span>

              </div>

            </div>

          </div>

        </Card>

        {/* RIGHT */}

        <Card className="p-8">

          <div className="mb-8">

            <h2 className="text-xl font-semibold">
              Personal Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Update your profile details below.
            </p>

          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <div className="grid gap-5 md:grid-cols-2">

              <CustomFormField
                fieldType="input"
                control={form.control}
                name="fullname"
                label="Full Name"
              />

              <CustomFormField
                fieldType="input"
                control={form.control}
                name="phone"
                label="Phone Number"
              />

              <CustomFormField
                fieldType="select"
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="Choose your gender"
              >
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                
              </CustomFormField>

              <CustomFormField
                fieldType="input"
                control={form.control}
                inputType="date"
                name="dob"
                label="Date of Birth"
              />

              <CustomFormField
                fieldType="select"
                control={form.control}
                name="country"
                label="Country"
                placeholder="Choose your country"
              >
                <SelectItem value="kenya">Kenya</SelectItem>
              </CustomFormField>

              <CustomFormField
                fieldType="input"
                control={form.control}
                inputType="email"
                name="email"
                label="Email"
                disabled
              />

            </div>

            <div className="flex justify-end gap-3 pt-4">

              <Button
                variant="outline"
                type="button"
              >
                Cancel
              </Button>

              <Button type="submit">
                Save Changes
              </Button>

            </div>

          </form>

        </Card>

      </div>

      {/* Danger Zone */}

      <Card className="border-red-200 p-6">

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <h3 className="text-lg font-semibold text-red-600">
              Danger Zone
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>

          </div>

          <CustomButton
            label="Delete Account"
            btnType="button"
            variant="destructive"
            className="gap-2"
            onClick={handleDelete}
            prefixIcon={{ type: "lucide", icon: Trash2Icon }}
          />
          

        </div>

      </Card>

    </div>
  );
};

export default ProfileClientPage;
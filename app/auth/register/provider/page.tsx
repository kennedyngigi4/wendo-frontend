"use client";

import React from 'react';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { registerSchema } from '@/lib/validations/auth-validations';
import CustomFormField from '@/components/ui/custom-form-field';
import CustomButton from '@/components/ui/custom-button';
import Link from 'next/link';
import { ApiRequests } from '@/lib/requests/api-requests';



const ProviderRegisterPage = () => {

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullname: "",
      phone: "",
      password: "",
    }
  });
  const { isSubmitting } = form.formState;


  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
      try{
  
        const payload = {
          "fullname": values.fullname,
          "email": values.email,
          "phone": values.phone,
          "password": values.password,
          "role": "provider",
        }
  
        const resp = await ApiRequests.post("account/register/", payload);
        
        if(resp.success){
          toast.success(resp.message);
        } else {
          toast.error(resp.errors);
        }
      } catch(err){
        toast.error("A network error occured.");
      }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative bg-[url('/assets/images/bg/5.png')] bg-center bg-no-repeat bg-cover max-md:h-100 ">
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 "></div>
          
        </div>
        <div className="py-12 px-4 w-full md:w-[60%]">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <div>
                  <h1 className="text-2xl text-secondary font-bold">Provider Registration</h1>
                  <p className="text-sm text-slate-500">Welcome back to <span className="font-bold text-primary">Wendo Health</span></p>
                </div>

                <FieldGroup>
                  
                  <CustomFormField
                    fieldType="input"
                    name="fullname"
                    control={form.control}
                    label="Full Name"
                    placeholder="e.g John Doe"
                  />

                  <CustomFormField
                    fieldType="input"
                    inputType="email"
                    name="email"
                    control={form.control}
                    label="Email"
                    placeholder="e.g johndoe@email.xyz"
                  />

                  <CustomFormField
                    fieldType="phone"
                    name="phone"
                    control={form.control}
                    label="Phone"
                    placeholder="e.g 740........"
                  />

                  <CustomFormField
                    fieldType="input"
                    inputType="password"
                    name="password"
                    control={form.control}
                    label="Password"
                    placeholder="xxxxxxxx"
                  />


                  <CustomFormField
                    fieldType="checkbox"
                    name="terms"
                    control={form.control}
                    placeholder="I agree to terms and conditions"
                  />


                  <CustomFormField
                    fieldType="checkbox"
                    name="terms"
                    control={form.control}
                    placeholder="I would like to receive educational and marketing materials from Wendo"
                  />

                  
                  <CustomButton label="Register" btnType="submit" variant="secondary" isLoading={isSubmitting} loadingText="Processing ..." className="hover:bg-primary" />
                 
                  
                </FieldGroup>


              </FieldSet>
            </FieldGroup>

          </form>

          <div className="flex items-center pt-5">
            <span>Already having account? </span>
            <Link href="/auth/login" className="text-secondary font-bold">
              <CustomButton variant="link" label="Login" btnType="button" className="text-secondary font-bold px-1" />
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProviderRegisterPage
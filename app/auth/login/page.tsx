"use client";

import React from 'react';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { loginSchema } from '@/lib/validations/auth-validations';
import CustomFormField from '@/components/ui/custom-form-field';
import CustomButton from '@/components/ui/custom-button';
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { getSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const LoginPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const { isSubmitting } = form.formState;


  const onSubmit = async (values: z.infer<typeof loginSchema>) => {

    try{
      
      const resp = await signIn("credentials", { email: values.email, password: values.password, redirect: false});
      
      if (resp.error) {
        toast.error(resp.error);
        return;
      }

      toast.success("Login successful.");

      const session = await getSession();
      const role = session?.user?.role;

      if(role === "provider"){
        router.push("/dashboard/provider");
      } else if (role === "patient") {
        router.push("/dashboard/patient");
      } else {
        
        router.push("/dashboard");
        
      }
      
    } catch(err){
      console.log(err);
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
                  <h1 className="text-2xl text-secondary font-bold">Login</h1>
                  <p className="text-sm text-slate-500">Welcome back. Sign in to manage your healthcare experience.</p>
                </div>

                <FieldGroup>
                  <CustomFormField
                    fieldType="input"
                    name="email"
                    control={form.control}
                    label="Email"
                    placeholder="e.g johndoe@email.xyz"
                  />

                  <CustomFormField
                    fieldType="input"
                    inputType="password"
                    name="password"
                    control={form.control}
                    label="Password"
                    placeholder="xxxxxxxx"
                  />


                  <div className="w-full text-end text-xs text-blue-500">
                    <Link href="/auth/forgot-password">Forgot password?</Link>
                  </div>

                  
                  <CustomButton label="Login" variant="secondary" btnType="submit" isLoading={isSubmitting} loadingText="Processing ..." className="hover:bg-primary" />
                 
                  
                </FieldGroup>


              </FieldSet>
            </FieldGroup>

          </form>

          <div className="w-full mt-10">
            
            <CustomButton btnType="button" variant="outline" prefixIcon={{ type: "fa", icon: faGoogle }} label="Login with Google"  className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
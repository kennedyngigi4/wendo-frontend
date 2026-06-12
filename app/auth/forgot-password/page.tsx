"use client";

import React from 'react'
import * as z from "zod";
import { forgotPasswordSchema } from '@/lib/validations/auth-validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '@/components/ui/custom-button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import Link from 'next/link';
import CustomFormField from '@/components/ui/custom-form-field';
import { ApiRequests } from '@/lib/requests/api-requests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
    const router = useRouter();
    const form = useForm<z.infer <typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        }
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {

        const payload = {
            "email": values.email
        }

        const resp = await ApiRequests.post("account/forgot_password/", payload);
        if(resp.success){
            toast.success(resp.message);
            router.push("/auth/login");
        } else {
            toast.error(resp.errors);
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
                                    <h1 className="text-2xl text-secondary font-bold">Forgot Password</h1>
                                    <p className="text-sm text-slate-500">Enter your email and click submit to get the reset password link.</p>
                                </div>

                                <FieldGroup>
                                    <CustomFormField
                                        fieldType="input"
                                        name="email"
                                        control={form.control}
                                        label="Email"
                                        placeholder="e.g johndoe@email.xyz"
                                    />
                                    <CustomButton label="Forgot Password" variant="secondary" btnType="submit" isLoading={isSubmitting} loadingText="Processing ..." className="hover:bg-primary" />


                                </FieldGroup>


                            </FieldSet>
                        </FieldGroup>

                    </form>

                    <div className="w-full text-center font-semibold text-sm text-blue-500 mt-8">
                        <Link href="/auth/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword
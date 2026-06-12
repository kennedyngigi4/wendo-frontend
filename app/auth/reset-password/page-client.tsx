"use client"

import React from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '@/lib/validations/auth-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import CustomButton from '@/components/ui/custom-button';
import { ApiRequests } from '@/lib/requests/api-requests';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';


interface ResetPasswordClientPageProps {
    uid?: string
    token?: string
}

const ResetPasswordClientPage = ({ uid, token }: ResetPasswordClientPageProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password1: "",
            password2: "",
        }
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {

        if(values.password1 !== values.password2){
            toast.error("Passwords must match.");
            return;
        }

        const payload = {
            "uid": uid,
            "token": token,
            "password": values.password1
        }

        const resp = await ApiRequests.post("account/reset_password/", payload);
        if (resp.success) {
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
                                    <h1 className="text-2xl text-secondary font-bold">Reset Password</h1>
                                    <p className="text-sm text-slate-500">Enter your new password and confirm it.</p>
                                </div>

                                <FieldGroup>
                                    <CustomFormField
                                        fieldType="input"
                                        inputType="password"
                                        name="password1"
                                        control={form.control}
                                        label="New Password"
                                        placeholder="xxxxxxxxxx"
                                    />


                                    <CustomFormField
                                        fieldType="input"
                                        inputType="password"
                                        name="password2"
                                        control={form.control}
                                        label="Confirm Password"
                                        placeholder="xxxxxxxxx"
                                    />

                                    
                                    <CustomButton label="Reset Password" variant="secondary" btnType="submit" isLoading={isSubmitting} loadingText="Processing ..." className="hover:bg-primary" />


                                </FieldGroup>


                            </FieldSet>
                        </FieldGroup>

                    </form>

                    
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordClientPage
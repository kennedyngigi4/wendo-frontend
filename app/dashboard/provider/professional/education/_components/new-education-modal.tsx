"use client";

import React from 'react';
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CustomButton from '@/components/ui/custom-button';
import { PlusIcon } from 'lucide-react';
import { EducationSchema } from '@/lib/validations/professional-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FieldGroup } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import { ApiRequests } from '@/lib/requests/api-requests';
import { useSession } from 'next-auth/react';


const NewEducationModal = () => {
    const { data:session} = useSession();
    const form = useForm<z.infer<typeof EducationSchema>>({
        resolver: zodResolver(EducationSchema),
        defaultValues: {
            degree: "",
            institution: "",
            year_completed: "",
        }
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof EducationSchema>) => {
        try{
            const resp = await ApiRequests.post("professionals/education/", values, session?.accessToken);
            if(resp.success){
                toast.success(resp.message);
            } else {
                toast.error(resp.message);
            }
        } catch(err) {
            toast.error("A network error occured.");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton
                    label="Add Education"
                    btnType="button"
                    variant="secondary"
                    prefixIcon={{ type: "lucide", icon: PlusIcon, }}
                    className="px-2 text-sm"
                    size="xs"
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg text-secondary font-semibold">Add New Education</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <CustomFormField 
                                fieldType="input"
                                inputType="text"
                                name="degree"
                                control={form.control}
                                label="Degree"
                                placeholder="e.g MBChB, MPH"
                            />

                            <CustomFormField 
                                fieldType="input"
                                inputType="text"
                                name="institution"
                                control={form.control}
                                label="Institution"
                                placeholder="e.g. University of Nairobi"
                            />

                            <CustomFormField
                                fieldType="input"
                                inputType="number"
                                name="year_completed"
                                control={form.control}
                                label="Graduation Year"
                                placeholder="e.g. 2024"
                            />

                            <div>
                                <CustomButton
                                    label="Publish"
                                    btnType="submit"
                                    variant="secondary"
                                    isLoading={isSubmitting}
                                    loadingText="Processing"
                                />
                            </div>
                        </FieldGroup>
                        
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default NewEducationModal
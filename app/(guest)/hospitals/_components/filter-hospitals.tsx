"use client";

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CustomFormField from '@/components/ui/custom-form-field';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';
import { hospitalFilterSchema } from '@/lib/validations/provider-validations';

const HospitalFilterCard = () => {

    const form = useForm<z.infer<typeof hospitalFilterSchema>>({
        resolver: zodResolver(hospitalFilterSchema),
        defaultValues: {
            ownership: "",
            level: "",
            location: "",
            services: ""
        }
    });
    const { isValid, isSubmitting } = form.formState;

    return (
        <Card className="">
            <CardHeader className="text-secondary text-lg font-semibold">
                Filter Hospital
            </CardHeader>
            <CardContent >
                <form className="">
                    <FieldGroup className="gap-2">
                        <CustomFormField
                            fieldType='select'
                            name='ownership'
                            label="Ownership"
                            control={form.control}
                        >

                        </CustomFormField>

                        <CustomFormField
                            fieldType='select'
                            name='level'
                            label="Level"
                            control={form.control}
                        >

                        </CustomFormField>

                        <CustomFormField
                            fieldType='select'
                            name='location'
                            label="Location"
                            control={form.control}
                        >

                        </CustomFormField>

                        <CustomFormField
                            fieldType='select'
                            name='services'
                            label="Services"
                            control={form.control}
                        >

                        </CustomFormField>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}

export default HospitalFilterCard
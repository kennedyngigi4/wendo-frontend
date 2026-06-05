"use client";

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CustomFormField from '@/components/ui/custom-form-field';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';
import { clinicFilterSchema } from '@/lib/validations/provider-validations';

const ClinicFilterCard = () => {

    const form = useForm<z.infer<typeof clinicFilterSchema>>({
        resolver: zodResolver(clinicFilterSchema),
        defaultValues: {
            location: "",
            services: ""
        }
    });
    const { isValid, isSubmitting } = form.formState;

    return (
        <Card className="">
            <CardHeader className="text-secondary text-lg font-semibold">
                Filter Clinic
            </CardHeader>
            <CardContent >
                <form className="">
                    <FieldGroup className="gap-2">
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

export default ClinicFilterCard
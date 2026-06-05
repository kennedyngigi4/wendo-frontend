"use client";

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CustomFormField from '@/components/ui/custom-form-field';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { filterSchema } from '@/lib/validations/professional-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';

const ProfessionalFilterCard = () => {

    const form = useForm<z.infer<typeof filterSchema>>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            specialty: "",
        }
    });
    const { isValid, isSubmitting } = form.formState;

    return (
        <Card className="">
            <CardHeader className="text-secondary text-lg font-semibold">
                Filter Doctors
            </CardHeader>
            <CardContent >
                <form className="">
                    <FieldGroup className="gap-3">
                        <CustomFormField
                            fieldType='select'
                            name='specialty'
                            label="Specialty"
                            control={form.control}
                        >

                        </CustomFormField>

                        <CustomFormField
                            fieldType='select'
                            name='price'
                            label="Price"
                            control={form.control}
                        >

                        </CustomFormField>

                        <CustomFormField
                            fieldType='select'
                            name='experience'
                            label="Experience"
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
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}

export default ProfessionalFilterCard
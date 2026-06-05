"use client"

import React from 'react'
import * as z from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import CustomButton from '@/components/ui/custom-button';
import { Calendar1Icon } from 'lucide-react';
import { patientBookingSchema } from '@/lib/validations/other-validations';

const ProfessionalBookingForm = () => {

    const form = useForm<z.infer<typeof patientBookingSchema>>({
        resolver: zodResolver(patientBookingSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            appointment_datetime: undefined,
            service: "",
            reason: "",
        }
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof patientBookingSchema>) => {
        console.log(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <CustomFormField 
                    fieldType="input"
                    name="fullname"
                    label="Full name"
                    control={form.control}
                    placeholder="Your full name"
                />

                <CustomFormField
                    fieldType="phone"
                    name="phone"
                    label="Phone number"
                    control={form.control}
                />


                <CustomFormField
                    fieldType="input"
                    name="email"
                    label="Email"
                    inputType="email"
                    control={form.control}
                    placeholder="e.g johndoe@email.com"
                />


                <CustomFormField
                    fieldType="select"
                    name="service"
                    label="Service"
                    control={form.control}
                    placeholder="Choose a service"
                ></CustomFormField>


                <CustomFormField
                    fieldType="textarea"
                    name="notes"
                    label="Notes"
                    control={form.control}
                    placeholder="Enter short notes here ..."
                />

                <CustomButton 
                    label="Book Now"
                    btnType="submit"
                    prefixIcon={{ type: "lucide", icon: Calendar1Icon}}
                />
            </FieldGroup>
        </form>
    )
}

export default ProfessionalBookingForm
"use client"

import React from 'react'
import * as z from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import CustomButton from '@/components/ui/custom-button';
import { Calendar1Icon } from 'lucide-react';
import { ServiceOfferingModel } from '@/lib/models/service-models';
import { SelectItem } from '@/components/ui/select';
import { format } from "date-fns";
import { ApiRequests } from '@/lib/requests/api-requests';
import { toast } from 'sonner';
import { patientBookingSchema } from '@/lib/validations/other-validations';
import { useSession } from 'next-auth/react';



interface PatientBookingFormProps {
    services: ServiceOfferingModel[];
}

const PatientBookingForm = ({ services }: PatientBookingFormProps) => {

    const { data: session } = useSession();
    const form = useForm<z.infer<typeof patientBookingSchema>>({
        resolver: zodResolver(patientBookingSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            appointment_datetime: undefined,
            service: "",
            reason: "",
        }
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof patientBookingSchema>) => {

        if (!session?.accessToken) {
            toast.error("You must login first.");
        }

        const payload = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            service: values.service,
            reason: values.reason,

            appointment_date: format(values.appointment_datetime, "yyyy-MM-dd"),
            appointment_time: format(values.appointment_datetime, "HH:mm:ss"),
        }

        

        const resp = await ApiRequests.post("bookings/patient_bookings/", payload, session?.accessToken);
        if(resp.success){
            toast.success(resp.message);
        } else {
            toast.error(resp.message);
        }

    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <CustomFormField 
                    fieldType="input"
                    name="name"
                    label="Full name"
                    control={form.control}
                    placeholder="Your full name"
                />


                <CustomFormField
                    fieldType="input"
                    name="email"
                    label="Email"
                    control={form.control}
                    placeholder="Your email address"
                />

                <CustomFormField
                    fieldType="phone"
                    name="phone"
                    label="Phone number"
                    control={form.control}
                />


                <CustomFormField
                    fieldType="datetime"
                    name="appointment_datetime"
                    control={form.control}
                    label="Appointment Date & Time"
                />


                <CustomFormField
                    fieldType="select"
                    name="service"
                    label="Service"
                    control={form.control}
                    placeholder="Choose a service"
                >
                    {services?.map((service) => (
                        <SelectItem key={service.id} value={service?.id}>{service.service_name}</SelectItem>
                    ))}
                </CustomFormField>


                <CustomFormField
                    fieldType="textarea"
                    name="reason"
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

export default PatientBookingForm
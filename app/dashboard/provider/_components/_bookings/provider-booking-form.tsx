"use client";

import React, { useEffect } from 'react';
import { BookingDetailsModel } from '@/lib/models/booking-models';
import { useForm } from 'react-hook-form';
import { providerBookingSchema } from '@/lib/validations/other-validations';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/ui/custom-form-field';
import { FieldGroup } from '@/components/ui/field';
import CustomButton from '@/components/ui/custom-button';
import { Send } from 'lucide-react';
import { ApiRequests } from '@/lib/requests/api-requests';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { SelectItem } from '@/components/ui/select';


interface ProviderBookingFormProps{
  id?: string;
  data: BookingDetailsModel;
  branch_id?: string;
}

const ProviderBookingForm = ({ id, data, branch_id }: ProviderBookingFormProps) => {
  const { data:session } = useSession();
  
  const form = useForm<z.infer<typeof providerBookingSchema>>({
    resolver: zodResolver(providerBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      appointment_datetime: undefined,
      reason: "",
      service: "",
      status: "",
    }
  });


  useEffect(() => {
    if(!data) return;

    form.reset({
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      service: data.service.service_name ?? "",
      reason: data.reason ?? "",
      appointment_datetime: `${data.appointment_date} ${data.appointment_time}` ?? undefined,
    })

  }, [data, form]);


  const onSubmit = async(values: z.infer<typeof providerBookingSchema>) => {

    const payload = {
      "status": values.status
    }

    try{
      const resp = await ApiRequests.patch(`bookings/provprof_bookings/${id}/?owner_type=branch&branch_id=${branch_id}`, payload, session?.accessToken);
      console.log(resp);

    } catch(err) {
      toast.error("A network error occured.");
    }
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-8">
              <CustomFormField
                fieldType='input'
                control={form.control}
                name='name'
                label='Patient Name'
                disabled={true}
              />
            </div>
            <div className="md:col-span-4">
              <CustomFormField
                fieldType='select'
                control={form.control}
                name='status'
                label='Booking Status'
                placeholder={data.status}
              >
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </CustomFormField>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="">
              <CustomFormField
                fieldType='input'
                control={form.control}
                name='email'
                label='Patient Email'
                disabled={true}
              />
            </div>
            <div className="">
              <CustomFormField
                fieldType='input'
                control={form.control}
                name='phone'
                label='Patient Phone'
                disabled={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="">
              <CustomFormField
                fieldType='input'
                control={form.control}
                name='service'
                label='Booked Service'
                disabled={true}
              />
            </div>
            <div className="">
              <CustomFormField
                fieldType='input'
                control={form.control}
                name='appointment_datetime'
                label='Booked DateTime'
                disabled={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <CustomFormField
              fieldType='textarea'
              control={form.control}
              name='reason'
              label='Booking Reason'
              disabled={true}
            />
          </div>

          <div>
            <CustomButton 
              label="Save Changes"
              btnType="submit"
              variant="secondary"
              suffixIcon={{ type: "lucide", icon: Send }}
            />
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

export default ProviderBookingForm
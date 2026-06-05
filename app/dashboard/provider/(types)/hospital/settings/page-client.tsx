"use client";

import React from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { hospitalSettingsSchema } from '@/lib/validations/provider-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { FieldGroup } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import { CustomMultiSelect } from '@/components/ui/custom-multiselect';
import { CONSTANTS } from '@/lib/constants/constants';
import CustomButton from '@/components/ui/custom-button';
import { SelectItem } from '@/components/ui/select';
import { ApiRequests } from '@/lib/requests/api-requests';
import { useSession } from 'next-auth/react';


interface SettingsClientPageProps{
  data?: any;
  branch_id?: string
}

const SettingsClientPage = ({ data, branch_id }: SettingsClientPageProps) => {

  const { data: session } = useSession();
  const form = useForm<z.infer<typeof hospitalSettingsSchema>>({
    resolver: zodResolver(hospitalSettingsSchema),
    defaultValues: {
      ownership_type: "",
      level: "",
      accepts_nhif: "",
      year_established: "",
      has_pharmacy: "",
      total_beds: "",
      icu_beds: "",
      has_emergency: "",
      has_ambulance: "",
      trust_reasons: [],
    }
  });
  const { isSubmitting } = form.formState;


  const onSubmit = async (values: z.infer<typeof hospitalSettingsSchema>) => {
    try{
      const resp = await ApiRequests.post(`providers/hospital_profile/?branch_id=${branch_id}`, values, session?.accessToken);
      if(resp.success){
        toast.success(resp.message);
      } else {
        toast.error(resp.message);
      }

    } catch(err){
      toast.error("A network error occured. Try again.");
    }
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <div className="pb-8">
        <h1 className="text-lg font-semibold text-secondary">General Settings</h1>
        <p className="text-sm text-slate-500">By filling the form fields below, you help patients build trust in your facility.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Ownership
            </div>
            <div className="md:col-span-6">
              <CustomFormField 
                fieldType="select"
                name="ownership_type"
                control={form.control}
                placeholder="Choose the ownership"
              >
                {CONSTANTS.HOSPITAL_OWNERSHIP.map((item) => (
                  <SelectItem value={item.id} key={item.id}>{item.name}</SelectItem>
                ))}
              </CustomFormField>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Level
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="select"
                name="level"
                control={form.control}
                placeholder="Choose the level"
              >
                {CONSTANTS.HOSPITAL_LEVELS.map((item) => (
                  <SelectItem value={item.id} key={item.id}>{item.name}</SelectItem>
                ))}
              </CustomFormField>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Do you accept SHA?
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="select"
                name="accepts_nhif"
                control={form.control}
                placeholder="Choose an option"
              >
                <SelectItem value="true">Yes we accept SHA</SelectItem>
                <SelectItem value="false">No we don't accept SHA</SelectItem>
              </CustomFormField>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Year Established
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="input"
                inputType="number"
                name="year_established"
                control={form.control}
                placeholder="e.g 2010"
              />

              
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Do you have an in-facility pharmacy?
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="select"
                name="has_pharmacy"
                control={form.control}
                placeholder="Choose an option"
              >
                <SelectItem value="true">Yes we have</SelectItem>
                <SelectItem value="false">No we don't</SelectItem>
              </CustomFormField>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Total Beds
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="input"
                name="total_beds"
                control={form.control}
                placeholder="e.g 100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Total ICU Beds
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="input"
                name="icu_beds"
                control={form.control}
                placeholder="e.g 5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Do you offer emergency services?
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="select"
                name="has_emergency"
                control={form.control}
                placeholder="Choose an option"
              >
                <SelectItem value="true">Yes we have</SelectItem>
                <SelectItem value="false">No we don't</SelectItem>
              </CustomFormField>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Do you have an ambulance?
            </div>
            <div className="md:col-span-6">
              <CustomFormField
                fieldType="select"
                name="has_ambulance"
                control={form.control}
                placeholder="Choose an option"
              >
                <SelectItem value="true">Yes we have</SelectItem>
                <SelectItem value="false">No we don't</SelectItem>
              </CustomFormField>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-primary">
              Why should patients trust the facility?
            </div>
            <div className="md:col-span-6">
              <CustomMultiSelect 
                options={CONSTANTS.TRUST_OPTIONS}
                value={form.watch("trust_reasons")}
                onChange={(vals) => {

                  if (vals.length > 4) {
                    return;
                  }

                  form.setValue("trust_reasons", vals, {
                    shouldValidate: true,
                  });
                }}
                placeholder="Choose reasons to be trusted."
              />
            </div>
          </div>
              
          <div>
            <CustomButton 
              label="Save"
              btnType="submit"
              isLoading={isSubmitting}
              loadingText="Processing..."
              variant="secondary"
            />
          </div>

        </FieldGroup>
      </form>
    </div>
  )
}

export default SettingsClientPage
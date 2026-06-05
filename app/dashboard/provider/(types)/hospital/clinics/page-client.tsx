"use client"

import React from 'react'
import Link from 'next/link';
import CustomButton from '@/components/ui/custom-button';
import { PlusIcon } from 'lucide-react';
import { ClinicsDataTable } from '../../../_components/_clinics/clinic-datatable';
import { ClinicsColumns } from '../../../_components/_clinics/clinic-columns';
import { ClinicCardModel } from '@/lib/models/provider-models';



interface ProviderClinicsClientPageProps {
    clinics: ClinicCardModel[];
    name: string;
}

const ProviderClinicsClientPage = ({ clinics, name }: ProviderClinicsClientPageProps) => {
  return (
    <div className="flex flex-col space-y-5 bg-white p-5 shadow rounded-lg my-5">
        <div className="flex md:flex-row flex-col gap-4 md:justify-between md:items-center">
            <div>
                <h1 className="text-secondary font-semibold text-lg capitalize">{name} clinics</h1>
                <p className="text-sm text-slate-500">Add, update, and manage your clinic sessions.</p>
            </div>
            <div>
                <Link href="/dashboard/provider/hospital/clinics/new/">
                    <CustomButton 
                        label="Add Clinic"
                        btnType="button"
                        variant="secondary"
                        size="sm"
                        prefixIcon={{ type: "lucide", icon: PlusIcon }}
                        className="px-3"
                    />
                </Link>
            </div>
        </div>

        <div>
            <ClinicsDataTable data={clinics} columns={ClinicsColumns} />
        </div>
    </div>
  )
}

export default ProviderClinicsClientPage
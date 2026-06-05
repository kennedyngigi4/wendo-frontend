"use client";

import React from 'react'
import CustomButton from '@/components/ui/custom-button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react';
import { SpecialistsDataTable } from '../../../_components/_specialists/specialists-datatable';
import { SpecialistCardModel } from '@/lib/models/provider-models';
import { SpecialistsColumns } from '../../../_components/_specialists/specialists-columns';

interface HospitalSpecialistsClientPageProps {
    data: SpecialistCardModel[];
    name: string;
}

const HospitalSpecialistsClientPage = ({ data, name }: HospitalSpecialistsClientPageProps) => {
  return (
    <div className="flex flex-col space-y-5 bg-white rounded-lg p-5 my-5 shadow">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
                <h1 className="text-secondary font-semibold text-lg capitalize">{name} specialists</h1>
                <p className="text-sm text-slate-500">Add, update, and manage your specialist profiles.</p>
            </div>
            <div>
                  <Link href="/dashboard/provider/hospital/specialists/new/">
                    <CustomButton
                        label="Add Specialist"
                        btnType="button"
                        prefixIcon={{ type: "lucide", icon: PlusIcon }}
                        variant="secondary"
                        className="px-3"
                    />
                </Link>
            </div>
        </div>

        <div>
            <SpecialistsDataTable data={data} columns={SpecialistsColumns} />
        </div>
    </div>
  )
}

export default HospitalSpecialistsClientPage
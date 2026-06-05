"use client";

import React from 'react'
import CustomButton from '@/components/ui/custom-button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { ServicesDataTable } from '../../_components/_services/services-datatable';
import { ServicesColumns } from '../../_components/_services/services-columns';
import { ServiceOfferingModel } from '@/lib/models/service-models';


interface ProviderServicesClientProps {
    services: ServiceOfferingModel[];
    name?: string
}

const ProfessionalServicesClient = ({ services, name }: ProviderServicesClientProps) => {
  return (
    <div className="flex flex-col bg-white my-5 shadow rounded-lg">

      <div className="flex md:flex-row flex-col gap-4 justify-between items-center pt-5 px-5">
        <div>
          <h1 className="font-semibold text-xl text-secondary capitalize">{name} services</h1>
          <p className="text-slate-600">All available services are listed for public under the profile page.</p>
        </div>
        <div>
          <Link href="/dashboard/provider/professional/services/new">
            <CustomButton
              label="Add Service"
              btnType="submit"
              prefixIcon={{ type: "lucide", icon: PlusIcon }}
              variant="secondary"
              className="px-3"
            />
          </Link>
        </div>
      </div>

      <div className="bg-white p-4">
        <ServicesDataTable data={services} columns={ServicesColumns} />
      </div>
    </div>
  )
}

export default ProfessionalServicesClient
"use client";

import CustomButton from '@/components/ui/custom-button';
import React from 'react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

interface ProviderOrganizationsClientProps {
  organizations: any[];
}

const ProviderOrganizationsClient = ({ organizations }: ProviderOrganizationsClientProps) => {


  return (
    <div className="bg-white rounded-2xl shadow my-5 p-5">
      <div className="flex flex-col md:flex-row justify-between gap-4 pb-5">
        <div>
          <h1 className="font-bold text-lg text-secondary">Organizations</h1>
          <p className="text-sm text-slate-500">Manage healthcare providers, clinics, hospitals, and registered organizations.</p>
        </div>
        <div>
          <Link href="/dashboard/provider/organizations/new">
            <CustomButton 
              label="Add Company"
              btnType="button"
              prefixIcon={{ type: "lucide", icon: PlusIcon}}
              variant="secondary"
              size="xs"
              className="px-4"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col">
        <DataTable columns={columns} data={organizations} />
      </div>
    </div>
  )
}

export default ProviderOrganizationsClient
"use client";

import React from 'react';
import { ProviderBranchList } from '@/lib/models/provider-models';
import { BranchesTable } from './_components/branches-table';
import { Branchescolumns } from './_components/branches-columns';

interface BranchesClientPageProps {
    data: ProviderBranchList[];
}

const BranchesClientPage = ({ data }: BranchesClientPageProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 my-5">
      <div className="pb-4">
        <h1 className="font-semibold text-lg text-secondary">Branches</h1>
        <p className="text-sm text-slate-500">Manage branch locations, services, and operational information.</p>
      </div>


      <div>
        <BranchesTable columns={Branchescolumns} data={data} />
      </div>

    </div>
  )
}

export default BranchesClientPage
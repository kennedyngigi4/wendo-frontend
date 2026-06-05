"use client"

import React from 'react'
import NewEducationModal from './_components/new-education-modal'
import { GlobalDataTable } from '@/components/ui/data-table';
import { EducationColumns } from './_components/education-columns';

interface ProfessionalEducationClientProps {
  data: any[];
}

const ProfessionalEducationClient = ({ data }: ProfessionalEducationClientProps) => {
  return (
    <div className="p-5 shadow my-5 bg-white rounded-lg">
      <div className="flex md:flex-row justify-between items-center">
        <div>
          <h1 className="font-semibold text-secondary text-lg">Education</h1>
          <p className="text-sm text-slate-500">Manage you education data here; add, edit or delete.</p>
        </div>

        <div>
          <NewEducationModal />
        </div>
      </div>

      <div className="pt-5">
        <GlobalDataTable data={data} columns={EducationColumns} />
      </div>
    </div>
  )
}

export default ProfessionalEducationClient
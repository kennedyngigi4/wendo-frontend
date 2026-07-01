"use client";

import { GlobalDataTable } from '@/components/ui/data-table';
import { Calendar1Icon } from 'lucide-react';
import React from 'react'
import { appointmentColumns } from './_components/appointment-columns';

interface AppointmentsClientPageProps {
  appointments: any[]
}

const AppointmentsClientPage = ({ appointments }: AppointmentsClientPageProps) => {
  
  return (
    <div className="bg-white p-6 shadow rounded-lg my-5">

      <div className="pb-6">
        <h1 className="font-semibold text-lg">Appointments</h1>
      </div>

      {appointments.length > 0 ? (
        <div>
          <GlobalDataTable data={appointments} columns={appointmentColumns} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-slate-50 border-1 border-dotted border-slate-300 py-10 text-center rounded-xl">
            <Calendar1Icon />
            <div className="pt-2">
              <h1 className="text-slate-500 font-semibold">No appointments yet</h1>
              <p className="text-slate-500">Your appointments will be listed here.</p>
            </div>
        </div>
      )}
      
    </div>
  )
}

export default AppointmentsClientPage
"use client";

import React from 'react';
import { ProfessionalCardModel } from '@/lib/models/profession-models';
import ProfessionalHCard from '../../_components/professional-h-card';
import ProfessionalFilterCard from './_components/filter';


interface FindDoctorClientProps{
  data: ProfessionalCardModel[];
}

const FindDoctorClient = ({ data }: FindDoctorClientProps) => {

  


  return (
    <div className="app-container py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-3">
          <ProfessionalFilterCard />
        </div>
        <div className="md:col-span-9">
          <div className="flex md:flex-row flex-col gap-5">
            {data.map((professional) => (
              <div key={professional.id} className="md:w-1/2 w-full">
                <ProfessionalHCard professional={professional} />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default FindDoctorClient
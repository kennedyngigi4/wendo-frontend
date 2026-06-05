"use client";

import ServiceCard from '@/app/(guest)/_components/service-card';
import { BranchServiceModel } from '@/lib/models/service-models';
import React from 'react'

interface HospitalContentServicesProps{
  services: BranchServiceModel[];
}

const HospitalContentServices = ({ services }: HospitalContentServicesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {services.map((service: BranchServiceModel) => (
        <ServiceCard key={service.id} data={service} />
      ))}
    </div>
  )
}

export default HospitalContentServices
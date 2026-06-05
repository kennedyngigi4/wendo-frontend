"use client";

import React from 'react';
import ServiceForm from '@/app/dashboard/provider/_components/_services/service-form';


const NewService = () => {
  return (
    <div>
        <div className="w-[90%] mx-auto bg-white p-5 shadow rounded-lg my-5 flex-col space-y-5">
            <div>
              <h1 className="text-secondary font-semibold pb-6 text-xl">Add Service</h1>
            </div>
            
            <div>
              <ServiceForm />
            </div>
        </div>
        
    </div>
  )
}

export default NewService
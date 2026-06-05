"use client";

import React from 'react';
import * as z from "zod";
import { professionalSchema } from '@/lib/validations/professional-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import CustomFormField from '@/components/ui/custom-form-field';
import { CONSTANTS } from '@/lib/constants/constants';
import { SelectItem } from '@/components/ui/select';
import ProfessionalForm from '../_components/professional-form';

const NewProfessionalPage = () => {
  const router = useRouter();
  

  return (
    <div className="bg-white shadow rounded-xl my-5 p-5">
      
      <div className="pb-6">
        <h1 className="text-lg font-bold text-secondary">Create Your Professional Profile</h1>
        <p className="text-sm text-muted-foreground">Add your specialties, qualifications, and consultation fees to get listed and discovered by patients.</p>
      </div>

      <div>
        <ProfessionalForm />
      </div>
    </div>
  )
}

export default NewProfessionalPage
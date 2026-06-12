"use client";

import React from 'react';
import DashboardEmptyStats from '@/app/dashboard/_components/dashboard-empty-stats';
import { StarIcon } from 'lucide-react';


const page = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <DashboardEmptyStats
        icon={StarIcon}
        title="No reviews yet."
        subtitle="Your reviews will appear here after you complete appointments."
      />
    </div>
  )
}

export default page

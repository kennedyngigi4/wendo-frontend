"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'

const DashboardNavbar = () => {
  return (
    <div className="flex items-center justify-between ps-1 pe-8 bg-white shadow">
        <div>
            <SidebarTrigger />
        </div>

        <div>
            <p className="text-sm">Profile</p>
        </div>
    </div>
  )
}

export default DashboardNavbar
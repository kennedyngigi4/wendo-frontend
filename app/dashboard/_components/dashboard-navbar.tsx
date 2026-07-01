"use client";

import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User2Icon } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const DashboardNavbar = () => {

  const { data:session } = useSession();

  return (
    <div className="flex items-center justify-between ps-1 pe-8 bg-white shadow py-1.5">
        <div>
            <SidebarTrigger />
        </div>

        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-slate-100 border-1 border-slate-200 rounded-full">
            <Link href={`/dashboard/${session?.user?.role}/profile`}>
              <User2Icon />
            </Link>
          </div>
          
        </div>
    </div>
  )
}

export default DashboardNavbar
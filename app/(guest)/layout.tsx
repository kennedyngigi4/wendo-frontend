"use client"

import React, { useEffect } from 'react'
import MainHeader from '../_components/header'
import MainFooter from '../_components/footer'
import { useServicesStore } from '@/stores/services-store'

const GuestLayout = ({ children }: { children: React.ReactNode}) => {

  const fetchData = useServicesStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
        <MainHeader />
        <div className="min-h-screen">
            {children}
        </div>
        <MainFooter />
    </div>
  )
}

export default GuestLayout
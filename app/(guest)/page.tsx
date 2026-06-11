import React from 'react'
import HomePageClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

export const dynamic = "force-dynamic";

const HomePage = async() => {

  const data = await ApiRequests.get("home/", undefined, true); 


  return (
    <HomePageClient data={data} />
  )
}

export default HomePage
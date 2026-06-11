import React from 'react'
import HomePageClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const HomePage = async() => {

  const data = await ApiRequests.get("home/"); 


  return (
    <HomePageClient data={data} />
  )
}

export default HomePage
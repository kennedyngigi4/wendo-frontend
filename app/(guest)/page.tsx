import React from 'react'
import HomePageClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const HomePage = async() => {

  console.log("🚀 FETCHING HOME API");
  const data = await ApiRequests.get("home/"); 
  console.log(data)

  return (
    <HomePageClient data={data} />
  )
}

export default HomePage
import React from 'react'
import FindDoctorClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const page = async() => {
 
  const data = await ApiRequests.get("professionals/all/");
  

  return (
    <FindDoctorClient data={data} />
  )
}

export default page
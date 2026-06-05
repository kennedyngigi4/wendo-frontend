import React, { Suspense } from 'react'
import FindDoctorClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const page = async() => {
 
  const data = await ApiRequests.get("professionals/all/");
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindDoctorClient data={data} />
    </Suspense>
  )
}

export default page
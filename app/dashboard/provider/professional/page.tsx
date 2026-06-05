import React from 'react'
import ProfessionalPageClient from './page-client';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';


const page = async() => {
  const session = await auth();

  const data = await ApiRequests.get(`professionals/dashboard/`, session?.accessToken, true);
  console.log(data);  

  return (
    <ProfessionalPageClient data={data} />
  )
}

export default page
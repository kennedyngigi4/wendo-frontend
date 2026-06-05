import React from 'react'
import ClientClinicsPage from './page-client';
import { ApiRequests } from '@/lib/requests/api-requests';

const page = async() => {

  const data = await ApiRequests.get("providers/public/all/clinics/");
  console.log(data)

  return (
    <div>
      <ClientClinicsPage clinicsData={data} />
    </div>
  )
}

export default page
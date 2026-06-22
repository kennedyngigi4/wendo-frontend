import React, { Suspense } from 'react'
import ClientClinicsPage from './page-client';
import { ApiRequests } from '@/lib/requests/api-requests';

const page = async() => {

  const data = await ApiRequests.get("providers/public/all/clinics/");
 

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientClinicsPage clinicsData={data} />
      </Suspense>
    </div>
  )
}

export default page
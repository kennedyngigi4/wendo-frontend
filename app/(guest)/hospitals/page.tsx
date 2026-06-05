import React, { Suspense } from 'react'
import HospitalsClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests';

const page = async() => {

    const data = await ApiRequests.get("providers/public/all/hospitals/");
   
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HospitalsClient hospitalsData={data} />
        </Suspense>
    )
}

export default page




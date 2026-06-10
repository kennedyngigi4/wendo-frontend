import React, { Suspense } from 'react'
import HospitalsClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests';

const page = async() => {

    console.log("🚀 FETCHING HOSPITALS API");
    const data = await ApiRequests.get("providers/public/all/hospitals/");

    console.log("📦 API RESPONSE:", JSON.stringify(data, null, 2));
   
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen w-full">Loading...</div>}>
            <HospitalsClient hospitalsData={data} />
        </Suspense>
    )
}

export default page




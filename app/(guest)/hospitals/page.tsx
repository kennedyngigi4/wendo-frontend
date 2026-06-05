import React from 'react'
import HospitalsClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests';

const page = async() => {

    const data = await ApiRequests.get("providers/public/all/hospitals/");
   
    return (
        <HospitalsClient hospitalsData={data} />
    )
}

export default page




import React from 'react'
import ProviderDashboardPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';

const page = async() => {
    const session = await auth();

    const data = await ApiRequests.get("providers/dashboard/", session?.accessToken, true);
    

    return (
        <ProviderDashboardPage data={data} />
    );
}

export default page
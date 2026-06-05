import React from 'react'
import ProviderOrganizationsClient from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'
import { auth } from '@/auth'

const page = async() => {
    const session = await auth();

    if (!session?.accessToken) return;

    const resp = await ApiRequests.get("providers/organizations/", session?.accessToken, true);
    

    return (
        <ProviderOrganizationsClient organizations={resp} />
    )
}

export default page
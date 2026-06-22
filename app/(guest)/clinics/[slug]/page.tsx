import React from 'react'
import HospitalDetailsPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests';

type Props = {
    params: Promise<{
        slug: string
    }>;
}

const page = async ({ params } : Props) => {
    const { slug } = await params;

    const data = await ApiRequests.get(
        `providers/public/details/${slug}/`,
        "",
        true
    );

    return (
        <HospitalDetailsPage provider={data} />
    )
}

export default page
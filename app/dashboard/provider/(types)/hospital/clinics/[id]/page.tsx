import React from 'react'
import ClinicForm from '@/app/dashboard/provider/_components/_clinics/clinic-form'
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { ApiRequests } from '@/lib/requests/api-requests';


type ClinicPageDetailsProps = {
    params: Promise<{
        id: string
    }>;
}

const ClinicPageDetails = async ({ params }: ClinicPageDetailsProps) => {
    const { id } = await params;
    const session = await auth();

    const cookiesStore = await cookies();
    const workspaceCookie = cookiesStore.get("activeWorkspace");
    const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

    const [data, specialists] = await Promise.all([
        ApiRequests.get(`providers/branch_clinics/${id}/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true),
        ApiRequests.get(`providers/branch_specialists/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true)
    ]);

    return (
        <div className="flex flex-col bg-white p-5 my-5 shadow">

            <div>
                <ClinicForm data={data} id={id} branch_id={activeWorkspace.id} specialistsOptions={specialists} />
            </div>
        </div>
    )
}

export default ClinicPageDetails
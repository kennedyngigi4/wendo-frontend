
import React from 'react'
import SpecialistForm from '@/app/dashboard/provider/_components/_specialists/specialist-form'
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';

type SpecialistDetailsPageProps = {
    params: Promise<{
        id: string;
    }>
}

const SpecialistDetailsPage = async ({ params }: SpecialistDetailsPageProps) => {
    const session = await auth();
    const { id } = await params;
    const cookiesStore = await cookies();
    const workspaceCookie = cookiesStore.get("activeWorkspace");
    const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

    const data = await ApiRequests.get(`providers/branch_specialists/${id}/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true);
    console.log(data);

    return (
        <div className="bg-white shadow p-5 my-5 w-[90%] mx-auto">

            <div>
                <SpecialistForm data={data} id={id} branch_id={activeWorkspace.id} />
            </div>
        </div>
    )
}

export default SpecialistDetailsPage
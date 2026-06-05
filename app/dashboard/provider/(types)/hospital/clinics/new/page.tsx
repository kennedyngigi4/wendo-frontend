
import React from 'react'
import ClinicForm from '@/app/dashboard/provider/_components/_clinics/clinic-form'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';


const NewClinicPage = async() => {

  const session = await auth();
  
  const cookiesStore = await cookies();
  const workspaceCookie = cookiesStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

  const specialists = await ApiRequests.get(`providers/branch_specialists/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true)

  return (
    <div className="flex flex-col space-y-5 bg-white my-5 p-5 shadow rounded-lg">

      <ClinicForm specialistsOptions={specialists} />
    </div>
  )
}

export default NewClinicPage
import React from 'react'
import ProviderClinicsClientPage from './page-client'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';


const page = async() => {

  const session = await auth();
    
  const cookiesStore = await cookies();
  const workspaceCookie = cookiesStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;
  
  const data = await ApiRequests.get(`providers/branch_clinics/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true);
  

  return (
    <div>
      <ProviderClinicsClientPage clinics={data} name={activeWorkspace.name} />
    </div>
  )
}

export default page
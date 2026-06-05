import React from 'react'
import HospitalSpecialistsClientPage from './page-client';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';
import { cookies } from 'next/headers';




const HospitalSpecialists = async() => {
  const session = await auth();
  
  const cookiesStore = await cookies();
  const workspaceCookie = cookiesStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;
  
  const data = await ApiRequests.get(`providers/branch_specialists/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true);
  

  return (
    <div className="">
      
      <HospitalSpecialistsClientPage  data={data} name={activeWorkspace.name} />
      
    </div>
  )
}

export default HospitalSpecialists
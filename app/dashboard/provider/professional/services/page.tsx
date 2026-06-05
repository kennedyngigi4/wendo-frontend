import React from 'react'
import ProfessionalServicesClient from './page-client'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';

const ProfessionalServices = async() => {

  const session = await auth();
    
  const cookieStore = await cookies();
  const workspaceCookie = cookieStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

  const data = await ApiRequests.get(`services/offerings/?owner_type=professional&professional_id=${activeWorkspace.id}`, session?.accessToken, true);


  return (
    <div>
      <ProfessionalServicesClient services={data} name={activeWorkspace.name}  />
    </div>
  )
}

export default ProfessionalServices
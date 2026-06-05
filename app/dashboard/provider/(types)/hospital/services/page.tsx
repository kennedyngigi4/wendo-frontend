import React from 'react'
import ProviderServicesClient from './page-client'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';

const page = async() => {

  const session = await auth();
  
  const cookieStore = await cookies();
  const workspaceCookie = cookieStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

  const data = await ApiRequests.get(`services/offerings/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true);

  

  return (
    <ProviderServicesClient services={data} name={activeWorkspace.name} />
  )
}

export default page
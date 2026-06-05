import React from 'react'
import SettingsClientPage from './page-client'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';

const SettingsPage = async() => {

  const session = await auth();
    
  const cookieStore = await cookies();
  const workspaceCookie = cookieStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

  const data = await ApiRequests.get(`providers/hospital_profile/?branch_id=${activeWorkspace.id}`, session?.accessToken, true);

    

  return (
    <div>
      <SettingsClientPage data={data} branch_id={activeWorkspace.id } />
    </div>
  )
}

export default SettingsPage
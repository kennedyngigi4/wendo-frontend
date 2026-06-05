import React from 'react'
import WorkingHoursClientPage from './page-client'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';

const page = async () => {

  const session = await auth();
  const cookiesStore = await cookies();
  const workspaceCookie = cookiesStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;
  
  const data = await ApiRequests.get(`providers/working_hours/?branch_id=${activeWorkspace.id}`, session?.accessToken, true);
    
  

  return (
    <div>
      <WorkingHoursClientPage branch_id={activeWorkspace.id} data={data} />
    </div>
  )
}

export default page
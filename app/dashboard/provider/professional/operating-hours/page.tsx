import React from 'react'
import OperatingHoursClientPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'
import { auth } from '@/auth';
import { cookies } from 'next/headers';

const OperatingHours = async() => {

  const session = await auth();
  const cookieStore = await cookies();
  const workspaceCookie = cookieStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;
  
  const data = await ApiRequests.get(`professionals/working_hours/`, session?.accessToken, true);
  console.log(data);

  return (
    <div>
      <OperatingHoursClientPage data={data} professionalId={activeWorkspace.id} />
    </div>
  )
}

export default OperatingHours
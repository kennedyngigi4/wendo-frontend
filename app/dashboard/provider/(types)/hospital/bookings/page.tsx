
import React from 'react';
import { cookies } from "next/headers";
import BookingsClientPage from './page-client';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';


const page = async () => {
  const session = await auth();

  const cookieStore = await cookies();
  const workspaceCookie = cookieStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

  const data = await ApiRequests.get(`bookings/provprof_bookings/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true);

  

  return (
    <BookingsClientPage data={data} name={activeWorkspace.name}/>
  )
}

export default page
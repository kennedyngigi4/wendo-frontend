import React from 'react'
import ProfessionalBookingsClient from './page-client'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';

const ProfessionalBookingsPage = async() => {
  const session = await auth();

  const cookieStore = await cookies();
  const workspaceCookie = cookieStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

  const data = await ApiRequests.get(`bookings/provprof_bookings/?owner_type=professional&professional_id=${activeWorkspace.id}`, session?.accessToken, true);



  return (
    <ProfessionalBookingsClient data={data} name={activeWorkspace.name} />
  )
}

export default ProfessionalBookingsPage
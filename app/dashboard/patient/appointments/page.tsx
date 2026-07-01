import React from 'react'
import AppointmentsClientPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'
import { auth } from '@/auth'

const AppointmentsPage = async() => {

  const session = await auth();

  if(!session?.accessToken) return;

  const appointments = await ApiRequests.get("bookings/patient_bookings/", session?.accessToken, true);
  const data = appointments.data;


  return (
    <div>
      <AppointmentsClientPage appointments={data} />
    </div>
  )
}

export default AppointmentsPage
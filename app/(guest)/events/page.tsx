import React from 'react'
import EventsClientPage from './events-client'
import { ApiRequests } from '@/lib/requests/api-requests'

export const dynamic = "force-dynamic";

const EventsPage = async() => {

  const data = await ApiRequests.get("events/all/", undefined, true);
  


  return (
    <div>
      <EventsClientPage events={data} />
    </div>
  )
}

export default EventsPage
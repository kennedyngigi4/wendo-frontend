import React from 'react'
import EventsClientPage from './events-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const EventsPage = async() => {

  const data = await ApiRequests.get("events/all/");
  console.log(data.events)


  return (
    <div>
      <EventsClientPage events={data} />
    </div>
  )
}

export default EventsPage
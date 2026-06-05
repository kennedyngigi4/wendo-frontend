import React from 'react';
import SubscriptionsClientPage from './page-client';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';

const page = async () => {
  const session = await auth();
  const data = await ApiRequests.get("providers/subscriptions/", session?.accessToken, true);

  console.log(data);

  return (
    <SubscriptionsClientPage data={data} />
  )
}

export default page
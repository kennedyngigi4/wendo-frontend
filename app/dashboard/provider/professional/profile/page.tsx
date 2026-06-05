import { auth } from '@/auth';
import { ApiRequests } from '@/lib/requests/api-requests';
import React from 'react'
import ProfessionalProfileClient from './page-client';


const page = async () => {

    const session = await auth();

    if (!session?.accessToken) {
        return <div>Unauthorized</div>
    }
    const resp = await ApiRequests.get("professionals/profession/me/", session?.accessToken, true);
    const professional = resp?.professional ?? null;

  return (
      <div>
          <ProfessionalProfileClient professional={professional} />
      </div>
  )
}

export default page
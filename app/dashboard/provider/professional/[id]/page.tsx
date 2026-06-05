import React from 'react'
import ProfessionalClientDetailsPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'
import { auth } from '@/auth';

const ProfessionalDetailsPage = async() => {

  const session = await auth();

  const userData = await ApiRequests.get("professionals/profession/me/", session?.accessToken, true);
  console.log(userData);

  return (
    <div>
      <ProfessionalClientDetailsPage userData={userData} />
    </div>
  )
}

export default ProfessionalDetailsPage
import React from 'react'
import ProfessionalEducationClient from './page-client'
import { auth } from '@/auth';
import { ApiRequests } from '@/lib/requests/api-requests';

const ProfessionalEducationPage = async() => {

  const session = await auth();
  const data = await ApiRequests.get("professionals/education/", session?.accessToken, true);
  console.log(data);

  return (
    <div>
      <ProfessionalEducationClient data={data} />
    </div>
  )
}

export default ProfessionalEducationPage
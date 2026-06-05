
import React from 'react';
import { auth } from '@/auth';
import { ApiRequests } from '@/lib/requests/api-requests';
import BranchesClientPage from './page-client';



const BranchesPage = async() => {
  const session = await auth()

  if (!session?.accessToken) return;
  const resp = await ApiRequests.get("providers/branches/", session?.accessToken, true);
  

  return (
    <BranchesClientPage data={resp} />
  )
}

export default BranchesPage
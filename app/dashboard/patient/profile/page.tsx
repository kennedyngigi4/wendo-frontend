import React from 'react'
import ProfileClientPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'
import { auth } from '@/auth';

const ProfilePage = async() => {
  
  const session = await auth();

  if(!session?.accessToken) return;

  const data = await ApiRequests.get("account/profile", session?.accessToken, true);
  

  return (
    <div>
      <ProfileClientPage data={data} />
    </div>
  )
}

export default ProfilePage
import React from 'react'
import ReviewsClientPage from './page-client'
import { auth } from '@/auth'
import { ApiRequests } from '@/lib/requests/api-requests';

const ReviewsPage = async() => {

  const session = await auth();

  if (!session?.accessToken) return;

  const data = await ApiRequests.get("reviews/my_reviews/", session?.accessToken, true);


  return (
    <div>
      <ReviewsClientPage reviews={data} />
    </div>
  )
}

export default ReviewsPage
import React, { Suspense } from 'react'
import BlogsClientPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const page = async() => {

  const data = await ApiRequests.get("blogs/all/"); 

  return (
    <div className="app-container my-12">
      <Suspense fallback={<div>Loading ....</div>}>
        <BlogsClientPage blogs={data || []} />
      </Suspense>
    </div>
  )
}

export default page
import React, { Suspense } from 'react'
import BlogsClientPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

export const dynamic = "force-dynamic";

const page = async() => {

  const data = await ApiRequests.get("blogs/all/", undefined, true); 

  return (
    <div className="app-container my-12">
      <Suspense fallback={<div>Loading ....</div>}>
        <BlogsClientPage blogs={data} />
      </Suspense>
    </div>
  )
}

export default page
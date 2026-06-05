import React, { Suspense } from 'react'
import BlogsClientPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const page = async() => {

  
  return (
    <div className="app-container my-12">
      <Suspense fallback={<div>Loading ....</div>}>
        <BlogsClientPage />
      </Suspense>
    </div>
  )
}

export default page
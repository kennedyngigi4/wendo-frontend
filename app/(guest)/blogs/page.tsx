import React from 'react'
import BlogsClientPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'

const page = async() => {

  const data = await ApiRequests.get("blogs/all/"); 
  console.log(data)

  return (
    <div className="app-container my-12">

      <BlogsClientPage blogs={data} />
    </div>
  )
}

export default page
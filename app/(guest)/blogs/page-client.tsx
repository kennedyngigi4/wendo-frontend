"use client";

import { BlogHomeModel } from '@/lib/models/blog-models';
import React from 'react'
import BlogCardComponent from '../_components/blog-card-component';

interface BlogsClientPageProps {
    blogs: BlogHomeModel[];
}

const BlogsClientPage = ({ blogs }: BlogsClientPageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {blogs?.map((blog: BlogHomeModel) => (
            <BlogCardComponent blog={blog} />
        ))}

    </div>
  )
}

export default BlogsClientPage
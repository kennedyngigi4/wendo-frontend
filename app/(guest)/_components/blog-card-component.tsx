"use client";

import React from 'react';
import { BlogHomeModel } from '@/lib/models/blog-models';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';


interface BlogCardComponentProps {
  blog: BlogHomeModel;
}

const BlogCardComponent = ({ blog }: BlogCardComponentProps) => {
  return (
    <Card className="cursor-pointer py-0">
      <div className="relative w-full h-[220px]">
        <Image src={blog.image} alt={`${blog.title}`} unoptimized fill className="object-cover" />
      </div>
      
      <CardContent className="space-y-4 pb-5">
        <Link href={`blogs/${blog.slug}/`}>
          <h1 className="text-secondary line-clamp-2 font-semibold">{blog.title}</h1>
          <div className="text-muted-foreground text-sm line-clamp-4"  dangerouslySetInnerHTML={{ __html: blog.exerpt }}></div>
        

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <p>{new Date(blog.published_at).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric"})}</p>
            </div>
            <div>
              
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

export default BlogCardComponent;
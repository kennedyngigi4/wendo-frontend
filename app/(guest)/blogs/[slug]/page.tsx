import React from 'react'
import BlogClientDetailsPage from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests'


type BlogDetailsPageProps = {
    params: Promise<{
        slug: string;
    }>
}

const stripHtml = (html?: string) => html ? html.replace(/<[^>]*>/g, "") : "";

async function getBlog(slug: string) {
    return ApiRequests.get(
        `blogs/blog_details/${slug}`,
        undefined,
        true
    );
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {

    const { slug } = await params;

    const blog = await getBlog(slug);

    return {
        title: blog?.title,
        description: stripHtml(blog?.exerpt).slice(0, 160),
        openGraph: {
            title: blog?.title,
            description: stripHtml(blog?.exerpt),
            images: [blog?.image],
        },
    };
}

const BlogDetailsPage = async ({ params } : BlogDetailsPageProps) => {

    const { slug } = await params;

    const data = await getBlog(slug);

  return (
    <div>
        <BlogClientDetailsPage blog={data} />
    </div>
  )
}

export default BlogDetailsPage
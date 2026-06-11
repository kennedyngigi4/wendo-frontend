"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { BlogDetailsModel } from "@/lib/models/blog-models";

interface BlogDetailsProps {
    blog: BlogDetailsModel
}

const BlogClientDetailsPage = ({ blog }: BlogDetailsProps) => {
    const tags: string[] = blog.tags ?? [];

    

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="relative h-[300px] md:h-[500px]">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50 flex items-end">
                    <div className="app-container pb-10 text-white">
                        <span className="inline-block bg-primary px-4 py-1 rounded-full text-sm mb-4">
                            {blog.category?.name}
                        </span>

                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-200">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>
                                    {/* {blog.author} {blog.author} */} Editor
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>
                                    {new Date(blog.published_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="app-container py-12">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-primary hover:text-blue-700 mb-8"
                >
                    <ArrowLeft size={18} />
                    Back to Blogs
                </Link>

                <div className="max-w-4xl mx-auto">
                    {/* Excerpt */}
                    <div
                        className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-10 text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html: blog.exerpt,
                        }}
                    />

                    {/* Article */}
                    <article
                        className="
              prose
              prose-lg
              max-w-none
              prose-headings:text-gray-900
              prose-p:text-gray-700
              prose-a:text-blue-600
              prose-img:rounded-xl
            "
                        dangerouslySetInnerHTML={{
                            __html: blog.content,
                        }}
                    />

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-12">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Tag size={18} />
                                Tags
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-100 px-4 py-2 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share */}
                    <div className="mt-12 border-t pt-8">
                        <button
                            onClick={() =>
                                navigator.share?.({
                                    title: blog.title,
                                    url: window.location.href,
                                })
                            }
                            className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-3 rounded-lg hover:bg-secondary"
                        >
                            <Share2 size={18} />
                            Share Article
                        </button>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 bg-gradient-to-r bg-primary to-bg-secondary text-white rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">
                            Your Health Journey Starts Here
                        </h2>

                        <p className="text-blue-100 mb-6">
                            Find trusted healthcare providers, book appointments,
                            and access reliable health information with Wendo.
                        </p>

                        <Link
                            href="/doctors"
                            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium"
                        >
                            Find a Specialist
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogClientDetailsPage;




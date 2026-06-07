"use client";

import React from "react";
import { BlogHomeModel } from "@/lib/models/blog-models";
import BlogCardComponent from "../_components/blog-card-component";

interface BlogsClientPageProps {
  blogs: BlogHomeModel[];
}

const BlogsClientPage = ({ blogs }: BlogsClientPageProps) => {
  const hasBlogs = blogs && blogs.length > 0;

  return (
    <div className="app-container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-secondary">
          Health Blogs & Insights
        </h1>

        <p className="text-gray-600 mt-2">
          Read wellness tips, mental health insights, healthcare updates, and
          expert advice from Wendo.
        </p>
      </div>

      {/* Blogs Grid */}
      {hasBlogs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: BlogHomeModel) => (
            <BlogCardComponent
              key={blog?.id}
              blog={blog}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-gray-300 rounded-2xl bg-gray-50">
          <div className="text-5xl mb-4">📝</div>

          <h2 className="text-xl font-semibold text-gray-800">
            No blog posts yet
          </h2>

          <p className="text-gray-500 mt-2 max-w-md">
            We are preparing valuable health and wellness content for you.
            Check back soon for articles, tips, and community stories from
            Wendo.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogsClientPage;
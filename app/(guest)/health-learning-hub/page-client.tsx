"use client"

import Link from 'next/link';
import React from 'react'

export default function ClientHealthLearningHubPage() {
  const featuredTopics = [
    {
      id: 1,
      title: "Antenatal Care Essentials",
      category: "Maternal Health",
      duration: "24 mins",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
      description:
        "Learn the importance of regular ANC visits, nutrition during pregnancy, and warning signs every mother should know.",
    },
    {
      id: 2,
      title: "Managing Diabetes Naturally",
      category: "Chronic Care",
      duration: "18 mins",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
      description:
        "Explore lifestyle habits, diet tips, and medication adherence for diabetes management.",
    },
    {
      id: 3,
      title: "Mental Wellness & Stress",
      category: "Mental Health",
      duration: "30 mins",
      image:
        "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=1200&auto=format&fit=crop",
      description:
        "Mental wellness discussions with psychologists on stress, anxiety, and healthy coping mechanisms.",
    },
  ];

  const latestEpisodes = [
    {
      id: 1,
      title: "Pregnancy Nutrition Tips",
      speaker: "Dr. Mercy Wanjiku",
      date: "May 2026",
    },
    {
      id: 2,
      title: "Understanding Hypertension",
      speaker: "Dr. Kevin Otieno",
      date: "May 2026",
    },
    {
      id: 3,
      title: "Children Immunization Guide",
      speaker: "Dr. Anita Muthoni",
      date: "April 2026",
    },
  ];

  const categories = [
    "Maternal Health",
    "Mental Health",
    "Nutrition",
    "Cardiology",
    "Pediatrics",
    "Diabetes",
    "Dental Care",
    "Fitness",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-red-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="relative app-container px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              Wendo Health Learning Hub
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Learn About Your Health From Trusted Experts
            </h1>

            <p className="mt-6 text-lg text-slate-200 md:text-xl">
              Watch podcasts, explore expert insights, discover healthcare tips,
              and learn from verified professionals across Kenya.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#featured-topics">
                <button className="rounded-2xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700">
                  Explore Topics
                </button>
              </Link>
              
              <Link href="#latest-podcasts">
                <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold backdrop-blur-md transition hover:bg-white/20">
                  Watch Latest Podcast
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="app-container relative z-10 -mt-10 px-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Search health topics, podcasts, conditions or specialists"
              className="h-14 flex-1 rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-blue-600"
            />

            <button className="h-14 rounded-2xl bg-slate-900 px-8 font-semibold text-white transition hover:bg-slate-800">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="app-container px-5 py-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium transition hover:border-blue-600 hover:text-blue-600"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED TOPICS */}
      <section id="featured-topics" className="app-container px-5 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Health Topics
            </h2>
            <p className="mt-2 text-slate-600">
              Educational health discussions curated by medical professionals.
            </p>
          </div>

          <button className="hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium transition hover:border-blue-600 hover:text-blue-600 md:block">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredTopics.map((topic) => (
            <div
              key={topic.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur-md">
                  {topic.category}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                  <span>Podcast Episode</span>
                  <span>{topic.duration}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {topic.title}
                </h3>

                <p className="mt-4 line-clamp-3 text-slate-600">
                  {topic.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <button className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800">
                    Watch Episode
                  </button>

                  <button className="text-sm font-semibold text-blue-600 hover:underline">
                    Read Summary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST PODCASTS */}
      <section id="latest-podcasts" className="bg-white py-16">
        <div className="app-container px-5">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Latest Podcast Episodes
            </h2>
            <p className="mt-2 text-slate-600">
              Hear from healthcare professionals discussing real patient care,
              prevention, and healthy living.
            </p>
          </div>

          <div className="space-y-5">
            {latestEpisodes.map((episode) => (
              <div
                key={episode.id}
                className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-600 md:flex-row md:items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {episode.title}
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Guest {episode.speaker}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                    {episode.date}
                  </span>

                  <button className="rounded-2xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700">
                    Play Episode
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="app-container px-5 py-20">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-950 to-slate-900 p-10 text-white md:p-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold md:text-5xl">
              Empowering Better Health Through Education
            </h2>

            <p className="mt-5 text-lg text-slate-300">
              Wendo connects patients with trusted healthcare professionals,
              educational content, podcasts, and health services all in one
              platform.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700">
                Start Learning
              </button>

              <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold backdrop-blur-md transition hover:bg-white/20">
                Browse Topics
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Stethoscope,
  Building2,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface SearchResult {
  id: string;
  result_type: "specialist" | "branch" | "blog";
  display_name: string;
  profile_photo?: string;
  banner?: string;
  specialty?: string;
  type?: string;
  location_name?: string;
  years_of_experience?: number;
  accepts_nhif?: boolean;
  slug?: string;
}

interface SearchClientPageProps {
  query: string;
  results: SearchResult[];
}

const SearchClientPage = ({
  query,
  results,
}: SearchClientPageProps) => {

  const [activeTab, setActiveTab] = useState<
    "all" | "specialist" | "branch" | "blog"
  >("all");

  const filteredResults = useMemo(() => {
    if (activeTab === "all") return results;

    return results.filter(
      (item) => item.result_type === activeTab
    );
  }, [activeTab, results]);

  const counts = {
    all: results.length,
    specialist: results.filter(
      (item) => item.result_type === "specialist"
    ).length,
    branch: results.filter(
      (item) => item.result_type === "branch"
    ).length,
    blog: results.filter(
      (item) => item.result_type === "blog"
    ).length,
  };

  return (
    <div className="min-h-screen pb-20">

      {/* Hero */}
      <div className="rounded-3xl bg-primary px-5 py-10 text-white sm:px-8 lg:px-12">

        <div className="max-w-3xl">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            <Search size={16} />
            Search Results
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Results for "{query}"
          </h1>

          <p className="mt-4 text-sm text-slate-200 sm:text-base">
            Discover specialists, hospitals, clinics and trusted
            healthcare content on Wendo.
          </p>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-3">

            {[
              {
                key: "all",
                label: `All (${counts.all})`,
              },
              {
                key: "specialist",
                label: `Specialists (${counts.specialist})`,
              },
              {
                key: "branch",
                label: `Facilities (${counts.branch})`,
              },
              {
                key: "blog",
                label: `Articles (${counts.blog})`,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key as any)
                }
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${activeTab === tab.key
                    ? "bg-white text-[#081F5C]"
                    : "bg-white/10 text-white hover:bg-white/20"
                  }`}
              >
                {tab.label}
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredResults.length > 0 ? (
          filteredResults.map((item) => {

            /* Specialist */
            if (item.result_type === "specialist") {
              return (
                <Link
                  href={`/specialists/${item.id}`}
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="relative h-52 bg-slate-100">

                    {item.profile_photo ? (
                      <Image
                        unoptimized
                        src={item.profile_photo}
                        alt={item.display_name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Stethoscope
                          className="text-slate-400"
                          size={40}
                        />
                      </div>
                    )}

                  </div>

                  <div className="p-5">

                    <div className="mb-3 flex items-center justify-between">

                      <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        Specialist
                      </div>

                      {item.accepts_nhif && (
                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                          <ShieldCheck size={14} />
                          SHA
                        </div>
                      )}

                    </div>

                    <h2 className="text-xl font-bold text-secondary">
                      {item.display_name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.specialty}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={16} />
                      {item.years_of_experience || 0}+ years
                      experience
                    </div>

                  </div>
                </Link>
              );
            }

            /* Branch */
            if (item.result_type === "branch") {
              return (
                <Link
                  href={`/facilities/${item.id}`}
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="relative h-52 bg-slate-100">

                    {item.banner ? (
                      <Image
                        src={item.banner}
                        alt={item.display_name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Building2
                          className="text-slate-400"
                          size={40}
                        />
                      </div>
                    )}

                  </div>

                  <div className="p-5">

                    <div className="mb-3 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                      Facility
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                      {item.display_name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.type}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={16} />
                      {item.location_name ||
                        "Location unavailable"}
                    </div>

                  </div>
                </Link>
              );
            }

            /* Blog */
            return (
              <Link
                href={`/blogs/${item.slug}`}
                key={item.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Article
                </div>

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#081F5C]">
                  <FileText size={28} />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {item.display_name}
                </h2>

                <p className="mt-6 text-sm text-slate-500">
                  Read article →
                </p>

              </Link>
            );
          })
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Search size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              No results found
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Try searching for doctors, specialties,
              hospitals, clinics or healthcare topics.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default SearchClientPage;




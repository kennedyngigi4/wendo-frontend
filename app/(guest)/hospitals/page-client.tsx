"use client";

import React from 'react';
import { PaginatedResponse, ProviderBranchCard } from '@/lib/models/provider-models';
import ProviderHCard from '../../_components/provider-h-card';
import HospitalFilterCard from './_components/filter-hospitals';
import { useRouter, useSearchParams } from 'next/navigation';


interface HospitalsClientProps{
  hospitalsData: PaginatedResponse<ProviderBranchCard>;
}

const HospitalsClient = ({ hospitalsData }: HospitalsClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const hospitals = hospitalsData.results;

  const hasNext = !!hospitalsData.next;
  const hasPrevious = !!hospitalsData.previous;

  const changePage = (page: number) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));

    router.push(`/hospitals?${params.toString()}`);
  };

  return (
    <div className="app-container">
      <div className="flex flex-col md:flex-row gap-4 py-8 max-md:px-5">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            {/* Filters */}
            <div className="md:col-span-3">
              <HospitalFilterCard />
            </div>

            {/* Clinics */}
            <div className="md:col-span-9">

              {/* Empty State */}
              {hospitals.length === 0 ? (
                <div className="border bg-blue-50 rounded-2xl p-10 text-center">
                  <h2 className="text-xl font-semibold">
                    No listed hospitals
                  </h2>

                  <p className="text-muted-foreground mt-2">
                    No hospitals match your current filters.
                  </p>
                </div>
              ) : (
                <>
                  {/* Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {hospitals.map((clinic: any) => (
                      <div key={clinic.id}>
                        <ProviderHCard
                          hospital={clinic}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-center gap-5 mt-10 text-sm">

                    <button
                      disabled={!hasPrevious}
                      onClick={() =>
                        changePage(currentPage - 1)
                      }
                      className="px-3 py-3 border rounded-xl disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <div className="font-medium">
                      Page {currentPage}
                    </div>

                    <button
                      disabled={!hasNext}
                      onClick={() =>
                        changePage(currentPage + 1)
                      }
                      className="px-3 py-3 border rounded-xl disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalsClient






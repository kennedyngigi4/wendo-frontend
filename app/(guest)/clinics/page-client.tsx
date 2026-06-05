"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProviderHCard from "@/app/_components/provider-h-card";
import { ProviderBranchCard, PaginatedResponse, } from "@/lib/models/provider-models";
import ClinicFilterCard from "./_components/clinic-filter";

interface ClientClinicsPageProps {
    clinicsData: PaginatedResponse<ProviderBranchCard>;
}


const ClientClinicsPage = ({
    clinicsData,
}: ClientClinicsPageProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const clinics = clinicsData.results;

    const hasNext = !!clinicsData.next;
    const hasPrevious = !!clinicsData.previous;

    const changePage = (page: number) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("page", String(page));

        router.push(`/clinics?${params.toString()}`);
    };

    return (
        <div className="app-container">
            <div className="flex flex-col md:flex-row gap-4 py-8 max-md:px-5">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                        {/* Filters */}
                        <div className="md:col-span-3">
                            <ClinicFilterCard />
                        </div>

                        {/* Clinics */}
                        <div className="md:col-span-9">

                            {/* Empty State */}
                            {clinics.length === 0 ? (
                                <div className="border bg-blue-50 rounded-2xl p-10 text-center">
                                    <h2 className="text-xl font-semibold">
                                        No listed clinics
                                    </h2>

                                    <p className="text-muted-foreground mt-2">
                                        No clinics match your current filters.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* Cards */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                        {clinics.map((clinic: any) => (
                                            <div key={clinic.id}>
                                                <ProviderHCard
                                                    hospital={clinic}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex items-center justify-center gap-3 mt-10">

                                        <button
                                            disabled={!hasPrevious}
                                            onClick={() =>
                                                changePage(currentPage - 1)
                                            }
                                            className="px-4 py-2 border rounded-xl disabled:opacity-50"
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
                                            className="px-4 py-2 border rounded-xl disabled:opacity-50"
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
};

export default ClientClinicsPage;





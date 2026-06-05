"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ServiceCard from "./service-card";

interface ExpandableServicesProps {
    services: any[];
}

const SERVICES_PER_ROW = 3;
const DEFAULT_ROWS = 2;

export const ExpandableServices = ({
    services,
}: ExpandableServicesProps) => {
    const [expanded, setExpanded] = useState(false);

    const visibleCount = SERVICES_PER_ROW * DEFAULT_ROWS;

    const shouldCollapse = services.length > visibleCount;

    const visibleServices = useMemo(() => {
        if (expanded) return services;

        return services.slice(0, visibleCount);
    }, [expanded, services]);

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                {visibleServices.map((service, index) => (
                    <ServiceCard key={service.id} data={service} />
                ))}
            </div>

            {shouldCollapse && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        text-primary
                        font-semibold
                        hover:text-secondary
                        transition-colors
                    "
                >
                    {expanded ? (
                        <>
                            See Less
                            <ChevronUp size={18} />
                        </>
                    ) : (
                        <>
                            See More Services
                            <ChevronDown size={18} />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};
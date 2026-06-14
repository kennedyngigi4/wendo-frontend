"use client";

import React from "react";
import Image from "next/image";
import { MapPinIcon, Star } from "lucide-react";
import { ProviderBranchCard } from "@/lib/models/provider-models";
import Link from "next/link";

interface ProviderComponentCardProps {
    provider: ProviderBranchCard;
}

const ProviderComponentCard = ({ provider }: ProviderComponentCardProps) => {
    return (
        <div className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">

            {/* IMAGE */}
            <div className="relative w-full h-[250px] overflow-hidden">
                <Image
                    src={provider.banner}
                    alt={provider.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* STATUS */}

                <div className="absolute top-3 left-3">
                    <span
                        className={`px-3 py-1 text-xs rounded-full text-white ${provider.is_open ? "bg-green-600" : "bg-red-600"
                            }`}
                    >
                        {provider.is_open ? "Open Now" : "Closed"}
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <Link href={`/hospitals/${provider.slug}/`}>
                <div className="p-3">

                    {/* NAME + RATING */}
                    <div className="flex items-start gap-2">
                        <h3 className="flex-1 text-sm font-semibold text-secondary line-clamp-2">
                            {provider.name}
                        </h3>

                        <div className="flex items-center gap-1 text-xs text-yellow-500 shrink-0">
                            {provider.rating > 0 ? (
                                <>
                                    <Star size={14} fill="currentColor" />
                                    <span>{provider.rating}</span>
                                </>
                            ) : (
                                <p className="text-xs">No ratings</p>
                            )}
                        </div>
                    </div>

                    {/* TYPE */}
                    <p className="flex text-xs text-gray-500 mt-1 capitalize space-x-3 flex-wrap">
                        <span>{provider?.provider_type}</span> <span>•</span> 
                        <span>{provider?.ownership_type}</span> <span>•</span> 
                        <span>{provider?.level}</span>
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-1 mt-2">
                        {provider.accepts_nhif && (
                            <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded">
                                SHA Accepted
                            </span>
                        )}

                        {provider?.has_ambulance && (
                            <span className="text-xs bg-blue-50 px-2 py-1 rounded-md">
                                Ambulance
                            </span>
                        )}

                        {provider?.has_pharmacy && (
                            <span className="text-xs bg-blue-50 px-2 py-1 rounded-md">
                                Pharmacy
                            </span>
                        )}
                        
                    </div>

                    {/* LOCATION */}
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                        <MapPinIcon size={12} className="text-primary" />
                        <p className="truncate text-primary">{provider.location_name}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProviderComponentCard;
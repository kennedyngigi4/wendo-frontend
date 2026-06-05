"use client";

import { useState } from "react";
import Image from "next/image";
import { ProviderBranchDetailsModel } from "@/lib/models/provider-models";


interface ProviderBannerProps {
    provider: ProviderBranchDetailsModel;
}

export default function ProviderBanner({ provider }: ProviderBannerProps) {
    const [imgError, setImgError] = useState(false);

    const hasBanner = provider?.banner && !imgError;

    if (hasBanner) {
        return (
            <Image
                src={provider?.banner}
                alt={provider.name}
                fill
                unoptimized
                className="object-cover"
                onError={() => setImgError(true)}
            />
        );
    }

    // 🎨 CATEGORY-BASED FALLBACK
    const categoryStyles = {
        hospital: "from-blue-500 to-blue-700",
        clinic: "from-teal-500 to-teal-700",
        pharmacy: "from-green-500 to-green-700",
        lab: "from-purple-500 to-purple-700",
    };

    const bg = categoryStyles[provider.provider_type?.toLowerCase()] ||
        "from-gray-400 to-gray-600";

    return (
        <div
            className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${bg}`}
        >
            <span className="text-white text-lg font-semibold text-center px-4">
                {provider.name}
            </span>
        </div>
    );
}
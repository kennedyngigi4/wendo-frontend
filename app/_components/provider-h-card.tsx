"use client";

import React from "react";
import Image from "next/image";
import { MapPin, PhoneIcon, Star } from "lucide-react";
import { ProviderBranchList } from "@/lib/models/provider-models";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProviderHCardProps {
  hospital: ProviderBranchList;
}

const ProviderHCardPremium = ({ hospital }: ProviderHCardProps) => {
  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer bg-white overflow-hidden">

      {/* IMAGE */}
      <div className="md:w-1/3 relative min-h-[220px] md:min-h-full">
        <div className="absolute inset-0">
          <Image
            src={hospital.banner}
            alt={hospital.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* STATUS BADGE */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-3 py-1 text-xs rounded-full text-white ${hospital.is_open ? "bg-green-600" : "bg-red-600"
              }`}
          >
            {hospital.is_open ? "Open Now" : "Closed"}
          </span>
        </div>

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="md:w-2/3 p-4 flex flex-col justify-between space-y-3">

        {/* TOP SECTION */}
        <Link href={`/hospitals/${hospital.slug}/`}>
        <div>
          <div className="flex items-start gap-2">
            {/* truncate leading-tight */}
            <h2 className="flex-1 text-lg font-semibold text-secondary leading-snug line-clamp-2"> 
              {hospital.name}
            </h2>

            <div className="flex items-center gap-1 text-sm text-yellow-500 shrink-0">
              {hospital.rating > 0 ? (
                <>
                  <Star size={14} fill="currentColor" />
                  <span>{hospital.rating}</span>
                </>
              ) : (
                <p className="text-xs">No ratings</p>
              )}
              
            </div>
          </div>

          {/* TYPE + SPECIALTIES */}
          <p className="text-xs text-gray-500 mt-1">
            Hospital • General Care • Emergency
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 pt-4">
            <span className="text-xs bg-blue-50 px-2 py-1 rounded-md">
              24/7
            </span>
            <span className="text-xs bg-blue-50 px-2 py-1 rounded-md">
              SHA Accepted
            </span>
            <span className="text-xs bg-blue-50 px-2 py-1 rounded-md">
              Pharmacy
            </span>
          </div>
        </div>

        {/* MIDDLE INFO */}
        <div className="mt-4 space-y-1">

          <div className="flex items-center gap-2 text-sm text-primary">
            <PhoneIcon size={14} />
            <p className="truncate">{hospital.phone}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-primary">
            <MapPin size={14} />
            <p className="truncate">{hospital.location_name}</p>
          </div>

          {/* HOURS */}
          <div className="mt-4">
            {hospital.availability && (
              <span className={cn("text-xs px-2 py-1 rounded", hospital.availability.available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                  {hospital.availability.message}
              </span>
            )}
          </div>

          {/* DISTANCE (optional) 
          <p className="text-xs text-gray-400">
            2.3 km away
          </p>*/}
        </div>
        </Link>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-3">
          <Button variant="secondary" className="flex-1 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            Book Appointment
          </Button>

          <button className="px-4 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderHCardPremium;
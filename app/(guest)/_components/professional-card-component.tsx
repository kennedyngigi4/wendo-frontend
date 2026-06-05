"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { ProfessionalHomeModel } from "@/lib/models/profession-models";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProfessionalCardProps {
  professional: ProfessionalHomeModel;
}

const ProfessionalCardComponent = ({ professional }: ProfessionalCardProps) => {

  const specialties = professional.specialties || [];

  const visibleSpecialties = specialties.slice(0, 2);
  const remainingCount = specialties.length - visibleSpecialties.length;

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

      {/* IMAGE */}
      <div className="relative w-full h-[180px] bg-gray-100 flex items-center justify-center">

        <Image
          src={professional.profile_photo}
          alt={`${professional.name}`}
          fill
          unoptimized
          className="object-cover"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
            {professional.professional_type}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <Link href={`/doctors/${professional.slug}`}>
        <div className="p-3">

          {/* NAME + RATING */}
          <div className="flex items-start gap-2">
            <h3 className="flex-1 text-sm font-semibold text-secondary line-clamp-2 capitalize">
              {professional.title}. {professional.name}
            </h3>

            {parseFloat(professional.rating) === 0 ? (
              <div className="flex items-center gap-1 text-xs text-yellow-500 shrink-0">
                <Star size={12} fill="currentColor" />
                <span>No Ratings</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs text-yellow-500 shrink-0">
                <Star size={12} fill="currentColor" />
                <span>{professional.rating}</span>
              </div>
            )}
            
          </div>

          {/* SPECIALTY */}
          <div className="flex flex-wrap gap-2 my-2.5">
            {visibleSpecialties.map((spec: any, index: number) => (
              <span
                key={index}
                className="text-xs bg-blue-50 px-2 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}

            {remainingCount > 0 && (
              <span className="text-xs text-gray-500">
                +{remainingCount} more
              </span>
            )}
          </div>

          {/* EXPERIENCE */}
          <p className="text-xs text-gray-600 mt-1">
            {professional.years_of_experience}+ years experience
          </p>

          {/* TAGS & Availability */}
          <div className="flex justify-between gap-1 mt-2">
            {professional.availability && (
              <span className={cn("text-[10px] px-2 py-0.5 rounded", professional.availability.available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                {professional.availability.message}
              </span>
            )}

            {professional.accepts_nhif && (
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                NHIF
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfessionalCardComponent;
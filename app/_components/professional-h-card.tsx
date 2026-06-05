"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { ProfessionalCardModel } from "@/lib/models/profession-models";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";



interface ProfessionalHCardProps {
  professional: ProfessionalCardModel;
}

const ProfessionalHCard = ({ professional }: ProfessionalHCardProps) => {

  const specialties = professional.specialties || [];

  const visibleSpecialties = specialties.slice(0, 2);
  const remainingCount = specialties.length - visibleSpecialties.length;

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">

      {/* IMAGE */}
      <div className="relative w-[90px] h-[90px] rounded-xl overflow-hidden shrink-0 bg-gray-100">
        <Image
          src={professional.profile_photo}
          alt={professional.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between min-w-0">

        {/* TOP */}
        <Link href={`/doctors/${professional.slug}`}>
          <div>
            <div className="flex items-start gap-2">
              {/* NAME */}
              <h2 className="flex-1 text-sm font-semibold text-secondary line-clamp-2 capitalize">
                {professional.title}. {professional.name}
              </h2>

              {/* RATING */}
              {parseFloat(professional.rating) === 0 ?  (
                <div className="flex items-center gap-1 text-xs text-yellow-500 shrink-0">
                  <Star size={12} />
                  <span>No Ratings</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-yellow-500 shrink-0">
                  <Star size={12} fill="currentColor" />
                  <span>{professional.rating}</span>
                </div>
              )}
            </div>

            {/* SPECIALTIES */}
            <div className="flex flex-wrap gap-2 my-2.5">
              {visibleSpecialties.map((spec, index) => (
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

            {/* HOSPITALS */}
            {professional.hospitals && professional.hospitals.length > 0 && (
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-600 min-w-0">
                <MapPin size={12} className="shrink-0" />
                {/* <p className="truncate">
                  {professional.hospitals.join(", ")}
                </p> */}
              </div>
            )}
          </div>
        </Link>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-3">

          <div className="flex flex-col space-y-2">
            {/* AVAILABILITY */}
            <div>
              {professional.availability && (
                <span className={cn("text-xs px-2 py-1 rounded", professional.availability.available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                  {professional.availability.message}
                </span>
              )}
            </div>

            {/* PRICE */}
            {professional.consultation_fee && (
              <p className="text-xs text-primary font-semibold">
                Fees: KES {parseInt(professional.consultation_fee).toLocaleString()}
              </p>
            )}
          </div>

          {/* CTA */}
          <Button variant="secondary" className="px-4 py-2 rounded-lg text-xs font-medium hover:opacity-90 shrink-0">
            Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHCard;
"use client";

import React from 'react';
import Image from 'next/image';
import { EventHomeModel } from '@/lib/models/event-models';
import { formatEventDate, formatEventTime } from '@/lib/helpers/time-formatter';


interface EventCardComponentProps {
    event: EventHomeModel;
}

const EventCardComponent = ({ event }: EventCardComponentProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
      <div className="flex flex-col md:flex-row h-full">

        {/* Image */}
        <div className="relative md:w-1/3 w-full min-h-[220px] md:min-h-full">
          <Image
            src={event.banner}
            alt={event.title}
            fill
            className="object-cover"
            unoptimized
          />

          {/* Status Badge */}
          {event.is_live && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Live
            </div>
          )}
        </div>

        {/* Content */}
        <div className="md:w-2/3 w-full p-5 flex flex-col justify-between">

          {/* TOP SECTION */}
          <div>

            {/* DATE (Improved with range support) */}
            <div className="text-sm text-primary font-medium mb-2">
              {formatEventDate(event)}
            </div>

            {/* TITLE */}
            <h2 className="text-secondary font-semibold text-lg line-clamp-2 min-h-[3.5rem]">
              {event.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-500 line-clamp-3 mt-1 min-h-[3.5rem]">
              {event.excerpt}
            </p>

            {/* META */}
            <div className="flex flex-wrap gap-6 text-xs text-gray-600 mt-6 mb-3">

              {/* Time */}
              <span>
                ⏰ {formatEventTime(event)}
              </span>

              {/* Location */}
              <span>
                📍 {event.mode === "online" ? "Online" : event.city || "Onsite"}
              </span>

              {/* Price */}
              <span className="text-primary font-medium">
                {event.is_paid ? `KES ${parseInt(event.ticket_price).toLocaleString()}` : "Free"}
              </span>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-4 flex items-center justify-between">

            {/* Category */}
            <span className="text-xs bg-blue-100 px-2 py-1 rounded-full capitalize">
              {event.category ? event.category.replace("_", " ") : "General"}
            </span>

            {/* CTA */}
            <button className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary/90">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCardComponent;
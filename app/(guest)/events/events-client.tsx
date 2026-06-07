"use client";

import React from "react";
import EventCardComponent from "../_components/event-card-component";


interface EventsClientPageProps {
  events?: any[];
}

const EventsClientPage = ({ events }: EventsClientPageProps) => {
  const hasEvents = events && events.length > 0;

  return (
    <div className="app-container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-secondary">
          Upcoming Events
        </h1>
        <p className="text-gray-600 mt-2">
          Stay updated with health talks, medical camps, wellness sessions, screenings, and
          community events.
        </p>
      </div>

      {/* Events List */}
      {hasEvents ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <EventCardComponent
              key={event?.id || index}
              event={event}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-gray-300 rounded-2xl bg-gray-50">
          <div className="text-5xl mb-4">📅</div>

          <h2 className="text-xl font-semibold text-gray-800">
            No events available
          </h2>

          <p className="text-gray-500 mt-2 max-w-md">
            There are currently no upcoming events. Check back later for health
            workshops, awareness campaigns, and wellness activities.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsClientPage;
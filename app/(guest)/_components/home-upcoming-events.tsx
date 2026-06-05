"use client";

import React, { useRef } from 'react';
import EventCardComponent from './event-card-component';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";


interface HomeUpcomingEventsProps {
    events: any[];
}

const HomeUpcomingEvents = ({ events }: HomeUpcomingEventsProps) => {

    const prevProvRef = useRef(null);
    const nextProvRef = useRef(null);

  return (
    <div className="bg-blue-50 py-8">
        <div className="app-container pb-8">
            <h1 className="text-center text-secondary font-semibold text-2xl pb-3">Upcoming Events</h1>
            <div className="relative overflow-visible">

                  <Swiper
                      modules={[Autoplay, Navigation, A11y]}
                      onSwiper={(swiper) => {
                          // delay to ensure refs exist
                          setTimeout(() => {
                              if (
                                  swiper.params.navigation &&
                                  typeof swiper.params.navigation !== "boolean"
                              ) {
                                  swiper.params.navigation.prevEl = prevProvRef.current;
                                  swiper.params.navigation.nextEl = nextProvRef.current;

                                  swiper.navigation.init();
                                  swiper.navigation.update();
                              }
                          });
                      }}
                      navigation={{}}
                      spaceBetween={16}
                      slidesPerView={1}
                      slidesPerGroup={1}
                      autoplay={{ delay: 5000, disableOnInteraction: false }}
                      rewind
                      speed={1800}
                      breakpoints={{
                          640: {
                              slidesPerView: 1,
                          },
                          768: {
                              slidesPerView: 1.5,
                          },
                          1024: {
                              slidesPerView: 2,
                          },
                      }}
                      className="z-0"
                  >
                      {events?.map((event: any) => (
                        <SwiperSlide key={event.id}>
                            <EventCardComponent event={event} />
                        </SwiperSlide>
                      ))}
                  </Swiper>


                {/* LEFT */}
                <button ref={prevProvRef} className="prev-btn absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 
                bg-white/90 backdrop-blur-md shadow-md 
                hover:bg-white transition 
                rounded-full p-3">

                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                  </button>

                  {/* RIGHT */}
                  <button ref={nextProvRef} className="next-btn absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 
                bg-white/90 backdrop-blur-md shadow-md 
                hover:bg-white transition 
                rounded-full p-3">

                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                  </button>
            </div>
        </div>
    </div>
  )
}

export default HomeUpcomingEvents
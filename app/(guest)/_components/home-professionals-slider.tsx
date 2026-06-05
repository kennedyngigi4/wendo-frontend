"use client"

import React, { useRef } from 'react';
import { ProfessionalHomeModel } from '@/lib/models/profession-models';
import ProfessionalCardComponent from './professional-card-component';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";



interface HomeProfessionalsSliderProps {
    professionals: ProfessionalHomeModel[];
}


const HomeProfessionalsSlider = ({ professionals }: HomeProfessionalsSliderProps) => {

    const paginationRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="app-container">
            <h1 className="text-2xl font-semibold text-secondary pb-3">Top Doctors</h1>

            <div className="relative overflow-visible">
                <Swiper
                    modules={[Autoplay, Navigation,  A11y ]}
                    onSwiper={(swiper) => {
                        // delay to ensure refs exist
                        setTimeout(() => {
                            if (
                                swiper.params.navigation &&
                                typeof swiper.params.navigation !== "boolean"
                            ) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;

                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });
                    }}
                    navigation={{}}
                    spaceBetween={16}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="z-0"
                >
                    {professionals?.map((professional: ProfessionalHomeModel) => (
                        <SwiperSlide key={professional.id}>
                            <ProfessionalCardComponent professional={professional} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                {/* LEFT */}
                <button ref={prevRef} className="prev-btn absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 
                bg-white/90 backdrop-blur-md shadow-md 
                hover:bg-white transition 
                rounded-full p-3">

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* RIGHT */}
                <button ref={nextRef} className="next-btn absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 
                bg-white/90 backdrop-blur-md shadow-md 
                hover:bg-white transition 
                rounded-full p-3">

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>


            </div>
        </div>
    );
}

export default HomeProfessionalsSlider
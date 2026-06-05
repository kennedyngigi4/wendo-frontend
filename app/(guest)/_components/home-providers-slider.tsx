"use client";

import React, { useRef } from 'react'
import ProviderComponentCard from './provider-card-component';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { ProviderBranchCard } from '@/lib/models/provider-models';


interface HomeProvidersSliderProps {
    providers: ProviderBranchCard[];
}

const HomeProvidersSlider = ({ providers }: HomeProvidersSliderProps) => {

    
    const prevProvRef = useRef(null);
    const nextProvRef = useRef(null);


    return (
        <div className="app-container">
            <h1 className="text-2xl font-semibold text-secondary pb-3">Top Medical Centers</h1>
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
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="z-0"
                >
                {providers?.map((provider: ProviderBranchCard) => (
                    <SwiperSlide key={provider.id}>
                        <ProviderComponentCard provider={provider} />
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
    )
}

export default HomeProvidersSlider
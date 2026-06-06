"use client";

import React from "react";
import { CONSTANTS } from "@/lib/constants/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";

const ProviderHubSlider = () => {
    return (
        <div className="app-container w-full">
            <div className="relative overflow-visible">
                <Swiper
                    modules={[Autoplay, A11y]}
                    spaceBetween={20}
                    slidesPerView={2}
                    centeredSlides={false}
                    breakpoints={{
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 24,
                        },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    className="z-0"
                >
                    {CONSTANTS.providerHubs.map((provider) => (
                        <SwiperSlide key={provider.id}>
                            <div className="h-full p-5 border border-slate-100 shadow-sm rounded-2xl bg-white hover:shadow-xl hover:bg-slate-50 transition-all duration-300">
                                <Image
                                    src={provider.icon}
                                    alt={provider.title}
                                    width={50}
                                    height={50}
                                />

                                <div className="pt-3 space-y-2">
                                    <h1 className="text-secondary font-semibold text-sm">
                                        {provider.title}
                                    </h1>

                                    <p className="text-muted-foreground text-xs">
                                        {provider.subtitle}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProviderHubSlider;
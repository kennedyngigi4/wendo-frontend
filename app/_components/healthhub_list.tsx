"use client"
import { healthhubData } from '@/lib/data'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

const HealthHubSlider = () => {
  return (
    <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        autoplay={true}
        rewind
        pagination={{clickable: true}}
        style={{
            "--swiper-pagination-color": "#FF0000",
        }}
        breakpoints={{
            360: { // >= small screens (mobile)
                slidesPerView: 2,
            },
            640: { // >= small screens (mobile)
                slidesPerView: 2,
            },
            824: { // >= large screens
                slidesPerView: 5,
            },
        }}
        className="w-full h-[180px] md:h-[180px] z-10"
    >
        {healthhubData.map((item: any) => (
            <SwiperSlide key={item.id}>
                <div className="shadow rounded-2xl hover:shadow-xl hover:cursor-pointer">

                    <Image src={item.icon} alt={`${item.title} AFYHUB AFRICA`} width={80} height={80} className="mx-auto" />

                    <div className="py-4 px-3">
                        <h1 className="text-afyblue text-center font-semibold">{item?.title}</h1>
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default HealthHubSlider
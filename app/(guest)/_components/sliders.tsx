"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";

const caption = {
    hidden: { opacity: 0, y: 40, scale: 0.98, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Sliders() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="z-10">
            <Swiper
                modules={[Pagination, Autoplay, A11y]}
                slidesPerView={1}
                spaceBetween={0}
                pagination={{ clickable: true }}
                style={{
                    "--swiper-pagination-color": "#FF0000",
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                rewind
                speed={1200}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                className="w-full h-[300px] md:h-[400px] z-10"
            >
                {/* Slide 0 */}
                <SwiperSlide className="relative w-full h-[300px] z-20">
                    <Image src="/assets/images/slides/1.jpg" alt="Slide 1" fill className="object-cover z-10 w-full h-[300px]" priority />
                    <div className="absolute inset-0 bg-black/30 flex pt-20 justify-center z-10">
                        <motion.div
                            variants={caption}
                            initial="hidden"
                            animate={activeIndex === 0 ? "visible" : "hidden"}
                            className="text-center z-10"
                        >
                            <h2 className="text-white text-3xl md:text-5xl font-bold">CONNECT . TRUST . CARE</h2>
                            <p className="text-white/90 mt-3 text-xl">Connecting You to Trusted Healthcare</p>
                        </motion.div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}

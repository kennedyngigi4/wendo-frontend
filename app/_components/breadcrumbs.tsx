"use client";

import React from 'react';
import { motion } from 'framer-motion';


interface BreadcrumbsProps {
    title: string;
}

const BreadcrumbsPage = ({ title }: BreadcrumbsProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center-safe w-full md:h-70 h-40 bg-[url('/assets/images/bg/3.jpg')] bg-center bg-cover">
        {/* Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/95 to-primary/60"></div>

        <motion.h1 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 font-bold text-white text-5xl"
        >
            {title}
        </motion.h1>
    </div>
  )
}

export default BreadcrumbsPage
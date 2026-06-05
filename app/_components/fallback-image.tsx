"use client";

import React from 'react'
import { CONSTANTS } from '@/lib/constants/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FallbackImageProps {
    height: any
    width: any
}

const FallbackImage = ({ height, width }: FallbackImageProps) => {

    const imgWidth = Number(width) / 2;
    const imgHeight = Number(height) / 2;

    return (
        <div className={cn(`flex items-center justify-center bg-white rounded w-[${width}px] h-[${height}px]`)}>
            <Image 
                src="/favicon.png" 
                alt={`${CONSTANTS.keywords}`}
                width={imgWidth}
                height={imgHeight}
            />
        </div>
    );
}

export default FallbackImage






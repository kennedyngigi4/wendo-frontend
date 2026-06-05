"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardEmptyStatsProps {
    icon: LucideIcon,
    title: string,
    subtitle: string,
}

const DashboardEmptyStats = ({ icon, title, subtitle}: DashboardEmptyStatsProps) => {
    const Icon = icon;
    
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <Icon className="w-6 h-6 text-gray-300 mb-2" />
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-gray-500">
                {subtitle}
            </p>
        </div>
    )
}

export default DashboardEmptyStats
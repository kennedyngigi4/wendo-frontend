"use client";

import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';


interface StatisticsCardComponentProps {
    stat: any;
}

const StatisticsCardComponent = ({ stat}: StatisticsCardComponentProps) => {

    const Icon = stat.icon;

    return (
        <Card>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-3">
                    <div>
                        <div className={cn("p-2 rounded-full", stat.iconbg)}>
                            <Icon size={13} className={cn("", stat.iconbg)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="">{stat.title}</h1>
                        <p className="font-bold">{Number(stat.stats).toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default StatisticsCardComponent
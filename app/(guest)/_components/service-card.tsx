"use client";

import React from 'react'
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BranchServiceModel } from '@/lib/models/service-models';



interface ServiceCardProps {
    data: BranchServiceModel;
}

const ServiceCard = ({ data }: ServiceCardProps) => {
    

    return (
        <Card className="shadow-lg hover:bg-blue-50 hover:shadow-xl cursor-pointer border-none border-0">
            <CardContent>
                <Image src={data?.service.icon} alt={`${data.service_name}`} unoptimized width={60} height={60} />
                
                <div className="pt-4">
                    <h1 className="line-clamp-2 text-secondary font-semibold">{data.service_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.description}} className="text-sm text-slate-700 line-clamp-4"></div>
                </div>

            </CardContent>
        </Card>
    )
}

export default ServiceCard
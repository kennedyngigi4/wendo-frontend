"use client";

import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar1Icon, CalendarCheck2Icon, ClockCheck, History, Hospital, Laptop2Icon, SearchIcon, User2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';



const cards = [
    {
        "id": 1,
        "title": "Find a Specialist",
        "icon": SearchIcon,
        "subTitle": "Search a specialist of your choice.",
        "url": "/doctors",
        "iconBgColor": "bg-blue-500",
        "bgColor": "bg-blue-50",
    },
    {
        "id": 2,
        "title": "Find a Hospital",
        "icon": Hospital,
        "subTitle": "Search hospitals near you.",
        "url": "/hospitals",
        "iconBgColor": "bg-green-500",
        "bgColor": "bg-green-50",
    },
    {
        "id": 3,
        "title": "My Appointments",
        "icon": CalendarCheck2Icon,
        "subTitle": "View and manage your appointments.",
        "url": "/dashboard/patient/appointments",
        "iconBgColor": "bg-orange-500",
        "bgColor": "bg-orange-50",
    },
    {
        "id": 4,
        "title": "TeleHealth",
        "icon": Laptop2Icon,
        "subTitle": "Coming soon.",
        "url": "#",
        "iconBgColor": "bg-purple-700",
        "bgColor": "bg-purple-50",
    }
]

const PatientDashboardClient = () => {

    const { data:session } = useSession();
    const navCards = cards;

    if(!session?.accessToken) return;

    return (
        <div className="space-y-5 p-5 pb-20">
            <div className="bg-white shadow rounded-lg p-5">
                <h1 className="text-xl font-bold">Good afternoon, {session?.user?.name}!</h1>
                <p className="text-sm pt-2">Welcome back to Wendo.</p>
                <p className="text-sm text-slate-500">Connecting You to Trusted Healthcare</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-14">

                {navCards.map((card) => {

                    const Icon = card.icon;

                    return(
                        <Card key={card.id} className={`${card.bgColor}`}>
                            <CardContent className="space-y-6">
                                <div className={`w-8 h-8 rounded-full flex items-center mt-5 ${card.iconBgColor}`}>
                                    <Icon size={16} className="text-white mx-auto items-center" />
                                </div>

                                <div className="pt-3 pb-4">
                                    <h3 className="font-semibold">{card.title}</h3>
                                    <p className="text-slate-500">{card.subTitle}</p>
                                </div>

                                <Link href={`${card.url}`}>
                                    <ArrowRight size={15} />
                                </Link>
                            </CardContent>
                        </Card>
                    );
                })}
                
            </div>

            
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                <div>
                    <Card>
                        <CardContent>
                            <h1 className="font-semibold flex items-center space-x-1"><Calendar1Icon size={13} /> <span>Upcoming Appointments</span></h1>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardContent>
                            <h1 className="font-semibold flex items-center space-x-1"><User2Icon size={13} /> <span>Complete Your Profile</span></h1>
                        </CardContent>
                    </Card>
                </div>
            </div>


            <div className="mt-10">
                <Card>
                    <CardContent>
                        <h1 className="font-semibold flex items-center space-x-1"><History size={13} /> <span>Recent Activity</span></h1>
                    </CardContent>
                </Card>
            </div> */}

        </div>
    )
}

export default PatientDashboardClient
"use client";

import React from 'react';
import { Calendar1Icon, CalendarCheck2Icon, Clock10Icon, Clock4Icon, CrownIcon, StarIcon, Users2Icon } from 'lucide-react';
import StatisticsCardComponent from '../_components/statistics-card-component';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import CustomButton from '@/components/ui/custom-button';
import DashboardEmptyStats from '../../_components/dashboard-empty-stats';
import FallbackImage from '@/app/_components/fallback-image';
import Image from 'next/image';
import { CONSTANTS } from '@/lib/constants/constants';


interface ProfessionalPageClientProps{
    data: any;
}


const ProfessionalPageClient = ({ data }: ProfessionalPageClientProps) => {
    
    const statsCards = [
        {
            id: 1,
            title: "Appointments Today",
            stats: data?.stats?.todays_appointments ?? 0,
            icon: Calendar1Icon,
            iconbg: "bg-blue-100"
        },
        {
            id: 2,
            title: "Upcoming Bookings",
            stats: data?.stats?.upcoming_appointments ?? 0,
            icon: Clock10Icon,
            iconbg: "bg-green-100"
        },
        {
            id: 3,
            title: "Total Patients Served",
            stats: data?.stats?.total_patients ?? 0,
            icon: Users2Icon,
            iconbg: "bg-purple-100"
        },
        {
            id: 5,
            title: "Average Rating",
            stats: data?.stats?.average_rating ?? 0,
            icon: StarIcon,
            iconbg: "bg-yellow-50"
        }
    ]

    return (
        <div className="flex flex-col space-y-5">
            {/* NAME + PHOTO + PROFESSION */}
            <div className="flex flex-row gap-3 bg-white py-2 shadow rounded-xl w-[30%]">
                <div className="ps-3">
                    {data?.profile?.photo ? (
                        <div className="w-[50px] height=[50px]">
                            <Image 
                                unoptimized
                                src={data.profile.photo}
                                alt={`${data.profile.name}`}
                                width={70}
                                height={70}
                                className="rounded-full"
                            />
                        </div>
                    ) : (
                        <FallbackImage width = { 50 } height = { 50 } />
                    )}
                    
                </div>
                <div>
                    <h1 className="text-primary font-semibold">{data?.profile?.name}</h1>
                    <p className="text-xs text-secondary">{data?.profile?.profession}</p>
                </div>
            </div>

            {/* STATISTICS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {statsCards.map((stat) => {
                    return (
                        <StatisticsCardComponent stat={stat} />
                    );
                })}
            </div>

            {/* UPCOMING APPOINTMENTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-5 shadow rounded-xl">
                    <div className="flex justify-between gap-3">
                        <h1 className="font-semibold text-sm">Upcoming Appointments</h1>
                        <Link href="/dashboard/provider/professional/bookings" className="text-xs">View All</Link>
                    </div>
                    
                    <div>
                        
                        {data?.upcoming_bookings?.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-semibold text-slate-600 pt-3 pb-1">
                                    <div>Patient Name</div>
                                    <div>Service</div>
                                    <div>Date</div>
                                    <div>Status</div>
                                </div>

                                <div>
                                    {data?.upcoming_bookings?.map((booking: any) => (
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-slate-500 space-y-3" key={booking.id}>
                                            <div>{booking.user}</div>
                                            <div className="text-xs line-clamp-1">{booking.service}</div>
                                            <div className="text-xs">{booking.appointment_date} {booking.appointment_time}</div>
                                            <div className={cn("text-xs capitalize", booking.status === "pending" && "text-secondary")}>{booking.status}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <DashboardEmptyStats 
                                icon={CalendarCheck2Icon} 
                                title="No upcoming appointments yet."
                                subtitle="Make yourself available so patients can start booking you."
                            />
                        )}
                    </div>
                </div>
                <div className="bg-white p-5 shadow rounded-xl">
                    <div className="flex justify-between gap-3">
                        <h1 className="font-semibold text-sm">Profile Overview</h1>
                        <p className={cn("text-xs text-slate-500 font-semibold")}>
                            {data?.profile?.completion === 100 ? (
                                <span className="text-green-600">Completed  {data?.profile?.completion}%</span>
                            ) : (
                                <span className={cn("text-secondary")}>Completion  {data?.profile?.completion}%</span>
                            )}
                           
                        </p>
                    </div>
                    <div className="flex flex-col space-y-1 text-sm">
                        <div className="flex space-x-2 pt-3 items-center">
                            <h4 className="font-semibold">Name</h4>
                            <p className="text-slate-500">{data?.profile?.name ?? "Enter your name"}</p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <h4 className="font-semibold">Profession</h4>
                            <p className="text-slate-500">{data?.profile?.profession ?? "Enter your profession"}</p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <h4 className="font-semibold">Fees</h4>
                            <p className="text-slate-500">{parseFloat(data?.profile?.consultation_fee).toLocaleString() ?? "Enter your consultation fee"}</p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <h4 className="font-semibold">Location</h4>
                            <p className="text-slate-500">{data?.profile?.location_name ?? "Enter your location"}</p>
                        </div>
                    </div>
                </div>
            </div>

            
            {/* REVIEWS + AVAILABILITY + SUBSCRIPTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-5 shadow rounded-xl">
                    <div className="flex justify-between gap-3">
                        <h1 className="font-semibold text-sm">Recent Reviews</h1>
                        <Link href="/dashboard/provider/professional/reviews" className="text-xs">View All</Link>
                    </div>

                    <div>
                        {data?.recent_reviews?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <StarIcon className="w-6 h-6 text-gray-300 mb-2" />
                                <p className="text-sm font-medium">No reviews yet</p>
                                <p className="text-xs text-gray-500">
                                    Your reviews will appear here after you complete appointments.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p></p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="bg-white p-5 shadow rounded-xl">
                        <h1 className="font-semibold text-sm pb-2">Today's Availability</h1>

                        {data?.availability?.day_of_week ? (
                            <div className="bg-green-50 p-3 rounded-xl text-sm">
                                <div className="flex space-x-2 items-center">
                                    <div className="font-semibold">
                                        {CONSTANTS.weekDays.find((day) => Number(day.id) === Number(data?.availability?.day_of_week))?.name}:
                                    </div>
                                    <div className="">
                                        {data?.availability?.message}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-red-100 p-3 rounded-xl text-sm">
                                <Link href="/dashboard/provider/professional/operating-hours">
                                    <DashboardEmptyStats
                                        icon={Clock4Icon}
                                        title="Working hours not set"
                                        subtitle={data?.availability?.message}
                                    />
                                </Link>
                            </div>
                        )}
                        
                    </div>

                    <div className="bg-white p-5 shadow rounded-xl">
                        <h1 className="font-semibold text-sm">Subscription</h1>
                        <div className="bg-primary text-white p-6 rounded-xl space-y-6">

                            <div className="flex md:flex-row flex-col justify-between items-center gap-3">
                                <div className="flex gap-2 items-center">
                                    <CrownIcon size={35} />
                                    <div>
                                        <h1 className="font-bold">{data?.subscription?.plan}</h1>
                                        <p className="text-sm"><strong>Since</strong> {new Date(data?.subscription?.start_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "2-digit" })}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className={cn("px-4 py-1 rounded-2xl text-sm capitalize", data?.subscription?.is_active ? "bg-green-600" : "bg-red-500", )}>
                                        {data?.subscription?.status}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-5">
                                <div>
                                    <p className="">Next Billing Date</p>
                                    <h1 className="font-semibold">{new Date(data?.subscription?.end_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "2-digit" })}</h1>
                                </div>
                                
                            </div>


                            <div>
                                <Link href="">
                                    <CustomButton
                                        label="Manage Subscription"
                                        btnType="button"
                                        variant="white"
                                        className="text-primary"
                                    />
                                </Link>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProfessionalPageClient
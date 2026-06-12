"use client";

import React from 'react'
import { Calendar1Icon, CalendarCheck2Icon, CrownIcon, EyeIcon, MessageCircleMore, StarIcon } from 'lucide-react';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import StatisticsCardComponent from '../../_components/statistics-card-component';
import DashboardEmptyStats from '@/app/dashboard/_components/dashboard-empty-stats';
import { Separator } from '@/components/ui/separator';
import CustomButton from '@/components/ui/custom-button';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import BookingsByServiceChart from './_components/bookings-service-pie';


interface HospitalDashboardClientProps {
    data: any;
}

const HospitalDashboardClient = ({ data }: HospitalDashboardClientProps) => {
    const { data:session } = useSession();
    const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);

    const chartConfig = {
        bookings: {
            label: "bookings",
            color: "var(--chart-1)",
        },
        
    }

    const statsCards = [
        {
            id: 1,
            title: "Total Bookings",
            stats:data?.stats?.total_bookings ?? 0,
            metrics: "",
            icon: Calendar1Icon,
            iconbg: "bg-blue-100"
        },
        {
            id: 2,
            title: "Patients Served",
            stats: data?.stats?.patients_served ?? 0,
            metrics: "",
            icon: MessageCircleMore,
            iconbg: "bg-orange-100"
        },
        {
            id: 3,
            title: "Profile Views",
            stats: "1245",
            metrics: "",
            icon: EyeIcon,
            iconbg: "bg-purple-100"
        },
        {
            id: 4,
            title: "Average Rating",
            stats: data?.stats?.avg_rating ?? 0,
            metrics: "",
            icon: StarIcon,
            iconbg: "bg-yellow-50"
        }
    ]

    return (
        <div className="space-y-5 pb-16">

            <div>
                <h1 className="font-semibold text-sm pb-2 pt-2">Hello {session?.user?.name}!</h1>
                <p className="text-sm text-slate-600">Here's how <span className="font-bold">{activeWorkspace?.name}</span> is performing on Afyhub.</p>
            </div>
           
            
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {statsCards.map((stat, index) => {
                    
                    return (
                        <StatisticsCardComponent key={index} stat={stat} />
                    );
                })}
            </div>


            {/* BOOKINGS TREND GRAPH + BOOKINGS BY SERVICES + SUBSCRIPTION  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-4 flex flex-col rounded-lg shadow">
                    <div className="flex md:flex-row justify-between items-center flex-col gap-3">
                        <h1 className="text-sm font-semibold">Bookings Trend</h1>

                        <Link href="" className="text-xs">
                            View All
                        </Link>
                    </div>

                    <div className="w-full pt-5">
                        <ChartContainer config={chartConfig}>
                            <LineChart data={data?.bookings_trend}>
                                <CartesianGrid vertical={false} />

                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    angle={-30}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis domain={[0, "auto"]} allowDecimals={false} width={30} />
                                <ChartTooltip />

                                <Line
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="var(--chart-1)"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ChartContainer>
                    </div>

                </div>
                <div className="bg-white p-4 flex flex-col rounded-lg shadow">
                    <div className="flex md:flex-row justify-between items-center flex-col gap-3">
                        <h1 className="text-sm font-semibold">Bookings by Services</h1>

                        <Link href="" className="text-xs">
                            View All
                        </Link>
                    </div>

                    <div>
                        <BookingsByServiceChart data={data?.bookings_by_service} />
                    </div>
                </div>
            </div>



            {/* RECENT BOOKINGS + TOP SERVICES + LATEST REVIEWS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-5 shadow rounded-xl">
                    <div className="flex justify-between gap-3">
                        <h1 className="font-semibold text-sm">Upcoming Appointments</h1>
                        <Link href="/dashboard/provider/hospital/bookings" className="text-xs">View All</Link>
                    </div>

                    <div className="w-full">
                        {data?.recent_bookings.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-semibold text-slate-600 pt-3 pb-1">
                                    <div>Patient Name</div>
                                    <div>Service</div>
                                    <div>Date</div>
                                    <div>Status</div>
                                </div>
                            
                                <div>
                                    {data.recent_bookings.map((booking: any) => (
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-500 space-y-3" key={booking.id}>
                                            <div>{booking.patient_name}</div>
                                            <div className="text-xs line-clamp-1">{booking.service}</div>
                                            <div className="text-xs">{booking.date} {booking.time}</div>
                                            <div className="text-xs">{booking.status}</div>
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
                        <h1 className="font-semibold text-sm">Top Services</h1>
                        <Link href="/dashboard/provider/hospital/services" className="text-xs">View All</Link>
                    </div>

                    <div>
                        {data?.top_services?.length > 0 ? (
                            <div>
                                <div className="flex justify-between items-center text-sm pt-3 pb-2 text-slate-700">
                                    <div>Service</div>
                                    <div>Bookings</div>
                                </div>
                                {data.top_services.map((service: any) => (
                                    <div className="flex justify-between items-center text-slate-500 text-sm space-y-2" key={service.id}>
                                        <div>{service.title}</div>
                                        <div>{service.bookings}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <DashboardEmptyStats
                                icon={CalendarCheck2Icon}
                                title="No services yet."
                                subtitle="Add services that you offer for patients to start booking."
                            />
                        )}
                    </div>
                </div>
            </div>



            {/* Reviews and subscription */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div className="bg-white p-5 shadow rounded-xl md:col-span-8">
                    <div className="flex justify-between gap-3">
                        <h1 className="font-semibold text-sm">Latest Reviews</h1>
                        <Link href="/dashboard/provider/hospital/reviews" className="text-xs">View All</Link>
                    </div>

                    <div>
                        {data?.latest_reviews?.length > 0 ? (
                            <div>
                                <div className="flex justify-between items-center text-sm pt-3 text-slate-700">
                                    <div>Service</div>
                                    <div>Bookings</div>
                                </div>
                                {data.latest_reviews.map((review: any) => (
                                    <div className="flex justify-between items-center text-slate-500 text-sm space-y-2" key={review.id}>
                                        <div>{review.title}</div>
                                        <div>{review.bookings}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <DashboardEmptyStats
                                icon={StarIcon}
                                title="No reviews yet."
                                subtitle="Your reviews will appear here after you complete appointments."
                            />
                        )}
                    </div>
                </div>
                <div className="bg-white p-4 flex flex-col rounded-lg shadow md:col-span-4">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-sm font-semibold">Subscription</h1>

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
                                    <p className={cn("px-4 py-1 rounded-2xl text-sm capitalize", data?.subscription?.is_active ? "bg-green-600" : "bg-red-500",)}>
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
    )
}

export default HospitalDashboardClient
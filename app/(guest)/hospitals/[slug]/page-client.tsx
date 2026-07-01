"use client";

import React, { useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { Calendar1Icon, Clock3, MapPinIcon, PhoneCallIcon, ShieldCheck, Star, Stethoscope, Building2, Ambulance, ChevronRight, MessageCircleMoreIcon, ChevronUp, ChevronDown, MapPin, BriefcaseBusinessIcon } from "lucide-react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ProviderBranchDetailsModel } from "@/lib/models/provider-models";
import ProviderBanner from "./_components/provider-banner";
import CustomButton from "@/components/ui/custom-button";
import { Card, CardContent } from "@/components/ui/card";

import { CONSTANTS } from "@/lib/constants/constants";
import { formatWorkingTime, getDayName } from "@/lib/helpers/time-formatter";
import { ExpandableAbout } from "../../_components/expandable-about";
import { ExpandableServices } from "../../_components/expandable-services";
import ReviewModalForm from "@/components/modals/review-modal";
import { moveItem } from "framer-motion";
import Link from "next/link";
import PatientBookingForm from "../../_components/patient-booking-form";

interface HospitalDetailsPageProps {
    provider: ProviderBranchDetailsModel;
}

const HospitalDetailsPage = ({
    provider,
}: HospitalDetailsPageProps) => {

    const [showAllClinics, setShowAllClinics] = useState(false);

    return (
        <div className="bg-slate-50 min-h-screen pb-28 md:pb-0">

            {/* HERO SECTION */}
            <section className="relative">

                <div className="relative h-[340px] md:h-[500px] overflow-hidden rounded-b-[2rem]">
                    <ProviderBanner provider={provider} />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex items-end">
                        <div className="app-container w-full pb-8 md:pb-12">

                            <div className="max-w-4xl text-white">

                                {/* BADGES */}
                                <div className="flex flex-wrap gap-2 mb-4">

                                    {provider?.is_open ? (
                                        <span className="bg-green-500/20 border border-green-400/30 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium">
                                            Open Now
                                        </span>
                                    ) : (
                                        <span className="bg-red-500/20 border border-red-400/30 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium">
                                            Closed
                                        </span>
                                    )}


                                    {provider?.profile?.accepts_nhif && (
                                        <span className="bg-blue-500/20 border border-blue-400/30 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium">
                                            SHA Accredited
                                        </span>
                                    )}

                                    {provider?.profile?.has_emergency && (
                                        <span className="bg-red-500/20 border border-red-400/30 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium">
                                            24/7 Emergency
                                        </span>
                                    )}
                                </div>

                                {/* NAME */}
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                    {provider.name}
                                </h1>

                                {/* META */}
                                <div className="flex flex-wrap items-center gap-5 mt-5 text-sm md:text-base text-white/90">

                                    <div className="flex items-center gap-2">
                                        <MapPinIcon size={18} />
                                        <span>{provider?.location_name}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Building2 size={18} />
                                        <span>
                                            Est. {provider?.profile?.year_established}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-yellow-400">
                                        <Star
                                            size={18}
                                            fill="currentColor"
                                        />

                                        <span className="font-semibold">
                                            {provider?.rating > 0
                                                ? provider.rating
                                                : "No ratings"}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA BUTTONS */}
                                <div className="flex flex-wrap gap-3 mt-8 mb-16">
                                    
                                    <Link href="#booking">
                                        <CustomButton
                                            label="Book Appointment"
                                            btnType="button"
                                            variant="secondary"
                                            className="shadow-2xl"
                                            prefixIcon={{
                                                type: "lucide",
                                                icon: Calendar1Icon,
                                            }}
                                        />
                                    </Link>
                                    
                                    <a href={`tel:${provider?.phone}`}>
                                        <CustomButton
                                            label="Call Hospital"
                                            btnType="button"
                                            variant="outline"
                                            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black"
                                            prefixIcon={{
                                                type: "lucide",
                                                icon: PhoneCallIcon,
                                            }}
                                        />
                                    </a>
                                    
                                    <a
                                        href={`https://wa.me/${provider?.phone?.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <CustomButton
                                            label="WhatsApp"
                                            btnType="button"
                                            className="bg-green-600 hover:bg-green-700"
                                            prefixIcon={{
                                                type: "fa",
                                                icon: faWhatsapp,
                                            }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* QUICK STATS */}
            <section className="app-container -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <Card className="rounded-3xl border-0 shadow-xl">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                                    <Star
                                        className="text-yellow-500"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-2xl font-bold text-secondary">
                                        {provider?.rating || "N/A"}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Patient Rating
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-0 shadow-xl">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                                    <Ambulance
                                        className="text-red-500"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-secondary">
                                        {provider?.profile?.has_emergency
                                            ? "Available"
                                            : "Unavailable"}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Emergency Care
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-0 shadow-xl">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                                    <Stethoscope
                                        className="text-blue-500"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-2xl font-bold text-secondary">
                                        {provider?.services?.length}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Medical Services
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-0 shadow-xl">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                                    <ShieldCheck
                                        className="text-green-600"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-secondary">
                                        Verified
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Trusted Facility
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="app-container py-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* ABOUT */}
                        <Card className="rounded-3xl border-0 shadow-sm">
                            <CardContent className="p-6 md:p-8">

                                <h2 className="text-2xl font-bold text-secondary mb-5">
                                    About {provider.name}
                                </h2>

                                <ExpandableAbout
                                    html={provider?.provider?.description || ""}
                                />
                            </CardContent>
                        </Card>

                        {/* TRUST SECTION */}
                        {provider?.profile?.trust_reasons?.length > 0 && (
                            < Card className="rounded-3xl border-0 shadow-sm bg-blue-50">
                                <CardContent className="p-6 md:p-8">

                                    <h2 className="text-2xl font-bold text-secondary mb-6">
                                        Why Patients Trust Us
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {provider?.profile?.trust_reasons.map((item: string, index: any) => (
                                            <div className="flex items-center gap-3" key={index}>
                                                <ShieldCheck className="text-green-600" />
                                                <span>{item}</span>
                                            </div>
                                        ))}



                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        

                        {/* SERVICES */}
                        {provider?.services?.length > 0 && (
                            <Card className="rounded-3xl border-0 shadow-sm">
                                <CardContent className="p-6 md:p-8">

                                    <h2 className="text-2xl font-bold text-secondary mb-5">
                                        Medical Services
                                    </h2>

                                    <ExpandableServices services={provider.services} />
                                </CardContent>
                            </Card>
                        )}
                        

                        {/* CLINICS */}
                        {provider?.clinics?.length > 0 && (
                                <div>

                                    <h2 className="text-2xl font-bold text-secondary mb-5">
                                        Available Clinics
                                    </h2>

                                    <div className="space-y-5">

                                        {provider?.clinics.slice(0, showAllClinics ? provider.clinics.length : 2).map((session) => (
                                            <Card
                                                key={session.id}
                                                className="
                                                    rounded-3xl
                                                    overflow-hidden
                                                    border-0
                                                    shadow-sm
                                                    hover:shadow-2xl
                                                    transition-all
                                                    duration-300
                                                    hover:-translate-y-1
                                                    py-0
                                                "
                                            >
                                                <CardContent className="p-0">

                                                    <div className="grid grid-cols-1 md:grid-cols-4">

                                                        {/* IMAGE */}
                                                        <div className="relative h-64 md:h-full">

                                                            <Image
                                                                src={session.banner}
                                                                alt={session.title}
                                                                fill
                                                                unoptimized
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                        {/* CONTENT */}
                                                        <div className="md:col-span-3 p-6">

                                                            <div className="flex flex-col md:flex-row md:justify-between gap-5">

                                                                <div className="flex-1">

                                                                    <h3 className="text-xl font-bold text-secondary">
                                                                        {session.title}
                                                                    </h3>

                                                                    {/* DAYS */}
                                                                    <div className="flex flex-wrap gap-2 mt-4">

                                                                        {session.days_of_week.map(
                                                                            (dayId: number) => {
                                                                                const dayName =
                                                                                    CONSTANTS.weekDays.find(
                                                                                        (day) =>
                                                                                            Number(day.id) ===
                                                                                            Number(dayId)
                                                                                    )?.name;

                                                                                return (
                                                                                    <span
                                                                                        key={dayId}
                                                                                        className="
                                                                                            bg-blue-50
                                                                                            text-blue-700
                                                                                            px-3
                                                                                            py-1.5
                                                                                            rounded-full
                                                                                            text-xs
                                                                                            font-medium
                                                                                        "
                                                                                    >
                                                                                        {dayName}
                                                                                    </span>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>

                                                                    {/* INFO */}
                                                                    <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-600">

                                                                        <div className="flex items-center gap-2">
                                                                            <Clock3 size={16} />
                                                                            <span>
                                                                                {formatWorkingTime(
                                                                                    session.start_time
                                                                                )}{" "}
                                                                                -{" "}
                                                                                {formatWorkingTime(
                                                                                    session.end_time
                                                                                )}
                                                                            </span>
                                                                        </div>

                                                                        {session.specialists.length > 0 && (
                                                                            <div className="flex items-center gap-2">
                                                                                <Stethoscope size={16} />
                                                                                <span>
                                                                                    {
                                                                                        session.specialists
                                                                                            .length
                                                                                    }{" "}
                                                                                    Specialists
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* PRICE */}
                                                                <div className="md:text-right">

                                                                    <p className="text-sm text-gray-500">
                                                                        Consultation Fee
                                                                    </p>

                                                                    <h4 className="text-2xl font-bold text-red-600 mt-1">
                                                                        KES{" "}
                                                                        {parseInt(
                                                                            session.consultation_fee
                                                                        ).toLocaleString()}
                                                                    </h4>
                                                                </div>
                                                            </div>

                                                            {/* CTA */}
                                                            <div className="mt-6">

                                                                <CustomButton
                                                                    label="Book Clinic"
                                                                    btnType="button"
                                                                    variant="secondary"
                                                                    suffixIcon={{
                                                                        type: "lucide",
                                                                        icon: ChevronRight,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                    {provider?.clinics?.length > 2 && (
                                        <div className="flex justify-center mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setShowAllClinics(!showAllClinics)}
                                                className="
                                                flex items-center gap-2
                                                text-secondary
                                                font-semibold
                                                hover:text-secondary/80
                                                transition-all
                                                justify-center
                                            "
                                            >
                                                {showAllClinics ? "See Less" : "See More Clinics"}

                                                {showAllClinics ? (
                                                    <ChevronUp size={18} />
                                                ) : (
                                                    <ChevronDown size={18} />
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                        )}

                         {/* TESTIMONIALS */}
                        <Card className="rounded-3xl border-0 shadow-sm">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex md:justify-between gap-3">
                                    <h2 className="md:text-xl font-bold text-secondary mb-6">
                                        Patient Testimonials
                                    </h2>

                                    <div>
                                        <ReviewModalForm providerId={provider.id} providerType="hospital" />
                                    </div>
                                </div>

                                {provider?.reviews?.length > 0  ? (
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                                        {provider?.reviews?.map((item) => (
                                            <div
                                                key={item}
                                                className="bg-slate-50 rounded-3xl p-5"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-blue-100" />

                                                    <div>
                                                        <h4 className="font-semibold text-secondary">
                                                            Anonymous Patient
                                                        </h4>

                                                        <div className="flex gap-1 mt-1 text-yellow-500">
                                                            <Star
                                                                size={14}
                                                                fill="currentColor"
                                                            />
                                                            <Star
                                                                size={14}
                                                                fill="currentColor"
                                                            />
                                                            <Star
                                                                size={14}
                                                                fill="currentColor"
                                                            />
                                                            <Star
                                                                size={14}
                                                                fill="currentColor"
                                                            />
                                                            <Star
                                                                size={14}
                                                                fill="currentColor"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                                                    {item?.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1 items-center">
                                        <MessageCircleMoreIcon size={40} />
                                        <h1 className="text-sm font-semibold">No reviews yet</h1>
                                        <p className="text-sm text-slate-500">You can leave a review here.</p>
                                    </div>
                                )}
                                
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="lg:col-span-4">

                        {/* QUICK INFO */}
                        <div className="mb-5">
                            <Card className="rounded-3xl border-0 shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="md:text-xl font-bold text-secondary mb-5">
                                        Quick Information
                                    </h2>

                                    <div className="space-y-4">

                                        {provider?.profile?.ownership_type && (
                                            <div className="flex items-start gap-3">
                                                <BriefcaseBusinessIcon
                                                    className="text-primary mt-1"
                                                    size={18}
                                                />

                                                <div>
                                                    <p className="text-sm font-medium text-secondary">
                                                        Type
                                                    </p>

                                                    <p className="text-sm text-slate-500 capitalize">
                                                        {provider?.profile?.ownership_type}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        

                                        {provider?.profile?.level_display && (
                                            <div className="flex items-start gap-3">
                                                <ShieldCheck
                                                    className="text-primary mt-1"
                                                    size={18}
                                                />

                                                <div>
                                                    <p className="text-sm font-medium text-secondary">
                                                        Level
                                                    </p>

                                                    <p className="text-sm text-slate-500 capitalize">
                                                        {provider?.profile?.level_display}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    

                                        {provider?.location_name && (
                                            <div className="flex items-start gap-3">
                                                <MapPin
                                                    className="text-primary mt-1"
                                                    size={18}
                                                />

                                                <div>
                                                    <p className="text-sm font-medium text-secondary">
                                                        Physical Location
                                                    </p>

                                                    <p className="text-sm text-slate-500 capitalize">
                                                        {provider?.location_name}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        

                                        {provider?.profile?.year_established && (
                                            <div className="flex items-start gap-3">
                                                <Calendar1Icon
                                                    className="text-primary mt-1"
                                                    size={18}
                                                />

                                                <div>
                                                    <p className="text-sm font-medium text-secondary">
                                                        Year Established
                                                    </p>

                                                    <p className="text-sm text-slate-500">
                                                        {provider?.profile?.year_established}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        

                                        
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {provider.operating_hours.length > 0 && (
                            <div>
                                {/* OPERATING HOURS */}
                                <Card className="rounded-3xl border-0 shadow-sm mb-8">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="md:text-xl font-bold text-secondary">
                                                Operating Hours
                                            </h2>

                                            <Clock3
                                                className="text-primary"
                                                size={18}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            {provider?.operating_hours?.map((item) => {
                                                const currentDay =
                                                    new Date().getDay();

                                                const isToday =
                                                    currentDay === item.day_of_week;

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isToday
                                                            ? "bg-blue-50 border border-blue-100"
                                                            : "bg-slate-50"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-sm text-secondary">
                                                                {getDayName(
                                                                    item.day_of_week
                                                                )}
                                                            </span>

                                                            {isToday && (
                                                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                                                    Today
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div>
                                                            {item.is_closed ? (
                                                                <span className="text-red-500 text-sm font-medium">
                                                                    Closed
                                                                </span>
                                                            ) : item.is_24 ? (
                                                                <span className="text-green-600 text-sm font-medium">
                                                                    Open 24 Hours
                                                                </span>
                                                            ) : (
                                                                <span className="text-sm text-slate-500">
                                                                    {formatWorkingTime(
                                                                        item.open_time
                                                                    )}{" "}
                                                                    -{" "}
                                                                    {formatWorkingTime(
                                                                        item.close_time
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        

                        <div className="sticky top-24 space-y-6">

                            {/* BOOKING */}
                            {provider?.services?.length > 0 && (
                                <Card className="rounded-3xl pt-0 border-0 shadow-xl overflow-hidden">

                                    <div className="bg-primary p-6 text-white">
                                        <h2 className="text-2xl font-bold">
                                            Book Appointment
                                        </h2>

                                        <p className="text-white/80 mt-2 text-sm">
                                            Schedule your visit quickly and easily.
                                        </p>
                                    </div>

                                    <CardContent className="p-6 bg-white" id="booking">

                                        <PatientBookingForm
                                            services={provider.services}
                                        />
                                    </CardContent>
                                </Card>
                            )}
                            

                            {/* LOCATION */}
                            {provider?.latitude && (
                                <Card className="rounded-3xl border-0 shadow-sm">
                                    <CardContent className="p-6">

                                        <h2 className="text-xl font-bold text-secondary mb-4">
                                            Location
                                        </h2>

                                        <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">

                                            {/* REPLACE WITH REAL MAP */}
                                            <div className="mt-6 overflow-hidden rounded-3xl border">
                                                <iframe
                                                    src={`https://www.google.com/maps?q=${provider?.latitude},${provider?.longitude}&z=15&output=embed`}
                                                    width="100%"
                                                    height="350"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-start gap-3">

                                            <MapPinIcon
                                                className="text-primary mt-1"
                                                size={18}
                                            />

                                            <p className="text-sm text-gray-600">
                                                {provider?.location_name}
                                            </p>
                                        </div>

                                        <div className="mt-5">
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${provider?.latitude},${provider?.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-secondary text-white px-5 py-3 w-full rounded-2xl text-sm font-medium hover:opacity-90 transition"
                                            >
                                                Get Directions
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                            
                        </div>
                    </div>
                </div>
            </section>

            {/* MOBILE STICKY ACTIONS */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl md:hidden">

                <div className="grid grid-cols-3 gap-3 p-3">

                    <CustomButton
                        label="Book"
                        btnType="button"
                        variant="secondary"
                        className="w-full"
                    />

                    <CustomButton
                        label="Call"
                        btnType="button"
                        variant="outline"
                        className="w-full"
                    />

                    <CustomButton
                        label="WhatsApp"
                        btnType="button"
                        className="w-full bg-green-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default HospitalDetailsPage;







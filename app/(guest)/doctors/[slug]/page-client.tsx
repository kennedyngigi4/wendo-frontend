"use client";

import React from "react";
import Image from "next/image";
import {
    GraduationCap,
    MapPin,
    Star,
    VerifiedIcon,
    Phone,
    CalendarDays,
    Clock3,
    MessageCircleMoreIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import PatientBookingForm from "../../hospitals/_components/patient-booking-form";

import {
    EducationModel,
    ProfessionalDetailsModel,
} from "@/lib/models/profession-models";

import {
    formatWorkingTime,
    getDayName,
} from "@/lib/helpers/time-formatter";

import DOMPurify from "dompurify";
import ReviewModalForm from "@/components/modals/review-modal";

interface DoctorClientDetailsProps {
    data: ProfessionalDetailsModel;
}

const DoctorClientDetails = ({
    data,
}: DoctorClientDetailsProps) => {
    const specialties = data.specialties || [];
    const visibleSpecialties = specialties.slice(0, 4);
    const remainingCount =
        specialties.length - visibleSpecialties.length;

    const cleanBio = DOMPurify.sanitize(data.bio || "");


    console.log(data)

    return (
        <div className="bg-slate-50 pb-20">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 border-b">
                <div className="app-container py-6 md:py-10">
                    <div className="bg-white/80 backdrop-blur border border-white shadow-sm rounded-3xl p-5 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                            {/* IMAGE */}
                            <div className="lg:col-span-4">
                                <div className="relative overflow-hidden rounded-3xl">
                                    <Image
                                        src={data.profile_photo}
                                        alt={`${data.title} ${data.name}`}
                                        width={500}
                                        height={500}
                                        priority
                                        unoptimized
                                        className="w-full h-[320px] md:h-[420px] object-cover"
                                    />
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="lg:col-span-8">
                                {/* NAME */}
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-xl md:text-2xl capitalize font-bold tracking-tight text-secondary">
                                            {data.title}. {data.name}
                                        </h1>

                                        {data.is_verified && (
                                            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                                                <VerifiedIcon size={15} />
                                                <span>Verified</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-slate-500 mt-2 text-base">
                                        {data.professional_type}
                                    </p>
                                </div>

                                {/* SPECIALTIES */}
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {visibleSpecialties.map(
                                        (spec: string, index: number) => (
                                            <span
                                                key={index}
                                                className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium"
                                            >
                                                {spec}
                                            </span>
                                        )
                                    )}

                                    {remainingCount > 0 && (
                                        <span className="text-sm text-slate-500 px-2 py-1">
                                            +{remainingCount} more
                                        </span>
                                    )}
                                </div>

                                {/* STATS */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <h3 className="text-xl font-bold text-secondary">
                                            {data.years_of_experience}+
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Years Experience
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <h3 className="text-xl font-bold text-secondary">
                                            KES{" "}
                                            {parseInt(
                                                data.consultation_fee
                                            ).toLocaleString()}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Consultation Fee
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <h3 className="text-xl font-bold text-secondary">
                                            {parseFloat(data.rating) === 0
                                                ? "New"
                                                : data.rating}
                                        </h3>

                                        <p className="text-xs text-slate-500 mt-1">
                                            Patient Rating
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <h3 className="text-md font-bold text-secondary">
                                            {data.accepts_nhif
                                                ? "SHA Accepted"
                                                : "Private"}
                                        </h3>

                                        <p className="text-xs text-slate-500 mt-1">
                                            Insurance
                                        </p>
                                    </div>
                                </div>

                                {/* RATING */}
                                <div className="flex items-center gap-2 mt-6">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star
                                            size={16}
                                            fill="currentColor"
                                        />
                                        <span className="text-sm font-medium">
                                            {parseFloat(data.rating) === 0
                                                ? "No ratings yet"
                                                : data.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* LOCATION */}
                                <div className="mt-4 flex items-center gap-2 text-slate-500">
                                    <MapPin size={16} />
                                    <span className="text-sm capitalize">
                                        {data.location_name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="app-container py-8">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* LEFT CONTENT */}
                    <div className="xl:col-span-8 space-y-8">

                        {/* ABOUT */}
                        <Card className="rounded-3xl border-0 shadow-sm">
                            <CardContent className="p-6 md:p-8">
                                <h2 className="text-md md:text-xl capitalize font-bold text-secondary mb-5">
                                    About {data.title}. {data.name}
                                </h2>

                                <div
                                    className="prose prose-sm max-w-none text-slate-600"
                                    dangerouslySetInnerHTML={{
                                        __html: cleanBio,
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* SERVICES */}
                        {data.services.length > 0 && (
                            <Card className="rounded-3xl border-0 shadow-sm">
                                <CardContent className="p-6 md:p-8">
                                    <h2 className="text-md md:text-xl font-bold text-secondary mb-6">
                                        Services Offered
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {data.services.map((service) => (
                                            <div
                                                key={service.id}
                                                className="group bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <div className="bg-gradient-to-br from-blue-50 to-red-50 p-4 rounded-2xl w-fit">
                                                    <Image
                                                        src={service.service.icon}
                                                        alt={service.service_name}
                                                        width={55}
                                                        height={55}
                                                        unoptimized
                                                    />
                                                </div>

                                                <div className="mt-4">
                                                    <h3 className="font-semibold text-secondary text-lg">
                                                        {service.service_name}
                                                    </h3>

                                                    <div
                                                        className="text-sm text-slate-600 mt-2 line-clamp-4"
                                                        dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(
                                                                service.description || ""
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* EDUCATION */}
                        {data.education.length > 0 && (
                            <Card className="rounded-3xl border-0 shadow-sm">
                                <CardContent className="p-6 md:p-8">
                                    <h2 className="md:text-xl font-bold text-secondary mb-6">
                                        Education & Training
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {data.education.map(
                                            (ed: EducationModel) => (
                                                <div
                                                    key={ed.id}
                                                    className="border border-slate-100 rounded-3xl p-5 bg-white hover:shadow-md transition-all"
                                                >
                                                    <div className="bg-blue-50 p-3 rounded-2xl w-fit">
                                                        <GraduationCap
                                                            size={32}
                                                            className="text-primary"
                                                        />
                                                    </div>

                                                    <div className="mt-4">
                                                        <p className="text-sm text-slate-500 mt-1">
                                                            {ed.institution}
                                                        </p>
                                                        <h3 className="font-bold text-secondary mt-1">
                                                            {ed.degree}
                                                        </h3>
                                                        <p className="text-sm text-slate-500">
                                                            {ed.year_completed}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* LOCATION */}
                        {data.location_name && (
                            <Card className="rounded-3xl border-0 shadow-sm overflow-hidden">
                                <CardContent className="p-4 md:p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h2 className="md:text-xl font-bold text-secondary">
                                                Location
                                            </h2>

                                            <p className="text-slate-500 mt-2">
                                                {data.location_name}
                                            </p>
                                        </div>

                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-secondary text-white px-5 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition"
                                        >
                                            Get Directions
                                        </a>
                                    </div>

                                    <div className="mt-6 overflow-hidden rounded-3xl border">
                                        <iframe
                                            src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`}
                                            width="100%"
                                            height="350"
                                            loading="lazy"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* TESTIMONIALS */}
                        <Card className="rounded-3xl border-0 shadow-sm">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex md:justify-between gap-3">
                                    <h2 className="md:text-xl font-bold text-secondary mb-6">
                                        Patient Testimonials
                                    </h2>

                                    <div>
                                        <ReviewModalForm />
                                    </div>
                                </div>

                                {data?.reviews.length > 0  ? (
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                                        {data?.reviews?.map((item) => (
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

                    {/* SIDEBAR */}
                    <div className="xl:col-span-4">
                        <div className="space-y-6 xl:sticky xl:top-24">

                            {/* QUICK INFO */}
                            <Card className="rounded-3xl border-0 shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="md:text-xl font-bold text-secondary mb-5">
                                        Quick Information
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin
                                                className="text-primary mt-1"
                                                size={18}
                                            />

                                            <div>
                                                <p className="text-sm font-medium text-secondary">
                                                    Practice Location
                                                </p>

                                                <p className="text-sm text-slate-500 capitalize">
                                                    {data.location_name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Phone
                                                className="text-primary mt-1"
                                                size={18}
                                            />

                                            <div>
                                                <p className="text-sm font-medium text-secondary">
                                                    Consultation
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    KES{" "}
                                                    {parseInt(
                                                        data.consultation_fee
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* OPERATING HOURS */}
                            {data.operating_hours.length > 0 && (
                                <Card className="rounded-3xl border-0 shadow-sm">
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
                                            {data.operating_hours.map((item) => {
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
                            )}

                            {/* BOOKING */}
                            <Card className="rounded-3xl border-0 shadow-sm overflow-hidden py-0">
                                <div className="bg-primary p-6 text-white">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={20} />
                                        <h2 className="md:text-xl font-bold">
                                            Book Appointment
                                        </h2>
                                    </div>

                                    <p className="text-sm text-white/80 mt-2">
                                        Schedule your consultation quickly
                                        and securely.
                                    </p>
                                </div>

                                <CardContent className="p-6">
                                    <PatientBookingForm
                                        services={data.services}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* MOBILE CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 md:hidden z-50">
                <button className="flex-1 bg-white border border-slate-200 rounded-2xl py-3 text-sm font-medium">
                    Call Now
                </button>

                <button className="flex-1 bg-secondary text-white rounded-2xl py-3 text-sm font-medium">
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default DoctorClientDetails;







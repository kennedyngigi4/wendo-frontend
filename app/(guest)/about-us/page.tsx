"use client";

import React from "react";
import BreadcrumbsPage from "@/app/_components/breadcrumbs";
import { motion } from "framer-motion";
import { CONSTANTS } from "@/lib/constants/constants";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    Heart,
    ShieldCheck,
    Laptop,
    Target,
    Eye,
    ArrowRight,
} from "lucide-react";

const Page = () => {
    return (
        <section>
            <BreadcrumbsPage title="About Us" />

            {/* HERO SECTION */}
            <section className="py-16">
                <div className="app-container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* LEFT */}
                        <div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="uppercase font-semibold tracking-wide text-primary"
                            >
                                About Wendo Health
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-bold text-secondary mt-3 leading-tight"
                            >
                                Connecting You to Trusted Healthcare.
                            </motion.h1>

                            <p className="mt-6 text-slate-600 leading-8">
                                Wendo Health is a digital healthcare platform helping
                                individuals and families discover verified healthcare providers,
                                clinics, hospitals, pharmacies, laboratories, and wellness
                                services across Kenya and beyond.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
                                    Find Healthcare Services
                                </button>

                                <button className="border border-secondary text-secondary px-6 py-3 rounded-xl font-medium hover:bg-secondary hover:text-white transition">
                                    Partner With Us
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-5 mt-10">
                                <div>
                                    <h3 className="text-3xl font-bold text-secondary">500+</h3>
                                    <p className="text-sm text-slate-500">Providers</p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-secondary">20K+</h3>
                                    <p className="text-sm text-slate-500">Patients Reached</p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-secondary">47</h3>
                                    <p className="text-sm text-slate-500">Counties</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="relative flex justify-center">
                            <div className="relative">
                                <Image
                                    src="/assets/images/others/about_2.jpg"
                                    alt="Healthcare"
                                    width={520}
                                    height={600}
                                    className="rounded-3xl border-4 border-blue-100"
                                />

                                <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-5">
                                    <h4 className="font-bold text-secondary text-xl">500+</h4>
                                    <p className="text-sm text-slate-500">
                                        Verified Healthcare Providers
                                    </p>
                                </div>

                                <Image
                                    src="/assets/images/others/about_2_1.jpg"
                                    alt="Healthcare"
                                    width={170}
                                    height={170}
                                    className="hidden md:block absolute -top-5 -right-5 rounded-2xl shadow-xl border-4 border-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="py-16 bg-slate-50">
                <div className="app-container max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-secondary">
                            Who We Are
                        </h2>

                        <p className="mt-6 text-slate-600 leading-8">
                            Wendo Health is a digital healthcare platform built to connect
                            patients with trusted healthcare providers across Kenya and
                            beyond. We make it easier for individuals and families to
                            discover verified doctors, clinics, hospitals, pharmacies,
                            laboratories, and other healthcare services quickly, safely,
                            and conveniently.
                        </p>

                        <p className="mt-4 text-slate-600 leading-8">
                            Beyond listings, Wendo Health supports healthcare providers
                            with digital solutions that improve visibility, strengthen
                            patient engagement, and enhance healthcare accessibility.
                        </p>
                    </div>
                </div>
            </section>

            {/* MISSION VISION */}
            <section className="py-20">
                <div className="app-container">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
                            <Target className="w-10 h-10 text-primary mb-4" />

                            <h3 className="text-2xl font-bold text-secondary mb-4">
                                Our Mission
                            </h3>

                            <p className="text-slate-600 leading-8">
                                To connect patients with trusted healthcare providers while
                                empowering healthcare organizations with digital solutions
                                that improve access, visibility, and quality healthcare
                                delivery.
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
                            <Eye className="w-10 h-10 text-primary mb-4" />

                            <h3 className="text-2xl font-bold text-secondary mb-4">
                                Our Vision
                            </h3>

                            <p className="text-slate-600 leading-8">
                                To become Africa’s leading healthcare discovery and
                                engagement platform, transforming how people access
                                healthcare services through innovation, trust, and
                                community impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-20 bg-slate-50">
                <div className="app-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">
                            Why Choose Wendo Health?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition">
                            <Heart className="w-10 h-10 text-primary mb-4" />

                            <h3 className="font-semibold text-xl text-secondary mb-3">
                                Patient-Centered Care
                            </h3>

                            <p className="text-slate-600">
                                Everything we build is focused on improving patient
                                experience, access, and healthcare outcomes.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition">
                            <ShieldCheck className="w-10 h-10 text-primary mb-4" />

                            <h3 className="font-semibold text-xl text-secondary mb-3">
                                Trust & Integrity
                            </h3>

                            <p className="text-slate-600">
                                Verified healthcare partnerships ensure users access
                                reliable and trustworthy healthcare services.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition">
                            <Laptop className="w-10 h-10 text-primary mb-4" />

                            <h3 className="font-semibold text-xl text-secondary mb-3">
                                Technology Driven
                            </h3>

                            <p className="text-slate-600">
                                We leverage technology to solve healthcare challenges and
                                improve service delivery across communities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <div
                id="services"
                className="py-16 bg-gradient-to-b from-blue-50 to-blue-50"
            >
                <div className="app-container">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-4xl font-bold text-secondary">
                            Our Services
                        </h2>

                        <p className="mt-4 text-slate-600 text-lg">
                            Wendo connects patients with quality healthcare services while
                            helping healthcare providers grow their digital presence and
                            reach more people.
                        </p>
                    </div>

                    <Tabs defaultValue="patients" className="w-full">
                        {/* Tabs */}
                        <div className="flex justify-center mb-10">
                            <TabsList className="grid w-full max-w-md grid-cols-2 rounded-full p-1 bg-white shadow-md border">
                                <TabsTrigger value="patients" className="rounded-full font-medium data-[state=active]:bg-secondary  data-[state=active]:text-white">
                                    Patients
                                </TabsTrigger>

                                <TabsTrigger value="providers" className="rounded-full font-medium data-[state=active]:bg-secondary data-[state=active]:text-white">
                                    Providers
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Patients */}
                        <TabsContent value="patients">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {CONSTANTS.patientServices.map((service) => (
                                    <div key={service.id}
                                        className="group bg-white   rounded-2xl  p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                                    >
                                        <h3 className="text-lg font-semibold text-secondary mb-3">
                                            {service.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {service.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Providers */}
                        <TabsContent value="providers">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {CONSTANTS.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="
                group
                bg-white
                rounded-2xl
                p-6
                border border-slate-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                text-center
              "
                                    >
                                        <h3 className="text-lg font-semibold text-secondary mb-3">
                                            {service.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {service.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* IMPACT */}
            <div id="impact" className="py-16">
                <div className="app-container flex flex-col space-y-5 pb-20">
                    <div className="pb-5">
                        <h1 className="text-4xl font-bold text-secondary text-center">
                            Our Impact
                        </h1>
                        <p className=" text-slate-500 text-center">Aligned with the United Nations Sustainable Development Goals (SDGs)</p>
                    </div>


                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-4 max-md:gap-5">
                            {CONSTANTS.impacts.map((goal, index) => (
                                <div
                                    key={goal.id}
                                    className={`flex flex-col h-full ${index % 2 === 0 ? "md:flex-col" : "md:flex-col-reverse"
                                        } rounded-xl overflow-hidden shadow-sm`}
                                >
                                    {/* Image */}
                                    <div className="relative w-full h-[220px] bg-blue-50 flex items-center justify-center">
                                        <Image
                                            src={goal.image}
                                            alt={goal.title}
                                            fill
                                            className="object-contain p-4"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="h-[220px] p-4 bg-white flex flex-col justify-center">
                                        <h1 className="text-secondary font-semibold mb-2">
                                            {goal.title}
                                        </h1>
                                        <p className="text-slate-600 text-sm">
                                            {goal.subtitle}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            
        </section>
    );
};

export default Page;
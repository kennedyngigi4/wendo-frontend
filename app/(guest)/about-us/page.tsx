"use client";

import React from 'react'
import BreadcrumbsPage from '@/app/_components/breadcrumbs';
import { motion } from 'framer-motion';
import { CONSTANTS } from '@/lib/constants/constants';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const page = () => {
  return (
    <section className="space-y-12">
        <BreadcrumbsPage title="About Us" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
                <div className="relative w-full flex justify-end">

                    {/* Main Image */}
                    <img
                        src="/assets/images/others/about_2.jpg"
                        className="w-[400px] md:w-[500px] rounded-4xl border-4 border-blue-200"
                    />

                    {/* Small Overlapping Image */}
                    <img
                        src="/assets/images/others/about_2_1.jpg"
                        className="hidden md:block absolute bottom-[-50px] left-[50px] w-[150px] rounded-2xl shadow-lg"
                    />

                </div>
            </div>
            <div className="space-y-3 app-container">
                
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut"}}
                        className="text-primary font-semibold uppercase">About Us</motion.h1>
                      <motion.h1 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="text-secondary text-3xl font-bold">Who We Are
                    </motion.h1>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-slate-700 leading-7"
                >
                    Wendo Health is a digital healthcare platform built to connect patients with trusted healthcare providers across 
                    Kenya and beyond. We make it easier for individuals and families to discover verified doctors, clinics, hospitals, 
                    pharmacies, laboratories, and other healthcare services—quickly, safely, and conveniently.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className=" text-slate-700 leading-7"
                >
                    Beyond listings, Wendo Health supports healthcare providers with digital tools that improve visibility, strengthen patient 
                    engagement, and enhance access to healthcare services. Through our platform, marketing solutions, and community-driven 
                    initiatives, we are helping build a healthier and more connected society.
                </motion.p>
                {/* <p>
                    Wendo Health also runs AfyaTalks, a health-focused podcast that brings together healthcare professionals, industry leaders, 
                    and the public to discuss medical awareness, wellness, innovations, and the future of healthcare.
                </p> */}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-5 rounded-2xl border-2 border-blue-200">
                    <div className="md:border-r md:border-dotted md:border-blue-200 md:pr-4">
                        <h1 className="text-secondary font-semibold">Mission</h1>
                        <p className="text-sm text-black">
                            To connect patients with trusted healthcare providers while empowering healthcare organizations with digital solutions that improve access, visibility, and quality healthcare delivery.
                        </p>
                    </div>

                    <div className="md:pl-4">
                        <h1 className="text-secondary font-semibold">Vision</h1>
                        <p className="text-sm text-black">
                            To become Africa’s leading healthcare discovery and engagement platform, transforming how people access healthcare services through innovation, trust, and community impact.
                        </p>
                    </div>
                </div>


            </div>
        </div>


        <div className="app-container">
            <div className="flex justify-center pb-5">
                <h1 className="text-secondary font-bold text-2xl">Why Choose Wendo Health?</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-blue-50 p-5 rounded-2xl border-2 border-blue-100">
                    <h1 className="text-secondary font-semibold">Patient-Centered Care</h1>
                    <p>Everything we build is focused on improving patient experience, access, and health outcomes.</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-2xl border-2 border-blue-100">
                    <h1 className="text-secondary font-semibold">Trust & Integrity</h1>
                    <p>We prioritize honesty, transparency, and verified healthcare partnerships to ensure patients access reliable services.</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-2xl border-2 border-blue-100">
                    <h1 className="text-secondary font-semibold">Technology Driven</h1>
                    <p>We embrace technology and creative solutions to solve real healthcare challenges and improve service delivery.</p>
                </div>
            </div>
        </div>



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



        <div id="impact" className="">
            <div className="app-container flex flex-col space-y-5 pb-20">
                <div>
                    <h1 className="text-secondary text-center font-bold text-2xl">Our Impact</h1>
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
  )
}

export default page
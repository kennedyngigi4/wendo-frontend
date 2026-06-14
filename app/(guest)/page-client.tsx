"use client";

import React from 'react';
import Sliders from './_components/sliders';
import HomeSearch from '../_components/home_search';
import HomeProfessionalsSlider from './_components/home-professionals-slider';
import HomeProvidersSlider from './_components/home-providers-slider';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CONSTANTS } from '@/lib/constants/constants';
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import HomeUpcomingEvents from './_components/home-upcoming-events';
import HomeBlogsSlider from './_components/home-blogs-slider';
import ProviderHubSlider from './_components/provider-hub-slider';


interface HomePageClientProps {
  data: any;
}

const HomePageClient = ({ data }: HomePageClientProps) => {

 

  return (
    <div className="space-y-12">

      <div>
        <Sliders />

        <div className="">
          <HomeSearch />
        </div>
      </div>


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


      <div className="app-container pb-8">
        <h1 className="text-center text-secondary font-semibold text-2xl pb-3">Your Healthcare Hub</h1>

        <div className="">
          <ProviderHubSlider />
        </div>
      </div>


      <div className="py-10 bg-blue-50">
        <div className="app-container ">
          <h1 className="text-center text-secondary font-semibold text-2xl pb-3">Explore Healthcare on Wendo</h1>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-3 rounded-lg">
              <h1 className="font-semibold text-slate-600">Popular Searches</h1>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <h1 className="font-semibold text-slate-600">Quick Filters</h1>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <h1 className="font-semibold text-slate-600">Conditions</h1>
            </div>
          </div>
        </div>
        
      </div>

      {data?.professionals?.length > 0 && (
        <HomeProfessionalsSlider professionals={data?.professionals} />
      )}
      

      {data?.providers?.length > 0 && (
        <HomeProvidersSlider providers={data?.providers}/>
      )}


      <div className="relative bg-[url('/assets/images/bg/4.jpg')] bg-no-repeat bg-cover bg-center py-20">

        <div className="absolute inset-0 bg-primary/80 z-0"></div>

        <div className="app-container relative z-10 text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5 space-y-8">
              <h1 className="text-3xl font-bold leading-10">What <span className="">patients</span> are saying about <span className="text-secondary">Wendo Health</span></h1>
              <p>Real experiences from patients who have connected with trusted healthcare providers through Afyhub.</p>
            </div>

            <div className="md:col-span-7">
              
            </div>
          </div>
        </div>
      </div>



      <div className="app-container pb-8">
        <h1 className="text-center text-secondary font-semibold text-2xl pb-3">Trusted Partners</h1>

        
      </div>


      {data?.events.length > 0 && (
        <HomeUpcomingEvents events={data?.events} />
      )}
      
      
      {data?.blogs.length > 0 && (
        <HomeBlogsSlider blogs={data?.blogs} />
      )}



      

    </div>
  )
}

export default HomePageClient
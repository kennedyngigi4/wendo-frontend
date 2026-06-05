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


      <div className="pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="relative w-full flex justify-end">

              {/* Main Image */}
              <img
                src="/assets/images/others/about_2.jpg"
                className="w-[400px] md:w-[500px] rounded-4xl border-4 border-blue-200"
              />

              {/* Small Overlapping Image */}
              {/* <img
                src="/assets/images/others/about_2_1.jpg"
                className="hidden md:block absolute bottom-[-50px] left-[50px] w-[150px] rounded-2xl shadow-lg"
              /> */}

            </div>
          </div>
          <div className="space-y-3 app-container">

            <div>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-primary font-semibold uppercase">About Us</motion.h1>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-secondary text-3xl font-bold">Connecting You to Trusted Healthcare Providers
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
              className=" text-slate-700 leading-7 max-md:hidden"
            >
              Beyond listings, Wendo supports healthcare providers with digital tools that improve visibility, strengthen patient
              engagement, and enhance access to healthcare services. Through our platform, marketing solutions, and community-driven
              initiatives, we are helping build a healthier and more connected society.
            </motion.p>
            
            <Link href="/about-us">
                <CustomButton 
                  label="Learn More"
                  btnType="button"
                  variant="secondary"
                  suffixIcon={{ type: "lucide", icon: ArrowRight }}
                />
              
            </Link>
          </div>
        </div>
      </div>


      <div className="app-container pb-8">
        <h1 className="text-center text-secondary font-semibold text-2xl pb-3">Your Healthcare Hub</h1>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {CONSTANTS.providerHubs.map((provider) => (
            <div className="p-5 border-2 border-slate-50 shadow rounded-2xl hover:shadow-xl hover:cursor-pointer hover:bg-slate-100" key={provider.id}>
              <Image src={provider.icon} alt={`${provider.title}`} width={50} height={50} />
              <div className="pt-3 space-y-2">
                <h1 className="text-secondary font-semibold text-sm">{provider.title}</h1>
                <p className="text-muted-foreground text-xs">{provider.subtitle}</p>
              </div>
            </div>
          ))}
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
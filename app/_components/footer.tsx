"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneCallIcon, YoutubeIcon } from 'lucide-react';



const MainFooter = () => {
  return (
    <footer className="">
        <div className="bg-gradient-to-b from-blue-50 to-white py-14">
            <div className="app-container">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h1 className="text-3xl font-bold text-secondary">
                        Stay Connected With Wendo
                    </h1>

                    <p className="text-muted-foreground mt-3">
                        Join our growing health community through podcasts, daily wellness
                        updates, and tools that help you stay informed and healthier every day.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Podcast */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-5">
                            🎙️
                        </div>

                        <h2 className="text-lg font-semibold text-secondary">
                            Our Podcast
                        </h2>

                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                            Listen to conversations with doctors, wellness experts, and inspiring
                            stories that help you live healthier every day.
                        </p>

                        <Link href="/health-learning-hub">
                            <button className="mt-5 text-sm font-medium text-primary hover:underline">
                                Listen Now →
                            </button>
                        </Link>
                       
                    </div>

                    {/* Newsletter */}
                    <div className="bg-primary rounded-3xl p-6 text-white shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                            📩
                        </div>

                        <h2 className="text-lg font-semibold">
                            Daily Health Newsletter
                        </h2>

                        <p className="text-sm text-white/80 mt-3 leading-relaxed">
                            Get simple health tips, awareness reminders, wellness insights, and
                            updates delivered directly to your inbox.
                        </p>

                        <div className="mt-5 flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-gray-200 rounded-xl px-4 py-3 text-sm text-secondary outline-none"
                            />

                            <button className="bg-white text-primary px-4 rounded-xl text-sm font-medium hover:bg-slate-100">
                                Join
                            </button>
                        </div>
                    </div>

                      {/* App */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
                              📱
                          </div>

                          <h2 className="text-lg font-semibold text-secondary">
                              Download Our App
                          </h2>

                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                              Access healthcare tools, providers, reminders, and wellness support
                              from anywhere using the Wendo mobile app.
                          </p>

                          <div className="flex gap-3 mt-5">
                              <button className="bg-secondary text-white px-4 py-2 rounded-xl text-sm">
                                  App Store
                              </button>

                              <button className="bg-secondary text-white px-4 py-2 rounded-xl text-sm">
                                  Google Play
                              </button>
                          </div>
                      </div>

                  </div>
              </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="bg-primary text-white">
            <div className="app-container grid md:grid-cols-12 grid-cols-12 gap-8 py-8">
                <div className="col-span-12 md:col-span-5">
                    <Image src="/wendo-footer-logo.png" alt="Wendo Health" width={250} height={250} />
                    <p className="pt-4 text-sm leading-6">To become Africa’s leading healthcare discovery and engagement platform, transforming how people access healthcare services through innovation, trust, and community impact.</p>
                
                    <div className="pt-10 flex space-x-4">
                        <Link href="">
                            <FacebookIcon />
                        </Link>
                        <Link href="">
                            <YoutubeIcon />
                        </Link>
                        <Link href="">
                            <InstagramIcon />
                        </Link>
                        <Link href="">
                            <LinkedinIcon />
                        </Link>
                    </div>
                </div>
                <div className="col-span-6 md:col-span-2">
                    <h1 className="font-semibold">Company</h1>
                    <nav className="flex flex-col space-y-2 pt-3 text-sm">
                        <Link href="/about-us">About Us</Link>
                        <Link href="/about-us#services">Our Services</Link>
                        <Link href="/about-us#impact">Our Impact</Link>
                        <Link href="/careers">Careers</Link>
                        <Link href="/contact-us">Contact Us</Link>
                        <Link href="/partnerships">Partnerships</Link>
                    </nav>
                </div>
                  <div className="col-span-6 md:col-span-2">
                    <h1 className="font-semibold">Products</h1>
                    <nav className="flex flex-col space-y-2 pt-3 text-sm">
                        <Link href="/doctors">Doctors</Link>
                        <Link href="/hospitals">Hospitals</Link>
                        <Link href="/clinics">Clinics</Link>
                        <Link href="/pharmacies">Pharmacies</Link>
                        <Link href="/insurances">Health Insurance</Link>
                        <Link href="/nursing-homes">Nursing Homes</Link>
                    </nav>
                </div>
                  <div className="col-span-12 md:col-span-3">
                    <h1 className="font-semibold">Contact Us</h1>
                    <nav className="flex flex-col space-y-2 pt-3 text-sm">
                        <Link href="" className="flex space-x-2 items-center">
                            <PhoneCallIcon size={12} />  <span>+254 740 733604</span>
                        </Link>
                        <Link href="" className="flex space-x-2 items-center">
                            <MailIcon size={12} />  <span>support@wendohealth.com</span>
                        </Link>
                        
                    </nav>
                </div>
            </div>

            <div className="flex justify-center text-white items-center pt-4 pb-8">
                <div className="flex md:flex-row flex-col max-md:justify-center max-md:items-center">
                    <p>&copy;2026</p> <p className="font-bold px-3">WENDO HEALTH</p> <p>All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default MainFooter
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneCallIcon, YoutubeIcon } from 'lucide-react';



const MainFooter = () => {
  return (
    <footer className="">
        <div className="bg-blue-50 py-8">
            <div className="app-container">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-3">
                        <h1 className="text-secondary font-semibold">Our Podcast</h1>
                    </div>
                    <div className="md:col-span-6">
                        <h1 className="text-secondary font-semibold">Subscribe to Our Newsletter</h1>
                    </div>
                    <div className="md:col-span-3">
                        <h1 className="text-secondary font-semibold">Download Free App</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-primary text-white">
            <div className="app-container grid md:grid-cols-12 grid-cols-1 gap-8 py-8">
                <div className="md:col-span-5">
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
                <div className="md:col-span-2">
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
                <div className="md:col-span-2">
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
                <div className="md:col-span-3">
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
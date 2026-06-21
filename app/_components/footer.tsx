"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookIcon, HeadphonesIcon, HeartHandshake, InstagramIcon, LinkedinIcon, MailIcon, PhoneCallIcon, TabletSmartphoneIcon, YoutubeIcon } from 'lucide-react';
import { ApiRequests } from '@/lib/requests/api-requests';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { Button } from '@/components/ui/button';
import CustomButton from '@/components/ui/custom-button';
import { trackEvent } from '@/lib/helpers/analytics';



const MainFooter = () => {

    const [ email, setEmail ] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscription = async() => {
        if(!email) return;

        setLoading(true);
        const payload = {
            "email": email
        }

        try{
            const resp = await ApiRequests.post("notifications/newsletter_subscription/", payload);
            console.log(resp)
            if(resp.success){
                toast.success(resp.message);
                setEmail("");
            } else {
                toast.error(resp.errors);
            }
        } catch(error){
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <footer className="">

          {/* MENTAL HEALTH BUTTON */}
          <div>
              <Link
                  href="/mental-wellness-support"
                  className="fixed bottom-6 right-6 z-50 md:hidden"
              >
                  <CustomButton
                      label="Wellness Support"
                      btnType="button"
                      prefixIcon={{
                          type: "lucide",
                          icon: HeartHandshake,
                      }}
                      className="bg-gradient-to-r from-teal-500 to-blue-600"
                      onClick={() =>
                          trackEvent(
                              "mental_wellness_support_clicked",
                              "mental_wellness_cta",
                              "mobile_button"
                          )
                      }
                  />
              </Link>

              <Link
                  href="/mental-wellness-support"
                  className="fixed bottom-6 right-6 z-50 hidden md:block"
              >
                  <CustomButton
                      label="Mental Wellness Support"
                      btnType="button"
                      prefixIcon={{
                          type: "lucide",
                          icon: HeartHandshake,
                      }}
                      className="bg-gradient-to-r from-teal-500 to-blue-600"
                      onClick={() =>
                          trackEvent(
                              "mental_wellness_support_clicked",
                              "mental_wellness_cta",
                              "desktop_button"
                          )
                      }
                  />
              </Link>
        </div>


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
                            <HeadphonesIcon />
                        </div>

                        <h2 className="text-lg font-semibold text-secondary">
                            Our Podcast
                        </h2>

                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                            Listen to conversations with doctors, wellness experts, and inspiring
                            stories that help you live healthier every day.
                        </p>

                        <Link href="/health-learning-hub">
                            <button className="mt-5 text-sm font-medium text-primary hover:underline cursor-pointer">
                                Listen Now →
                            </button>
                        </Link>
                       
                    </div>

                    {/* Newsletter */}
                    <div className="bg-primary rounded-3xl p-6 text-white shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                            <MailIcon />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-secondary outline-none"
                            />

                            <button 
                                className="bg-white text-primary px-4 rounded-xl text-sm font-medium hover:bg-slate-100 cursor-pointer"
                                onClick={handleSubscription}
                                disabled={loading}
                            >
                                {loading ? "Joining ...." : "Join"}
                            </button>
                        </div>
                    </div>

                      {/* App */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
                              <TabletSmartphoneIcon />
                          </div>

                          <h2 className="text-lg font-semibold text-secondary">
                              Download Our App
                          </h2>

                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                              Access healthcare tools, providers, reminders, and wellness support
                              from anywhere using the Wendo mobile app.
                          </p>

                          <div className="flex gap-3 mt-5">
                              <button className="bg-secondary text-white px-4 py-2 rounded-xl text-sm cursor-pointer">
                                  App Store
                              </button>

                              <button className="bg-secondary text-white px-4 py-2 rounded-xl text-sm cursor-pointer">
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
                        <a href="https://www.youtube.com/@afyatalks" target="_blank" rel="noopener noreferrer">
                            <YoutubeIcon />
                        </a>
                        <a href="https://www.facebook.com/wendo.health/" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </a>
                          <a href="https://www.linkedin.com/company/wendohealth" target="_blank" rel="noopener noreferrer">
                            <LinkedinIcon />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTiktok} size="lg" />
                        </a>
                    </div>
                </div>
                <div className="col-span-6 md:col-span-2">
                    <h1 className="font-semibold">Company</h1>
                    <nav className="flex flex-col space-y-2 pt-3 text-sm">
                        <Link href="/about-us">About Us</Link>
                        <Link href="/about-us#services">Our Services</Link>
                        <Link href="/about-us#impact">Our Impact</Link>
                        <Link href="#">Careers</Link>
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
                        <Link href="#">Pharmacies</Link>
                        <Link href="#">Health Insurance</Link>
                        <Link href="#">Nursing Homes</Link>
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
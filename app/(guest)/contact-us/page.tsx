"use client";

import React from "react";

const ContactUsPage = () => {
    return (
        <div className="bg-white">

            {/* Hero Section */}
            <section className="py-20">
                <div className="app-container text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary">
                        Contact Wendo
                    </h1>

                    <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                        Have questions, feedback, partnership ideas, or need support?
                        Our team is here to help you on your healthcare journey.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="pb-10">
                <div className="app-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Email */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-5">
                                📩
                            </div>

                            <h2 className="font-semibold text-lg text-secondary">
                                Email Support
                            </h2>

                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                Reach out to us anytime and our support team will get back to
                                you as soon as possible.
                            </p>

                            <p className="mt-5 text-primary font-medium break-all">
                                support@wendohealth.com
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">
                                📞
                            </div>

                            <h2 className="font-semibold text-lg text-secondary">
                                Call Us
                            </h2>

                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                Speak with our team directly for inquiries, guidance, or
                                assistance with Wendo services.
                            </p>

                            <p className="mt-5 text-primary font-medium">
                                +254 740 733604
                            </p>
                        </div>

                        {/* Community */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-5">
                                🌍
                            </div>

                            <h2 className="font-semibold text-lg text-secondary">
                                Community & Partnerships
                            </h2>

                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                Interested in collaborating, partnering, or growing healthcare
                                access together with Wendo?
                            </p>

                            <p className="mt-5 text-primary font-medium">
                                Let’s connect
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16">
                <div className="app-container">
                    <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm">

                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-secondary">
                                Send Us a Message
                            </h2>

                            <p className="text-muted-foreground mt-3">
                                We usually respond within 24–48 hours.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-primary"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-primary"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Subject"
                            className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-primary w-full mt-5"
                        />

                        <textarea
                            rows={6}
                            placeholder="How can we help you?"
                            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary w-full mt-5"
                        />

                        <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-300">
                            Send Message
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactUsPage;
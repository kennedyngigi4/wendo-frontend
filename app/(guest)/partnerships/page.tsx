"use client";

import { Handshake, Building2, Users, Globe, HeartHandshake, ArrowRight } from "lucide-react";

const partnershipTypes = [
  {
    title: "Healthcare Providers",
    description:
      "Partner with Wendo to increase your visibility, attract more patients, and streamline patient engagement.",
  },
  {
    title: "Hospitals & Clinics",
    description:
      "Showcase your services, improve patient access, and strengthen your digital presence.",
  },
  {
    title: "NGOs & Development Partners",
    description:
      "Collaborate on healthcare awareness, outreach programs, and community health initiatives.",
  },
  {
    title: "Insurance Providers",
    description:
      "Connect members with healthcare providers and simplify access to quality healthcare services.",
  },
  {
    title: "Corporate Organizations",
    description:
      "Support employee wellness through access to trusted healthcare providers and resources.",
  },
  {
    title: "Technology Partners",
    description:
      "Work with us to build innovative solutions that improve healthcare access and delivery.",
  },
];

const benefits = [
  "Expand your reach and visibility",
  "Access a growing healthcare network",
  "Improve patient engagement",
  "Support healthcare innovation",
  "Create meaningful community impact",
  "Leverage digital healthcare solutions",
];

export default function Partnerships() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20">
        <div className="app-container text-center max-w-4xl mx-auto">
          <Handshake className="mx-auto h-16 w-16 text-secondary mb-6" />

          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            Partner With Wendo
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Together, we can improve healthcare access, strengthen healthcare
            ecosystems, and create better experiences for patients and
            providers through technology.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16">
        <div className="app-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">
              Partnership Opportunities
            </h2>

            <p className="text-slate-600 mt-3">
              We collaborate with organizations across the healthcare sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((item) => (
              <div
                key={item.title}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-secondary mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="bg-slate-50 py-16">
        <div className="app-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">
              Why Partner With Us?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-3"
              >
                <ArrowRight className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="app-container">
          <div className="bg-secondary rounded-3xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold">
              Let's Build Better Healthcare Together
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-white/90">
              Whether you're a healthcare provider, organization, insurer, NGO,
              or technology company, we'd love to explore opportunities for
              collaboration.
            </p>

            <button className="mt-8 bg-white text-secondary font-semibold px-8 py-3 rounded-full hover:bg-slate-100 transition">
              Become a Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
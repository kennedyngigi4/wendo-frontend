"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    InfoIcon,
    Menu,
    PhoneCall,
    User2Icon,
    X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MainHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Doctors", href: "/doctors" },
        { label: "Hospitals", href: "/hospitals" },
        { label: "Clinics", href: "/clinics" },
        // { label: "Insurance", href: "/insurances" },
        { label: "Learning Hub", href: "/health-learning-hub" },
        { label: "Events", href: "/events" },
        { label: "News & Blogs", href: "/blogs" },
    ];

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    const desktopNavClass = (href: string) =>
        `relative px-2.5 py-1 transition-all duration-200
        hover:text-white hover:-translate-y-[1px]
        after:absolute after:left-0 after:bottom-[0px]
        after:h-[2px] after:bg-secondary
        after:transition-all after:duration-300
        ${isActive(href)
            ? "text-white after:w-full"
            : "text-white after:w-0 hover:after:w-full"
        }`;

    const mobileNavClass = (href: string) =>
        `block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200
        ${isActive(href)
            ? "bg-secondary text-white"
            : "text-slate-700 hover:bg-slate-100"
        }`;

    return (
        <section className="relative z-50">
            <div className="bg-white shadow-sm md:px-15">
                {/* TOP HEADER */}
                <div className="flex h-[90px] items-center justify-between px-4 md:px-0">
                    {/* LOGO */}
                    <Link href="/">
                        <Image
                            src="/wendo-logo.png"
                            alt="Wendo Health"
                            width={150}
                            height={150}
                            priority
                        />
                    </Link>

                    {/* DESKTOP ACTIONS */}
                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href="/about-us"
                            className="flex items-center text-sm hover:text-primary"
                        >
                            <InfoIcon size={17} className="pe-1" />
                            About Us
                        </Link>

                        <Link
                            href="/contact-us"
                            className="flex items-center text-sm hover:text-primary"
                        >
                            <PhoneCall size={17} className="pe-1" />
                            Contact us
                        </Link>

                        <Link
                            href="/auth/login"
                            className="mx-2 flex items-center text-sm hover:text-primary"
                        >
                            <User2Icon size={17} className="pe-1" />
                            Login
                        </Link>

                        <div className="flex">
                            <Link href="/auth/register/patient">
                                <Button className="rounded-e-none rounded-s-2xl px-4">
                                    Patient
                                </Button>
                            </Link>

                            <Link href="/auth/register/provider">
                                <Button className="-ml-[3px] rounded-e-2xl rounded-s-none bg-secondary px-4">
                                    Provider
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="flex items-center justify-center rounded-lg border p-2 md:hidden"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* DESKTOP NAV */}
                
                <nav
                        className={`hidden md:flex items-center transition-all duration-300 ${scrolled
                                ? "fixed left-0 top-0 z-50 w-full justify-between rounded-none bg-primary px-15 py-3 shadow-md"
                                : "mx-auto mt-2 w-fit justify-center rounded-t-full bg-primary px-28 lg:px-24 xl:px-16 pt-2 pb-1"
                            }`}
                    >
                    {/* LOGO WHEN SCROLLED */}
                    {scrolled && (
                        <Link href="/">
                            <Image
                                src="/wendo-footer-logo.png"
                                alt="Wendo Health"
                                width={70}
                                height={70}
                            />
                        </Link>
                    )}

                    {/* NAV LINKS */}
                    <div className="flex space-x-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={desktopNavClass(link.href)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT ACTIONS WHEN SCROLLED */}
                    {scrolled && (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/auth/login"
                                className="flex items-center text-white"
                            >
                                <User2Icon size={17} className="pe-1" />
                                Login
                            </Link>

                            <div className="flex">
                                <Link href="/auth/register/patient">
                                    <Button
                                        variant="secondary"
                                        className="rounded-e-none rounded-s-2xl px-4 py-1.5 text-white"
                                    >
                                        Patient
                                    </Button>
                                </Link>

                                <Link href="/auth/register/provider">
                                    <Button
                                        variant="white"
                                        className="-ml-[5px] rounded-e-2xl rounded-s-none px-4 text-afyblue"
                                    >
                                        Provider
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </div>

            {/* MOBILE DRAWER OVERLAY */}
            <div
                className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${mobileMenuOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* MOBILE DRAWER */}
            <div
                className={`fixed left-0 top-0 z-[70] h-full w-[85%] max-w-[320px]
                bg-white shadow-2xl transition-transform duration-300 md:hidden
                ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* DRAWER HEADER */}
                <div className="flex items-center justify-between border-b p-4">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Image
                            src="/wendo-logo.png"
                            alt="WENDO HEALTH"
                            width={75}
                            height={75}
                        />
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* MOBILE LINKS */}
                <div className="flex flex-col gap-2 p-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={mobileNavClass(link.href)}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="my-3 border-t" />

                    <Link
                        href="/about-us"
                        className="flex items-center rounded-xl px-4 py-3 hover:bg-slate-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <InfoIcon size={18} className="me-2" />
                        About Us
                    </Link>

                    <Link
                        href="/contact-us"
                        className="flex items-center rounded-xl px-4 py-3 hover:bg-slate-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <PhoneCall size={18} className="me-2" />
                        Contact Us
                    </Link>

                    <Link
                        href="/auth/login"
                        className="flex items-center rounded-xl px-4 py-3 hover:bg-slate-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <User2Icon size={18} className="me-2" />
                        Login
                    </Link>

                    {/* REGISTER BUTTONS */}
                    <div className="mt-4 flex">
                        <Link
                            href="/auth/register/patient"
                            className="flex-1"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Button className="w-full rounded-e-none rounded-s-2xl">
                                Patient
                            </Button>
                        </Link>

                        <Link
                            href="/auth/register/provider"
                            className="flex-1"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Button className="-ml-[3px] w-full rounded-e-2xl rounded-s-none bg-secondary">
                                Provider
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainHeader;





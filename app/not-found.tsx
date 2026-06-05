"use client"

import Link from "next/link";
import MainFooter from "./_components/footer";
import MainHeader from "./_components/header";
import CustomButton from "@/components/ui/custom-button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
    return (
        <div>

            <MainHeader />

            <div className="app-container min-h-screen flex flex-col items-center justify-center text-center py-14">
                <h1 className="text-6xl text-primary font-bold">404</h1>
                <p className="mt-4 text-lg text-primary font-semibold pb-2">Page not found</p>

                <Link
                    href="/"
                    
                >
                    <CustomButton 
                        label="Go Home"
                        btnType="button"
                        variant="secondary"
                        prefixIcon={{ type: "lucide", icon: HomeIcon }}
                    />
                </Link>
            </div>

            <MainFooter />
        </div>
       
    );
}
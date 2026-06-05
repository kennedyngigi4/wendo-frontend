import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import ProfessionPreload from "@/components/providers/profession-preload";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  metadataBase: new URL("https://wendohealth.com"),

  title: "Wendo Health - Connecting You to Trusted Healthcare",
  description: "Wendo is a digital healthcare platform connecting people to trusted health information, hospitals, clinics, specialists, podcasts, and wellness resources through an interactive learning hub designed to make healthcare simple, accessible, and informed.",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "Wendo Health - Connecting You to Trusted Healthcare.",
    description: "Wendo is a digital healthcare platform connecting people to trusted health information, hospitals, clinics, specialists, podcasts, and wellness resources through an interactive learning hub designed to make healthcare simple, accessible, and informed.",
    url: "https://wendohealth.com",
    siteName: "Wendo Health",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "Wendo Health",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Wendo Health - Connecting You to Trusted Healthcare.",
    description: "Wendo is a digital healthcare platform connecting people to trusted health information, hospitals, clinics, specialists, podcasts, and wellness resources through an interactive learning hub designed to make healthcare simple, accessible, and informed.",
    images: ["/social.png"],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased`}
      >
        <NextTopLoader
          color="#dc2626"
          height={3}
          showSpinner={false}
        />
        
          <main>
            <ProfessionPreload />
            <SessionProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </SessionProvider>
            <Toaster position="top-center" richColors />
          </main>
        
      </body>
    </html>
  );
}

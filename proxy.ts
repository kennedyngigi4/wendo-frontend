import { auth } from "@/auth";
import { NextResponse } from "next/server";


export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = req.auth?.user?.role;
    const pathname = nextUrl.pathname;

    if(!isLoggedIn && (pathname.startsWith("/dashboard"))){
        return NextResponse.redirect(new URL("/auth/login", nextUrl))
    }

    if(pathname.startsWith("/dashboard/provider") && role !== "provider"){
        return NextResponse.redirect(new URL("/dashboard/patient", nextUrl));
    }


    if (pathname.startsWith("/dashboard/patient") && role !== "patient") {
        return NextResponse.redirect(new URL("/dashboard/provider", nextUrl));
    }
    
    return NextResponse.next();
})


export const config = {
    matcher: [ "/dashboard/patient/:path*", "/dashboard/provider/:path*"],
}



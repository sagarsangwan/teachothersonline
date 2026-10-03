import { NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/teacher-application"];
const adminProtectedRoutes = ["/admin-dashboard", "/admin-dashboard/teachers"];

export default async function proxy(req) {
    const isAuthenticated = await auth();
    const { pathname } = req.nextUrl;

    if (adminProtectedRoutes.includes(pathname)) {
        if (!isAuthenticated) {
            const absoluteURL = new URL("/", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        } else if (isAuthenticated.user?.role !== "admin") {
            const absoluteURL = new URL("/", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
    }

    if (protectedRoutes.includes(pathname)) {
        if (!isAuthenticated) {
            const absoluteURL = new URL("/api/auth/signin", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/teacher-application", "/admin-dashboard/:path*"]
};


import { NextResponse } from "next/server";
import { auth } from "./auth";





const protectedRoutes = ["/teacher-application"];
const adminProtectedRoutes = ["/admin-dashboard"];


export default async function middleware(req) {
    const isAuthenticated = await auth();
    if (isAuthenticated && adminProtectedRoutes.includes(req.nextUrl.pathname)) {
        if (isAuthenticated.user.role !== "admin") {
            const absoluteURL = new URL("/", req.nextUrl.origin);
            return NextResponse.redirect(
                absoluteURL.toString()
            );


        }
    }

    if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/api/auth/signin", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}
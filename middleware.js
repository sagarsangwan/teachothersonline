
import { NextResponse } from "next/server";
import { auth } from "./auth";





const protectedRoutes = ["/teacher-application"];
const adminProtectedRoutes = ["/admin-dashboard"];


export default async function middleware(req) {
    const isAuthenticated = await auth();
    // console.log(isAuthenticated, "----------------------------------------------------------------------------------------------");
    if (adminProtectedRoutes.includes(req.nextUrl.pathname)) {
        if (!isAuthenticated) {
            const absoluteURL = new URL("/", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        } else {
            if (isAuthenticated.user.admin !== "admin") {
                const absoluteURL = new URL("/", req.nextUrl.origin);
                return NextResponse.redirect(absoluteURL.toString());

            }
        }
    }


    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        if (!isAuthenticated) {
            const absoluteURL = new URL("/api/auth/signin", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
    }
}
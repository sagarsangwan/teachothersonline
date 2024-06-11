
import { NextResponse } from "next/server";
import { auth } from "./auth";

// export { auth as middleware } from "@/auth"


const protectedRoutes = ["/teacher-application"];
const adminProtectedRoutes = ["/admin-dashboard", "/admin-dashboard/teachers"]


export default async function middleware(req) {
    const isAuthenticated = await auth();
    if (adminProtectedRoutes.includes(req.nextUrl.pathname)) {
        if (!isAuthenticated) {
            const absoluteURL = new URL("/", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        } else {
            if (isAuthenticated.user.role !== "admin") {
                const absoluteURL = new URL("/", req.nextUrl.origin);
                return NextResponse.redirect(absoluteURL.toString());

            }
        }
    }


    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        if (!isAuthenticated) {
            console.log("not logged in ------------------------------------");
            const absoluteURL = new URL("/api/auth/signin", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
    }
}
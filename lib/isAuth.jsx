"use client";
import { isAuthenticated } from "@/Utils/Auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAuth(Component) {
    return function IsAuth(props) {
        const auth = isAuthenticated;


        useEffect(() => {
            if (!auth) {
                return redirect("/");
            }
        }, []);


        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
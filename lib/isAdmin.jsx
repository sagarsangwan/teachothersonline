"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAdmin(Component) {
    return function IsAdmin(props) {
        const { data: session } = useSession();
        const auth = session?.user;

        useEffect(() => {
            if (!auth) {
                return redirect("/api/auth/signin");
            }
            if (auth.role !== "admin") {
                return redirect("/");
            }
        }, []);


        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}

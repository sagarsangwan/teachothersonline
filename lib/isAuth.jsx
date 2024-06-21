"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function isAuth(Component, callbackurl) {
    return function IsAuth(props) {

        const { data: session, status } = useSession();
        const router = useRouter();
        let auth
        if (status === "loading") {
            auth = null;
        }
        if (status === "authenticated") {
            auth = session;
        }
        if (status === "unauthenticated") {
            auth = null;
        }


        useEffect(() => {
            if (status === "unauthenticated") {
                redirect("/")

            }
        }, [status, router]);

        if (status === "loading") {
            return <div>Loading...</div>;
        }

        if (status === "unauthenticated") {
            return null;
        }

        return <Component {...props} />;
    };
}

"use client"

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getToken } from "./actions"
import Loader from "../ui/Loader"

function ClientProvider({ children }) {
    // const videoCLient = useIntilizeVideoClient()
    // const { status } = useSession()
    const { data: session, status } = useSession()
    const [videoCLient, setVideoClient] = useState(null)
    useEffect(() => {
        if (status === "loading") return;
        let streamUser = "";
        if (session?.user?.id) {
            streamUser = {
                id: session.user.id,
                name: session.user.name,
                image: session.user.image
            }
        } else {

        }
        const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
        const client = new StreamVideoClient({
            apiKey,
            user: streamUser,
            tokenProvider: streamUser?.id ? getToken : undefined
        })
        setVideoClient(client)

        // return () => {
        //     client.disconnectUser();
        //     setVideoClient(null);
        // };
    }, [session, status])

    if (status === "loading") {
        return (
            <div className="flex h-screen justify-center items-center ">
                <Loader />
            </div>
        )
    }

    if (status === "unauthenticated") {
        return (
            <div>
                {children}
            </div>
        )
    }

    if (!videoCLient) {
        return (
            <div className="flex h-screen justify-center items-center ">
                <Loader />
            </div>
        )
    }
    return (
        <StreamVideo client={videoCLient}>
            {children}
        </StreamVideo>
    )

}


export default ClientProvider


"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { nanoid } from "nanoid"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getToken } from "./actions"

function ClientProvider({ children }) {
    const videoCLient = useIntilizeVideoClient()
    if (!videoCLient) {
        return (
            <div className="flex h-screen justify-center items-center ">
                <ReloadIcon className="mr-2 h-10 w-10 animate-spin" />
            </div>
        )
    }
    return (
        <StreamVideo client={videoCLient}>
            {children}
        </StreamVideo>
    )

}

function useIntilizeVideoClient() {
    const { session, status } = useSession()
    const [videoCLient, setVideoClient] = useState(null)
    useEffect(() => {
        if (status === "loading") return;
        let streamUser = "";
        if (session?.user?.id) {
            streamUser = {
                id: session.user.id,
                name: session.user.username,
                image: session.user.image
            }
        } else {
            const id = nanoid
            streamUser = {
                id: id,
                type: "guest",
                name: `guest ${id}`
            }
            const client = new StreamVideoClient({
                apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
                user: streamUser,
                tokenProvider: getToken()
            })
            setVideoClient(client)
            return () => {
                client.disconnectUser()
                setVideoClient(null)
            }
        }
    }, [])

    return videoCLient
}

export default ClientProvider

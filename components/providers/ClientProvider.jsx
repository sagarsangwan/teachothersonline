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
                name: session.user.username,
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

// function useIntilizeVideoClient() {
//     const { data: session, status } = useSession()
//     const [videoCLient, setVideoClient] = useState(null)
//     useEffect(() => {
//         if (status === "loading") return;
//         let streamUser = "";
//         if (session?.user?.id) {
//             streamUser = {
//                 id: session.user.id,
//                 name: session.user.username,
//                 image: session.user.image
//             }
//         } else {

//         }
//         const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
//         const client = new StreamVideoClient({
//             apiKey,
//             user: streamUser,
//             tokenProvider: streamUser?.id ? getToken : undefined
//         })
//         setVideoClient(client)

//         return () => {
//             client.disconnectUser();
//             setVideoClient(null);
//         };
//     }, [session, status])

//     return videoCLient
// }

export default ClientProvider



// import { useSession } from 'next-auth/react';
// import {
//     StreamCall,
//     StreamVideo,
//     StreamVideoClient
// } from '@stream-io/video-react-sdk';
// import { useEffect, useState } from 'react';
// import { getToken } from './actions';



// const ClientProvider = ({ children }) => {
//     const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
//     const { data: session, status } = useSession()
//     const [videoClient, setVideoClient] = useState(null)

//     useEffect(() => {
//         if (status === 'loading' || !session) return;
//         if (!apiKey) throw new Error('API key not found')
//         const client = new StreamVideoClient({
//             apiKey,
//             user: {
//                 id: session.user.id,
//                 name: session.user.username,
//                 image: session.user.image
//             },
//             tokenProvider: getToken
//         })
//         setVideoClient(client)
//         return () => {
//             client.disconnectUser()
//             setVideoClient(null)
//         }


//     }, [session, status, apiKey])
//     if (status === "loading") {
//         return (
//             <div className="flex h-screen justify-center items-center ">
//                 <Loader />
//             </div>
//         )
//     }

//     if (status === "unauthenticated") {
//         return (
//             <div>
//                 {children}
//             </div>
//         )
//     }
//     if (!videoClient) {
//         return (
//             <div className="flex h-screen justify-center items-center ">
//                 <Loader />
//             </div>
//         )
//     }
//     return (
//         <StreamVideo client={videoClient}>
//             {children}
//         </StreamVideo>
//     );
// };


// export default ClientProvider;
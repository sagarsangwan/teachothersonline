"use client"
import Loader from '@/components/ui/Loader';
import {
    CallControls, SpeakerLayout, StreamCall, StreamTheme, useStreamVideoClient, useCallStateHooks, Call,
    useCall,
} from '@stream-io/video-react-sdk';
import useLoadCall from '@/hooks/useLoadCall';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function MeetingPage({ id }) {
    const { data: session, status } = useSession()
    const { call, callLoading } = useLoadCall(id)
    if (callLoading || status === "loading") {
        return (<Loader />)
    }
    if (!call) {
        return (
            <div className=' h-screen flex justify-center items-center my-auto'>

                <p className="text-xl">Class not Found</p>
            </div>
        )
    }
    return (
        <div>
            <StreamCall call={call}>
                <StreamTheme className=''>
                    <MeetingScreen />
                </StreamTheme>
            </StreamCall>
        </div>
    )
}


function MeetingScreen() {
    const { useCallStartsAt } = useCallStateHooks()
    const callStartAt = useCallStartsAt()

    const callIsInFuture = callStartAt && new Date(callStartAt) > new Date();

    if (callIsInFuture) {
        return <UpcomingMeetingScreen />
    }
    return (
        <div className=' h-screen flex justify-center items-center my-auto'>
            call is live
        </div>
    )


}

function MeetingEndedScreen() {
    return (
        <div className=' h-screen flex justify-center items-center my-auto'>

            <p className="text-xl">Class Ended</p>
        </div>
    )
}
function UpcomingMeetingScreen() {
    const currentCall = useCall();
    return (
        <div className=' flex flex-col h-screen justify-center items-center '>

            <p className="text-xl">Class not Started yet it will start at
                <span className=' font-bold'>{" "}
                    {currentCall.state.startsAt?.toLocaleTimeString()}
                </span>

            </p>
            {currentCall.state.custom.description && <p className="text-xl mt-5">Description : {" "}
                <span className=' font-bold'>
                    {currentCall.state.custom?.description}
                </span>

            </p>}
            <Button className="mt-10"> <Link href={"/"}>Go To Homepage</Link> </Button>

        </div>
    )
}

export default MeetingPage

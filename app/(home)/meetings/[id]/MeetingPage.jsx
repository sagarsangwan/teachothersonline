"use client"
import Loader from '@/components/ui/Loader';
import moment from "moment";
import {
    CallControls, SpeakerLayout, StreamCall, StreamTheme, useStreamVideoClient, useCallStateHooks, Call,
    useCall,
    VideoPreview,
    DeviceSettings,
} from '@stream-io/video-react-sdk';
import { Label } from "@/components/ui/label"

import useLoadCall from '@/hooks/useLoadCall';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MyCallUI from './MyCallUI';
function MeetingPage({ id }) {
    const { data: session, status } = useSession()
    const [currentClass, setCurrentClass] = useState(null)
    const { call, callLoading } = useLoadCall(id)




    // setCurrentClass(getClassByMeetingId(id))
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
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const { useCallStartsAt, useCallEndedAt } = useCallStateHooks()
    const callStartAt = useCallStartsAt()
    const callEndedAt = useCallEndedAt()
    const callIsInFuture = callStartAt && new Date(callStartAt) > new Date();

    if (callIsInFuture) {
        return (<UpcomingMeetingScreen />)
    }
    return (
        <div className=' h-screen flex justify-center items-center my-auto'>
            {isSetupComplete ? (
                <MyCallUI />
            ) : (<SetupUi setIsSetupComplete={setIsSetupComplete} />)}
        </div>
    )
}

function SetupUi({ setIsSetupComplete }) {
    const currrentCall = useCall()
    const [isMicOn, setIsMicOn] = useState(false)
    useEffect(() => {
        if (isMicOn) {
            currrentCall.camera.disable();
            currrentCall.microphone.disable();
        } else {
            currrentCall.camera.enable();
            currrentCall.camera.enable();
        }
    }, [isMicOn, currrentCall?.camera, currrentCall?.microphone])
    return (<div className='' >
        <VideoPreview />
        <div className='flex flex-col justify-center items-center gap-2'>
            <DeviceSettings />
            <div>
                <Switch checked={isMicOn} onCheckedChange={(checked) => setIsMicOn(checked)} />
                <Label htmlFor="airplane-mode">Camera and Mic</Label>
            </div>
            <Button onClick={async () => {
                currrentCall.join();
                setIsSetupComplete(true)
            }}>Join meeting</Button>
        </div>
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
    console.log(currentCall.state.startsAt)
    return (
        <div className=' flex flex-col h-screen justify-center items-center '>

            <p className="text-xl">Class not Started yet it will start at
                <span className=' font-bold'>{" "}
                    {moment(currentCall.state.startsAt).format("hh:mm A")}
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

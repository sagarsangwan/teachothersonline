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
function MeetingPage({ id, currentClass }) {
    const { data: session, status } = useSession()
    const { call, callLoading } = useLoadCall(id)
    const currentClassId = currentClass.id
    const notAllowedToJoin = (call?.state.members.find((member) => member.user.id === session.user?.id))
    // console.log(call.state.members)



    if (callLoading || status === "loading") {
        return (<Loader />)
    }
    if (!notAllowedToJoin) {
        return (
            <div className=' h-screen flex  flex-col justify-center items-center my-auto'>

                <div className="text-xl">You are not allowed to join this call either contact with your teacher or kindly log in with correct account </div>
                <Button className="mt-10"> <Link href={"/"}>Go To Homepage</Link> </Button>
            </div>
        )
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

                    <MeetingScreen currentClassId={currentClassId} />
                </StreamTheme>
            </StreamCall>
        </div>
    )
}


function MeetingScreen({ currentClassId }) {
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const { useCallStartsAt, useCallEndedAt } = useCallStateHooks()
    const callStartAt = useCallStartsAt()
    const callEndedAt = useCallEndedAt()


    const callIsInFuture = callStartAt && new Date(callStartAt) > new Date();
    const callHasEnded = !!callEndedAt
    // if (callHasEnded) {
    //     return (
    //         <MeetingEndedScreen currentClassId={currentClassId} />
    //     )
    // }

    // if (callIsInFuture) {
    //     return (<UpcomingMeetingScreen currentClass={currentClass} />)
    // }
    return (
        <div className=' h-screen flex justify-center items-center my-auto'>

            {isSetupComplete ? (
                <MyCallUI currentClassId={currentClassId} />
            ) : (<SetupUi setIsSetupComplete={setIsSetupComplete} />)}
        </div>
    )
}

function SetupUi({ setIsSetupComplete }) {
    const currrentCall = useCall()
    const [isMicOn, setIsMicOn] = useState(false)

    const callDescription = currrentCall.state.custom?.description
    const words = callDescription.split(' ');

    // Extract words from index 1 to 7 (inclusive)
    const selectedWords = words.slice(0, 7).join(' ')
    useEffect(() => {
        if (isMicOn) {
            currrentCall.camera.disable();
            currrentCall.microphone.disable();
        } else {
            currrentCall.camera.enable();
            currrentCall.camera.enable();
        }
    }, [isMicOn, currrentCall?.camera, currrentCall?.microphone])
    return (
        <div className='flex flex-col justify-center text-center' >

            <div className='mb-3'>
                <p>
                    Meeting description : {selectedWords}
                </p>
                <p className="text-xl font-medium"> Setup</p>
            </div>
            <div className=' w-auto h-auto'>
                <VideoPreview className=' !w-auto !h-auto md:!h-[500px] ' />
            </div>
            <div className='flex flex-col justify-center items-center gap-2 mt-4'>
                <DeviceSettings />
                <div className='m-auto flex content-center'>
                    <Switch className="me-2" checked={isMicOn} onCheckedChange={(checked) => setIsMicOn(checked)} />
                    <span >Camera and Mic</span>
                </div>
                <Button onClick={async () => {
                    currrentCall.join();
                    setIsSetupComplete(true)
                }}>Join meeting</Button>
            </div>
        </div>
    )

}

function MeetingEndedScreen({ currentClass }) {
    return (
        <div className=' h-screen flex justify-center items-center my-auto'>

            <p className="text-xl">Class Ended</p>
        </div>
    )
}
function UpcomingMeetingScreen({ currentClass }) {
    const currentCall = useCall();
    console.log(currentCall.state.startsAt)
    return (
        <div className=' flex flex-col h-screen justify-center items-center '>

            <p className="text-xl">This meeting has not started yet. It will start on given time

            </p>
            {currentCall.state.custom.description &&
                <p className='mt-5 font-bold'>
                    {currentCall.state.custom?.description}
                </p>

            }
            <Button className="mt-10 " size="sm"> <Link href={"/"}>Go To Homepage</Link> </Button>

        </div>
    )
}


export default MeetingPage

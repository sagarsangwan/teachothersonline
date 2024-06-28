"use client"
import isAuth from '@/lib/isAuth';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/Loader';

import { CallControls, SpeakerLayout, StreamCall, StreamTheme, useStreamVideoClient, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci';
function MeetingPage({ id }) {
    const [call, setCall] = useState(null);
    const [showParticipants, setShowParticipants] = useState(false)
    const client = useStreamVideoClient()
    if (!client) {
        return (<Loader />)
    }
    if (!call) {
        return (
            <Button onClick={async () => {
                console.log(id, "=============")
                const call = client.call("default", id)
                await call.join()
                setCall(call)
            }}>
                Join meeting
            </Button>
        )
    }
    return (
        <div>
            <StreamCall call={call}>
                <StreamTheme className=''>
                    <SpeakerLayout />
                    <div className='flex content-center justify-center'>
                        <CallControls />
                        <div className=' my-auto'>
                            <Button variant="outline" className="ms-2" onClick={() => setShowParticipants((prev) => !prev)} > <CiUser /> </Button>
                        </div>
                    </div>
                </StreamTheme>
            </StreamCall>
        </div>
    )
}

export default isAuth(MeetingPage)

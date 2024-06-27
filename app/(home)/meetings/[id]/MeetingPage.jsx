"use client"
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/Loader';
import { CallControls, SpeakerLayout, StreamCall, StreamTheme, useStreamVideoClient } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

function MeetingPage({ id }) {
    const [call, setCall] = useState(null);
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
                    <CallControls />

                </StreamTheme>
            </StreamCall>
        </div>
    )
}

export default MeetingPage

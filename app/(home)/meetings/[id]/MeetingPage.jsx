"use client"
import isAuth from '@/lib/isAuth';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/Loader';
import {
    CallControls, SpeakerLayout, StreamCall, StreamTheme, useStreamVideoClient, useCallStateHooks, Call,
} from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import useLoadCall from '@/hooks/useLoadCall';
import { useSession } from 'next-auth/react';
function MeetingPage({ id }) {
    const { data: session, status } = useSession()
    const { call, callLoading } = useLoadCall(id)
    if (!callLoading || status === "loading") {
        return (<Loader />)
    }
    if (!call) {
        return (
            <div className=' h-screen flex justify-center items-center my-auto'>

                <p className="text-xl">Class not Found</p>
            </div>
        )
    }
    const notAllowedToJoin = call.type === "default" && (!session.user || !call.state.member.find((m) => m.user.id === session.user.id))

    if (notAllowedToJoin) {
        return (
            <div className=' h-screen flex justify-center items-center my-auto'>

                <p className="text-xl">You are not allowed to join</p>
            </div>
        )
    }
    return (
        <div>
            <StreamCall call={call}>
                <StreamTheme className=''>

                    <SpeakerLayout />
                    <div className='flex content-center justify-center'>
                        <CallControls />
                        {/* <MyCallUI /> */}

                    </div>
                </StreamTheme>
            </StreamCall>
        </div>
    )
}

export default isAuth(MeetingPage)

"use client"
import React from 'react'
import {
    hasAudio,
    hasVideo,
    hasScreenShare,
    hasScreenShareAudio,
    isPinned,
    useCallStateHooks,
    CallingState,
} from '@stream-io/video-react-sdk';
import { CiUser } from 'react-icons/ci';
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/Loader';
import FlexibleCallLayout from './FlexibleCallLayout';
function MyCallUI({ currentClassId }) {
    const { useParticipants, useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState()

    if (callingState !== CallingState.JOINED) {
        return <Loader />
    }
    return (
        <div >
            <FlexibleCallLayout currentClassId={currentClassId} />
        </div>
    )
}

export default MyCallUI

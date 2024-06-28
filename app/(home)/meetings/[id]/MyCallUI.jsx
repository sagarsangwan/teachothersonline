"use client"
import React from 'react'
import {
    hasAudio,
    hasVideo,
    hasScreenShare,
    hasScreenShareAudio,
    isPinned,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { CiUser } from 'react-icons/ci';
import { Button } from '@/components/ui/button'
function MyCallUI() {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();
    const [showParticipants, setShowParticipants] = React.useState(false);
    console.log(participants)

    return (
        <div className=' my-auto'>


            <Button variant="outline" className="ms-2" onClick={() => setShowParticipants((prev) => !prev)} > <CiUser /> </Button>
        </div>
    )
}

export default MyCallUI

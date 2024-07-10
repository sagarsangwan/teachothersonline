import { Button } from '@/components/ui/button'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'

function EndCallButton() {
    const currentCall = useCall()
    const { useLocalParticipant, } = useCallStateHooks()
    const localParticipant = useLocalParticipant()
    const participantIsCallOwner = localParticipant && localParticipant.userId === currentCall.state.createdBy.id

    if (!participantIsCallOwner) {
        return null;
    }
    return (
        <Button size="sm" variant="destructive" onClick={currentCall.endCall} > end call for everyone</Button>
    )
}

export default EndCallButton

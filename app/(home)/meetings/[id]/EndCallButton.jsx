import { Button } from '@/components/ui/button'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function EndCallButton({ currentClassId }) {
    const currentCall = useCall()
    const { useLocalParticipant, } = useCallStateHooks()
    const localParticipant = useLocalParticipant()
    const participantIsCallOwner = localParticipant && localParticipant.userId === currentCall.state.createdBy.id
    const router = useRouter()
    if (!participantIsCallOwner) {
        return null;
    }
    async function CallEndHandler(currentClassId) {
        const completed = true

        const endTime = new Date()
        try {
            // setLoading(true)
            const response = await fetch(`/api/teacher/end-class/${currentClassId}`, {
                method: "PUT",
                body: JSON.stringify({ completed, endTime })


            })
            const res = await response.json()
            if (res.status === 200) {
                toast.success(res.message)
                currentCall.endCall()
                // setLoading(false)
                router.push("/")

            }
            else {
                toast.error(res.message)
                // setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
        // finally {

        // }


        // currentCall.endCall

    }
    return (
        <Button size="sm" variant="destructive" onClick={() => (CallEndHandler(currentClassId))} > end call for everyone</Button>
    )
}

export default EndCallButton

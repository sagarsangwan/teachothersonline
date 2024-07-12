import { Button } from '@/components/ui/button'
import { CallControls, PaginatedGridLayout, SpeakerLayout, useCall } from '@stream-io/video-react-sdk'
import { BetweenHorizonalEndIcon, Grid } from 'lucide-react'
import React, { useState } from 'react'
import EndCallButton from './EndCallButton'
import { useRouter } from 'next/navigation'

function FlexibleCallLayout() {
    const [layout, setLayout] = useState("speaker-vert")
    const call = useCall()
    const router = useRouter()
    return (
        <div className='space-y-3'>
            {/* <CallLayoutButtons layout={layout} setLayout={setLayout} /> */}
            <CallLayoutView layout={layout} className="!w-auto !h-auto md:!h-[500px]" />

            <CallControls onLeave={() => router.push(`/meetings/${call.id}/left`)} />
            <div className='flex justify-center text-center content-center'>
                <EndCallButton />
            </div>
        </div>
    )
}

function CallLayoutButtons({ layout, setLayout }) {
    return (
        <div className='mx-auto w-fit space-x-6'>
            <Button variant={layout !== "speaker-vert" ? "outline" : "default"} size="sm" onClick={() => setLayout("speaker-vert")}> <BetweenHorizonalEndIcon /> </Button>
            <Button variant={layout !== "speaker-horiz" ? "outline" : "default"} size="sm" onClick={() => setLayout("speaker-horiz")}> <BetweenHorizonalEndIcon /> </Button>
            {/* <Button variant={layout !== "grid" ? "outline" : "default"} size="sm" onClick={() => setLayout("grid")}> <Grid /> </Button> */}
        </div>
    )
}

function CallLayoutView({ layout }) {
    if (layout === "speaker-vert") {
        return <SpeakerLayout />
    }
    if (layout === "grid") {
        return <PaginatedGridLayout />
    }
    if (layout === "speaker-horiz") {
        return <SpeakerLayout participantsBarPosition='right' />
    }
    return
}

export default FlexibleCallLayout

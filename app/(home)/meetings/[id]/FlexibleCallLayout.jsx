import { Button } from '@/components/ui/button'
import { CallControls, PaginatedGridLayout, SpeakerLayout, useCall } from '@stream-io/video-react-sdk'
import { BetweenHorizonalEndIcon, Grid } from 'lucide-react'
import React, { useState } from 'react'
import EndCallButton from './EndCallButton'

function FlexibleCallLayout() {
    const [layout, setLayout] = useState("speaker-vert")
    const call = useCall()

    return (
        <div className='space-y-3'>
            <CallLayoutButtons layout={layout} setLayout={setLayout} />
            <CallLayoutView layout={layout} />
            <CallControls />
            <EndCallButton />
        </div>
    )
}

function CallLayoutButtons({ layout, setLayout }) {
    return (
        <div className='mx-auto w-fit space-x-6'>
            <Button variant={layout !== "speaker-vert" ? "outline" : "default"} size="sm" onClick={() => setLayout("speaker-vert")}> <BetweenHorizonalEndIcon /> </Button>
            <Button variant={layout !== "speaker-horiz" ? "outline" : "default"} size="sm" onClick={() => setLayout("speaker-horiz")}> <BetweenHorizonalEndIcon /> </Button>
            <Button variant={layout !== "grid" ? "outline" : "default"} size="sm" onClick={() => setLayout("grid")}> <Grid /> </Button>
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

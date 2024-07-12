import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page({ params }) {
    const meetingId = params.id
    return (
        <div className='h-screen flex flex-col items-center justify-center '>
            <div>
                You left the meeting

            </div>
            <Button className="mt-4">
                <Link href={`/meetings/${meetingId}`}>Rejoin </Link>
            </Button>
        </div>
    )
}

export default page

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'



export default async function page({ params }) {
    const { id: meetingId } = await params;
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

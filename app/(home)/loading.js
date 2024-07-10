import React from 'react'
import { Loader } from 'lucide-react'
function loading() {
    return (
        <div className='flex justify-center items-center h-screen mx-auto'>
            <Loader className='animate-ping' />
        </div>
    )
}

export default loading
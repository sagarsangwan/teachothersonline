import React from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
function Loader() {
    return (
        <div>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>
    )
}

export default Loader

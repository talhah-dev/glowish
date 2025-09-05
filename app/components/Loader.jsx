import { Spinner } from '@nextui-org/react'
import React from 'react'

const Loader = () => {
    return (
        <div className='fixed w-full z-50 h-screen top-0 left-0 bg-white flex items-center justify-center'>
            <Spinner classNames={"text-black"} color='default' label="Loading..." variant="dots" />
        </div>
    )
}

export default Loader
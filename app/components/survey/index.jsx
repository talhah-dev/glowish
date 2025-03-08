"use client"
import { POLL_DATA } from '@/app/mock/Survey/PollVote';
import React, { useState } from 'react'
import Votes from './Votes';
import { Button } from '@nextui-org/react';

export const metadata = {
    title: "Glowist - Survay",
};

const Survey = () => {
    const [showMore, setShowMore] = useState(12)

    const handleShowMore = () => {
        setShowMore(prev => prev + 6)
    }
    return (
        <>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3 mt-8'>
                {
                    POLL_DATA.slice(0, showMore).map((data) => (
                        <Votes key={data.id} data={data} />
                    ))
                }
            </div>


            {showMore < POLL_DATA.length && (
                <Button
                    color="primary"
                    onClick={handleShowMore}
                    className="hidden md:flex mt-6 justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full bg-gray-900"
                >
                    Show More
                </Button>
            )}
        </>
    )
}

export default Survey
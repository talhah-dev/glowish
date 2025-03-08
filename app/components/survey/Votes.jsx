"use client"
import React, { useState } from 'react'
import { CircleUserRound } from 'lucide-react'
import { Checkbox } from '@nextui-org/react'

const Votes = ({ data }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelect = (idx) => {
        setSelectedIndex(prevIndex => prevIndex === idx ? null : idx);
    };

    return (
        <>
            <div className="border myShadow rounded-md flex flex-col justify-between fadeIn">
                <h2 className="font-semibold text-lg p-5">{data.question}</h2>
                {data.options.map(({ text, votes }, idx) => (
                    <div 
                        key={idx} 
                        className={`cursor-pointer px-5 py-3 transition-all`} 
                        onClick={() => handleSelect(idx)}
                    >
                        <div className="text-sm flex items-center mt-2 justify-between">
                            <Checkbox 
                                color="default" 
                                radius="full"
                                isSelected={selectedIndex === idx}
                                onChange={() => handleSelect(idx)}
                            >
                                {text}
                            </Checkbox>
                            <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                    <CircleUserRound size={18} className='text-gray-800 bg-white rounded-full' />
                                    <CircleUserRound size={18} className='text-gray-800 -ml-2 bg-white rounded-full' />
                                </div>
                                <p>{votes}</p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 rounded-full mt-2 relative">
                            <span
                                className={`h-full block rounded-full bg-zinc-800 transition-all`}
                                style={{ width: `${(votes / 100) * 100}%`, opacity: selectedIndex === idx ? 1 : 0.5 }}
                            ></span>
                        </div>
                    </div>
                ))}
                <button className="mt-7 p-3 transition-all duration-500 hover:bg-gray-100 border-t text-center text-sm">
                    View Votes
                </button>
            </div>
        </>
    );
}

export default Votes;

"use client";
import React, { useState } from "react";
import { CircleUserRound, PlusCircle } from "lucide-react";
import { Checkbox } from "@nextui-org/react";

const MyVotes = ({ data }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelect = (idx) => {
        setSelectedIndex((prevIndex) => (prevIndex === idx ? null : idx));
    };

    // Ensure data and data.options exist before rendering
    if (!data || !data.options) {
        return (
            <div className="text-zinc-600 text-center p-6 bg-gray-50 rounded-lg">
                No poll data available
            </div>
        );
    }

    return (
        <div className="border myShadow rounded-md flex flex-col justify-between fadeIn py-5">
            <h2 className="font-semibold text-lg px-5">{data.question}</h2>
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
                                <CircleUserRound size={18} className="text-gray-800 bg-white rounded-full" />
                                <CircleUserRound size={18} className="text-gray-800 -ml-2 bg-white rounded-full" />
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
        </div>
    );
};

export default MyVotes;
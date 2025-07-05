"use client"
import { POLL_DATA } from '../../../app/mock/Survey/PollVote';
import React, { useState } from 'react'
import Votes from './Votes';
import { Button, DatePicker, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from '@nextui-org/react';
import { ArrowUpRight, SearchIcon } from 'lucide-react';
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

export const metadata = {
    title: "Glowist - Survay",
};

const tags = [
    {
        id: 1,
        label: "All",
    },
    {
        id: 2,
        label: "Wars",
    },
    {
        id: 3,
        label: "Politics",
    },
    {
        id: 4,
        label: "Sports",
    },
    {
        id: 5,
        label: "Entertainment",
    },
    {
        id: 6,
        label: "Technology",
    },
    {
        id: 7,
        label: "Health",
    }
]

const Survey = () => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Active"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
        [selectedKeys],
    );

    const [showMore, setShowMore] = useState(24)

    const handleShowMore = () => {
        setShowMore(prev => prev + 6)
    }

    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const toggleTag = (id) => {
        setSelectedTagIds((prev) =>
            prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
        );
    };

    return (
        <>

            <div className="pt-6">
                <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap items-center overflow-auto md:gap-3 gap-1.5">
                    {tags.map((tag) => {
                        const isSelected = selectedTagIds.includes(tag.id);
                        return (
                            <div
                                key={tag.id}
                                onClick={() => toggleTag(tag.id)}
                                className={`cursor-pointer px-3 py-1.5 rounded-full flex items-center gap-2 text-sm border transition-colors
                ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-black'}
              `}
                            >
                                <span className={isSelected ? 'text-white' : 'text-zinc-600'}><ArrowUpRight size={16} className='text-xs' /></span> {tag.label}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-6">
                {/* <div className="">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[15rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper:
                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />
                </div> */}

                <div className="flex items-center gap-2">

                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="capitalize" variant="flat">
                                {selectedValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Single selection example"
                            selectedKeys={selectedKeys}
                            selectionMode="single"
                            variant="flat"
                            onSelectionChange={setSelectedKeys}
                        >
                            <DropdownItem key="Active">Active</DropdownItem>
                            <DropdownItem key="Not Active">Not Active</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <DatePicker className="max-w-[284px] w-full !pb-0" errorMessage="Please enter a valid date." />
                </div>

            </div>

            <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-3 mt-5'>
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
                    className="flex mt-6 justify-center items-center text-base px-[22px] w-full max-w-[10rem] mx-auto rounded-full bg-gray-900"
                >
                    Show More
                </Button>
            )}
        </>
    )
}

export default Survey
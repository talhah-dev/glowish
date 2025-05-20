"use client"
import { POLL_DATA } from '@/app/mock/Survey/PollVote';
import React, { useState } from 'react'
import Votes from './Votes';
import { Button, DatePicker, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

export const metadata = {
    title: "Glowist - Survay",
};

const Survey = () => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Active"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
        [selectedKeys],
    );

    const [showMore, setShowMore] = useState(12)

    const handleShowMore = () => {
        setShowMore(prev => prev + 6)
    }
    return (
        <>

            <div className="flex items-center justify-between gap-2 mt-6">
                <div className="">
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
                </div>

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

            <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 mt-5'>
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
                    className="flex mt-6 justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full bg-gray-900"
                >
                    Show More
                </Button>
            )}
        </>
    )
}

export default Survey
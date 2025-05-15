"use client"
import React, { useState } from 'react'
import { CircleUserRound } from 'lucide-react'
import {
    Checkbox, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Badge,
} from '@nextui-org/react'
import Link from 'next/link'
import Image from 'next/image'


const Votes = ({ data }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                <Button onPress={onOpen} className="mt-7 p-3.5 transition-all duration-500 rounded-b-md rounded-t-none hover:bg-gray-100 border-t text-center text-sm">
                    View Votes
                </Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className='pb-4'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Voting</ModalHeader>
                            <ModalBody className='max-h-[70vh] h-full overflow-auto'>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <div>
                                            <Link
                                                href="/my-profile"
                                                className="flex 2sm:w-[40px] 2sm:h-[40px] w-[36px] h-[36px] rounded-full me-2"
                                            >
                                                <Image
                                                    height="34"
                                                    width="34"
                                                    src="/assets/images/user-1.png"
                                                    alt="profile image"
                                                    className="w-full h-full rounded-full"
                                                />
                                            </Link>
                                        </div>
                                        <div>
                                            <h4 className="font-matter text-gray-900 2sm:text-base text-sm hover:text-gray-800 font-semibold mb-[1px]">
                                                <Link href="/my-profile">Abdullah Morris</Link>
                                            </h4>
                                            <p className="line-clamp-2 font-matter 2sm:text-sm text-xs text-gray-800">
                                                CEO, Founder
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}

export default Votes;

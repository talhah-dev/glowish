"use client"
import React, { useState } from 'react'
import { CircleUserRound, Heart, MessageCircleMore, Send, ThumbsDown, ThumbsUp } from 'lucide-react'
import {
    Checkbox, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import Image from 'next/image'
import Comments from '../PostCard/Comments'
import forYou from "../../mock/forYou.json";

const cardFooterActions = [
    {
        id: 1,
        label: "Like",
        icon: <ThumbsUp size={18} />,
    },
    {
        id: 2,
        label: "Dislike",
        icon: <ThumbsDown size={18} />,
    },
    {
        id: 3,
        label: "Comment",
        icon: <MessageCircleMore size={18} />,

    },
    {
        id: 4,
        label: "Share",
        icon: <Send size={18} />,
    },
];

const Votes = ({ data }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelect = (idx) => {
        setSelectedIndex(prevIndex => prevIndex === idx ? null : idx);
    };

    const [size, setSize] = React.useState("5xl");

    const handleOpen = () => {
        setSize("5xl");
        onOpen();
    };

    return (
        <>
            <div className="border myShadow rounded-md flex flex-col justify-between fadeIn">
                <div className="flex items-center justify-between pb-1">
                    <p className='text-xs text-zinc-100 p-0.5 rounded-full ml-1.5 px-2 bg-[#17c964]'>Active</p>
                    <p className='text-xs text-zinc-400 p-2'>5/16/2025</p>
                </div>
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
                <div className="flex items-center justify-center mt-3 p-2 gap-4">
                    {cardFooterActions.map((action) => (
                        <Button
                            key={action.id}
                            isIconOnly
                            variant="light"
                            radius="full"
                            className="h-[34px] w-[34px] min-w-[34px] bg-gray-500 text-gray-800 hover:text-white hover:!bg-black"
                            aria-label={action.label}
                            onClick={() => {
                                if (action.label === "Share") {
                                    // setShowSendOptions(!showSendOptions);
                                } else if (action.label === "Comment") {
                                    // handleOpen()
                                }
                            }}
                        >
                            {action.icon}
                        </Button>
                    ))}
                </div>
                <Button onPress={onOpen} className="p-3.5 transition-all duration-500 rounded-t-none mt-2 rounded-b-md hover:bg-gray-100 border-t text-center text-sm">
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

            {/* comments */}

            {/* <Modal isOpen={isOpen} size={size} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className="flex md:flex-row flex-col md:h-[80vh]">
                                <div className="md:max-w-[50%] h-full flex items-center justify-center w-full">
                                    <Image className="w-full md:h-[80vh] object-cover rounded-none"  src="assets/images/image-1.png" />
                                </div>
                                <div className="md:max-w-[50%] w-full">
                                    <Comments post={forYou} />
                                </div>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal> */}
        </>
    );
}

export default Votes;

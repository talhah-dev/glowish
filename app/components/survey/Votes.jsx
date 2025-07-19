"use client";
import React, { useState } from "react";
import { ArrowUpRight, Bookmark, CircleUserRound, Facebook, Hash, Heart, Instagram, MessageCircleMore, PlusCircle, Send, ThumbsDown, ThumbsUp, Twitter } from "lucide-react";
import {
    Checkbox,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import SurveyComments from "./SurveyComments";
import forYou from "../../mock/forYou.json";
import { IoInformationCircleOutline } from "react-icons/io5";

const tags = [
    {
        id: 1,
        label: "Current",
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

const cardFooterActions = [
    {
        id: 1,
        label: "Like",
        icon: <ThumbsUp size={18} />,
        num: 34
    },
    {
        id: 2,
        label: "Dislike",
        icon: <ThumbsDown size={18} />,
        num: 22
    },
    {
        id: 3,
        label: "Comment",
        icon: <MessageCircleMore size={18} />,
        num: 89
    },
    {
        id: 4,
        label: "Share",
        icon: <Send size={18} />,
        num: 54
    },
];

const Votes = ({ data }) => {
    // Separate disclosure hooks for each modal
    const votesModal = useDisclosure();
    const commentsModal = useDisclosure();

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelect = (idx) => {
        setSelectedIndex((prevIndex) => (prevIndex === idx ? null : idx));
    };

    const [bookmark, setBookmark] = useState(false);

    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const toggleTag = (id) => {
        setSelectedTagIds((prev) =>
            prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
        );
    };

    // share

    const [isShareOpen, setIsShareOpen] = useState(false);

    const socialNetworks = [
        { id: 1, name: "Twitter", icon: <Twitter />, url: "https://twitter.com/intent/tweet" },
        { id: 2, name: "Facebook", icon: <Facebook />, url: "https://www.facebook.com/sharer/sharer.php" },
        { id: 3, name: "LinkedIn", icon: <Instagram />, url: "https://www.linkedin.com/shareArticle" },
    ];

    const handleShare = (url) => {
        window.open(url, "_blank");
        setIsShareOpen(false);
    };

    // info icon

    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <div className="border myShadow rounded-md flex flex-col justify-between fadeIn">
                <div className="flex items-center justify-between pb-1">
                    <p className="text-xs rounded-full ml-1.5 text-[#17c964] flex items-center gap-1">
                        <PlusCircle size={16} />
                    </p>
                    <div className="flex items- center gap-1 p-2">

                        <div className="md:hidden flex flex-col gap-2">
                            <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                                <PopoverTrigger>
                                    <span tabIndex="0" className="inline-block">
                                        <IoInformationCircleOutline className="text-zinc-600" />
                                    </span>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="">
                                        <div className="text-sm">This poll expired on 5/16/2025</div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="md:block hidden">
                            <Tooltip className="" content="This poll expired on 5/16/2025">
                                <span tabIndex="0" className="inline-block">
                                    <IoInformationCircleOutline className="text-zinc-600" />
                                </span>
                            </Tooltip>
                        </div>

                        <p className="text-xs text-zinc-400 md:mt-0.5">5/16/2025</p>
                    </div>
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
                <Button
                    onPress={votesModal.onOpen}
                    className="p-3.5 transition-all duration-500 w-full max-w-[90%] mx-auto mt-5 mb-4 rounded-lg hover:bg-gray-100 border-t text-center text-sm"
                >
                    View Votes
                </Button>
                <div className="pl-3 mb-3">
                    <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap items-center overflow-auto gap-1.5">
                        {tags.map((tag) => {
                            const isSelected = selectedTagIds.includes(tag.id);
                            return (
                                <div
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.id)}
                                    className={`cursor-pointer px-2 py-1 rounded-full flex items-center text-xs border transition-colors bg-gray-100 text-black`}
                                >
                                    <span className={'text-zinc-600'}><Hash size={12} className='text-xs' /></span> {tag.label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between w-full mb-3 p-3 gap-4">
                    <div className="flex items-center gap-4">
                        {cardFooterActions.map((action) => (
                            <div key={action.id} className="flex flex-col items-center justify-center gap-1">
                                {action.label === "Share" ? (
                                    <Popover
                                        placement="top"
                                        isOpen={isShareOpen}
                                        onOpenChange={(open) => setIsShareOpen(open)}
                                    >
                                        <PopoverTrigger>
                                            <Button
                                                isIconOnly
                                                variant="light"
                                                radius="full"
                                                className="h-[34px] w-[34px] min-w-[34px] bg-gray-500 text-gray-800 hover:text-white hover:!bg-black"
                                                aria-label={action.label}
                                            >
                                                {action.icon}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="px-1 py-2">
                                                <div className="text-sm text-zinc-700 font-bold mb-2">Share to</div>
                                                <div className="flex flex-col gap-2">
                                                    {socialNetworks.map((network) => (
                                                        <Button
                                                            key={network.id}
                                                            variant="light"
                                                            className="w-full text-gray-600 justify-start"
                                                            onPress={() => handleShare(network.url)}
                                                        >
                                                            {network.icon}
                                                            <span className="ml-2">{network.name}</span>
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                ) : (
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        radius="full"
                                        className="h-[34px] w-[34px] min-w-[34px] bg-gray-500 text-gray-800 hover:text-white hover:!bg-black"
                                        aria-label={action.label}
                                        onPress={() => {
                                            if (action.label === "Comment") {
                                                commentsModal.onOpen();
                                            }
                                        }}
                                    >
                                        {action.icon}
                                    </Button>
                                )}
                                <p className="text-xs text-zinc-600 font-medium">
                                    {action.num}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Bookmark
                        onClick={() => setBookmark(!bookmark)}
                        className={`${bookmark && "fill-gray-800"} text-gray-800 md:ml-7 transition-all duration-500 cursor-pointer`}
                    />
                </div>

            </div>

            {/* Votes Modal */}
            <Modal isOpen={votesModal.isOpen} onOpenChange={votesModal.onOpenChange}>
                <ModalContent className="pb-4">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Voting</ModalHeader>
                            <ModalBody className="max-h-[70vh] h-full overflow-auto">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <div>
                                            <Link
                                                href="/my-profile"
                                                className="flex 2sm:w-[40px] 2sm:h-[40px] w-[36px] h-[36px] rounded-full me-2"
                                            >
                                                <Image
                                                    height={34}
                                                    width={34}
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

            {/* Comments Modal */}
            <Modal isOpen={commentsModal.isOpen} size="3xl" onOpenChange={commentsModal.onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <div className="flex md:flex-row flex-col md:h-[80vh]">
                                <div className="w-full">
                                    <SurveyComments post={forYou} />
                                </div>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Votes;
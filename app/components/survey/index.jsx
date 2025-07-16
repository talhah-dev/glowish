"use client";
import { POLL_DATA } from "../../../app/mock/Survey/PollVote";
import React, { useState, useMemo, useContext } from "react";
import Votes from "./Votes";
import {
    Button,
    DatePicker,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Input,
} from "@nextui-org/react";
import { ArrowUpRight, Hash, SearchIcon } from "lucide-react";
import { AiOutlineBars } from "react-icons/ai";
import { parseDate } from "@internationalized/date"; // For DatePicker parsing
import { IoGridOutline } from "react-icons/io5";
import { BsGrid3X3Gap } from "react-icons/bs";
import { CiGrid2V } from "react-icons/ci";
import { TabContext } from "../../providers";

export const metadata = {
    title: "Glowist - Survey",
};

const tags = [
    { id: 1, label: "All" },
    { id: 2, label: "Wars" },
    { id: 3, label: "Politics" },
    { id: 4, label: "Sports" },
    { id: 5, label: "Entertainment" },
    { id: 6, label: "Technology" },
    { id: 7, label: "Health" },
];

const Survey = () => {
    // State for Active/Expired filter
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Active"]));
    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
        [selectedKeys],
    );

    const { activeTab, setActiveTab } = useContext(TabContext);

    // State for date filters
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [gridView, setGridView] = useState("compact");

    // State for tags and show more
    const [showMore, setShowMore] = useState(24);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const toggleTag = (id) => {
        setSelectedTagIds((prev) =>
            prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id],
        );
    };

    const handleShowMore = () => {
        setShowMore((prev) => prev + 6);
    };

    // Filter POLL_DATA based on status and date range
    const filteredPolls = useMemo(() => {
        return POLL_DATA.filter((poll) => {
            const isActiveSelected = selectedKeys.has("Active");
            const isExpiredSelected = selectedKeys.has("Expired");
            const pollDate = new Date(poll.date); // Assuming POLL_DATA has a 'date' field
            const today = new Date();

            // Status filter
            const matchesStatus =
                (isActiveSelected && pollDate >= today) ||
                (isExpiredSelected && pollDate < today) ||
                (!isActiveSelected && !isExpiredSelected); // Show all if no status selected

            // Date filter
            const matchesDate =
                (!startDate || new Date(poll.date) >= new Date(startDate)) &&
                (!endDate || new Date(poll.date) <= new Date(endDate));

            // Tag filter (assuming POLL_DATA has a 'tags' array)
            const matchesTags =
                selectedTagIds.length === 0 ||
                selectedTagIds.includes(1) || // 'All' tag
                poll.tags?.some((tag) => selectedTagIds.includes(tag.id));

            return matchesStatus && matchesDate && matchesTags;
        });
    }, [selectedKeys, startDate, endDate, selectedTagIds]);

    return (
        <>
            <div className="pt-6">
                <div className="flex items-center justify-between w-full gap-10">
                    <div className="flex items-center overflow-x-auto scrollbar-hide whitespace-nowrap overflow-auto md:gap-3 gap-1.5">
                        {tags.map((tag) => {
                            const isSelected = selectedTagIds.includes(tag.id);
                            return (
                                <div
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.id)}
                                    className={`cursor-pointer px-3 py-1.5 flex items-center gap-1 rounded-full text-sm border transition-colors
                            ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-black'}
                              `}
                                >
                                    <span className={isSelected ? 'text-white' : 'text-zinc-600'}><Hash size={15} className='text-xs' /></span> {tag.label}
                                </div>
                            );
                        })}
                    </div>
                    <div className="md:flex hidden items-center gap-3">
                        <CiGrid2V
                            onClick={() => setGridView('vertical')}
                            size={25}
                            className={`text-gray-900 hover:opacity-55 duration-500 transition-all cursor-pointer ${gridView === 'vertical' ? 'opacity-100' : 'opacity-55'}`}
                        />
                        <IoGridOutline
                            onClick={() => setGridView('standard')}
                            size={22}
                            className={`text-gray-900 hover:opacity-55 duration-500 transition-all cursor-pointer ${gridView === 'standard' ? 'opacity-100' : 'opacity-55'}`}
                        />
                        <BsGrid3X3Gap
                            onClick={() => setGridView('compact')}
                            size={22}
                            className={`text-gray-900 hover:opacity-55 duration-500 transition-all cursor-pointer ${gridView === 'compact' ? 'opacity-100' : 'opacity-55'}`}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-10">
                <div className="flex justify-between items-center gap-2 w-full">

                    <h2 className="text-xl md:text-3xl font-semibold text-zinc-900">{activeTab.title} Surveys</h2>

                    <div className="flex flex-col gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="flat" className="min-w-10">
                                    <AiOutlineBars className="text-xl" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Filters"
                                variant="flat"
                                closeOnSelect={false} // Keep dropdown open for date pickers
                            >
                                <DropdownItem
                                    key="status"
                                    textValue="Status Filter"
                                    className="flex flex-col gap-2 hover:!bg-white"
                                >
                                    <Dropdown
                                        classNames={{ content: "min-w-[150px]" }}
                                        placement="bottom-start"

                                    >
                                        <DropdownTrigger >
                                            <Button variant="flat" >
                                                Status: {selectedValue || "Select"}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="Status selection"
                                            selectedKeys={selectedKeys}
                                            selectionMode="single"
                                            variant="flat"
                                            onSelectionChange={setSelectedKeys}
                                        >
                                            <DropdownItem key="Active">Active</DropdownItem>
                                            <DropdownItem key="Expired">Expired</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>
                                <DropdownItem className="hover:!bg-white" key="start-date" textValue="Start Date">
                                    <DatePicker
                                        className="sm:max-w-[284px] w-full"
                                        label="Start date"
                                        value={startDate}
                                        onChange={setStartDate}
                                    />
                                </DropdownItem>
                                <DropdownItem className="hover:!bg-white" key="end-date" textValue="End Date">
                                    <DatePicker
                                        className="sm:max-w-[284px] w-full"
                                        label="End date"
                                        value={endDate}
                                        onChange={setEndDate}
                                    />
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className={`grid ${gridView === 'vertical' ? 'lg:grid-cols-2 grid-cols-1' :
                gridView === 'standard' ? 'lg:grid-cols-3 grid-cols-1' :
                    'lg:grid-cols-4 grid-cols-1'
                } gap-3 mt-5`}>
                {POLL_DATA.slice(0, showMore).map((data) => (
                    <Votes key={data.id} data={data} />
                ))}
            </div>

            {showMore < filteredPolls.length && (
                <Button
                    color="primary"
                    onClick={handleShowMore}
                    className="flex mt-6 justify-center items-center text-base px-[22px] w-full max-w-[10rem] mx-auto rounded-full bg-gray-900"
                >
                    Show More
                </Button>
            )}
        </>
    );
};

export default Survey;
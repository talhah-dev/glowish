"use client";
import React from "react";
import LayoutWithSidebar from "../LayoutWithSidebar";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Ellipsis } from "lucide-react";

const bookmarkItems = [
  {
    id: 1,
    title: "Champions Again: India's Glorious World Cup Victory!",
    postImage: "/assets/images/tag-1.png",
    author: "Alexis Sanon",
    authorImage: "/assets/images/user-14.png",
  },
  {
    id: 2,
    title: "AI Technology Effect on Human Life",
    postImage: "/assets/images/tag-4.png",
    author: "Marcelo Santana",
    authorImage: "/assets/images/user-1.png",
  },
  {
    id: 3,
    title: "Home Horizons: Navigating the Real Estate Landscape",
    postImage: "/assets/images/tag-3.png",
    author: "Leo Ransome",
    authorImage: "/assets/images/user-2.png",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Mastering Productivity in 2024",
    postImage: "/assets/images/tag-2.png",
    author: "Harold Pham",
    authorImage: "/assets/images/user-4.png",
  },
  {
    id: 5,
    title: "10 Proven Strategies to Skyrocket Your Online Business",
    postImage: "/assets/images/tag-7.png",
    author: "Aleena Watts",
    authorImage: "/assets/images/user-6.png",
  },
  {
    id: 6,
    title: "The Best Travel Destinations You Can't Miss This Year",
    postImage: "/assets/images/tag-6.png",
    author: "Marcelo Santana",
    authorImage: "/assets/images/user-7.png",
  },
  {
    id: 7,
    title: "The Rise of Robotics: How Automation is Shaping Our Future",
    postImage: "/assets/images/tag-8.png",
    author: "Stacy Pham",
    authorImage: "/assets/images/user-6.png",
  },
];

const menuItems = [
  {
    key: "delete",
    label: "Delete",
  },
  {
    key: "repost",
    label: "Report",
  },
];

const Bookmarks = () => {
  return (
    <LayoutWithSidebar>
      <h2 className="font-matter font-semibold sm:text-3xl 2sm:text-2xl text-[22px] sm:my-[20px] mb-[15px] mt-2">
        Bookmarks
      </h2>
      <div className="bookmark-grid grid md:grid-cols-2 gap-5">
        {bookmarkItems.map((item) => (
          <BookmarkedPost item={item} />
        ))}
      </div>
    </LayoutWithSidebar>
  );
};

const BookmarkedPost = ({ item }) => {
  return (
    <div
      key={item.id}
      className="bookmark-item flex border border-gray-500 bg-[#f8f8f8]"
    >
      <Link
        href={`/single-blog/${item.id}`}
        className="w-full max-w-[220px] h-[140px]"
      >
        <Image
          width="260"
          height="180"
          src={item.postImage}
          alt="image"
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="md:px-5 px-4 py-3 w-full flex flex-wrap content-between">
        <div className="flex items-center mt-1">
          <Link
            href={`/author-profile/${item.id}`}
            className="flex 2sm:w-[20px] 2sm:h-[20px] w-[16px] h-[16px] rounded-full overflow-hidden me-[5px]"
          >
            <Image
              height="18"
              width="18"
              src={item.authorImage}
              alt="user"
              className="w-full h-full"
            />
          </Link>
          <div className="flex items-center">
            <p className="font-matter 2sm:text-sm text-xs text-gray-900 hover:text-gray-800">
              <Link href={`/author-profile/${item.id}`}>{item.author}</Link>
            </p>
          </div>
        </div>
        <h3 className="font-matter font-semibold sm:text-base text-sm text-gray-900 hover:text-gray-800 line-clamp-2 overflow-hidden">
          <Link href={`/single-blog/${item.id}`}>{item.title}</Link>
        </h3>
        <div className="w-full flex justify-between items-center">
          <Link href="/">
            <Bookmark fill="#000" size={16} />
          </Link>
          <div className="relative flex">
            <Dropdown placement="bottom-end" className="min-w-[150px]">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  aria-label="More"
                  className="!min-w-6 !h-6 w-full"
                >
                  <Ellipsis size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={menuItems}>
                {(item) => (
                  <DropdownItem key={item.key} color="default">
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;

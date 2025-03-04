"use client";
import React from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: 0,
    key: "user",
    label: "user",
    icon: "",
  },
  {
    id: 1,
    key: "writepost",
    label: "Write Post",
    icon: "/assets/images/write-post.svg",
    link: "/write-post",
  },
  {
    id: 2,
    key: "myprofile",
    label: "My Profile",
    icon: "/assets/images/profile.svg",
    link: "/my-profile",
  },
  {
    id: 3,
    key: "createadd",
    label: "Create Add",
    icon: "/assets/images/create-add.svg",
  },
  {
    id: 4,
    key: "myposts",
    label: "My Posts",
    icon: "/assets/images/my-posts.svg",
    link: "/published-post",
  },
  {
    id: 5,
    key: "bookmarks",
    label: "Bookmarks",
    icon: "/assets/images/bookmark.svg",
    link: "/bookmarks",
  },
  {
    id: 6,
    key: "helpcenter",
    label: "Help Center",
    icon: "/assets/images/help.svg",
    link: "/about",
  },
  {
    id: 7,
    key: "signout",
    label: "Sign Out",
    icon: "/assets/images/signout.svg",
    link: "/login",
  },
];

const ProfileDropdown = () => {
  return (
    <Dropdown
      placement="bottom-start"
      className="p-0 rounded-lg overflow-hidden"
    >
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform h-[28px] w-[28px]"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="/assets/images/user-1.png"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className="p-0"
        classNames={{ list: "gap-0" }}
        items={items}
      >
        {(item) =>
          item.id === 0 ? (
            <DropdownItem
              isReadOnly
              key="profile"
              className="flex items-center rounded-none 2sm:py-4 py-3 2sm:px-5 px-4 h-20 gap-2 cursor-default"
            >
              <div className="flex">
                <div>
                  <Link
                    href="/my-profile"
                    className="flex 2sm:w-[40px] 2sm:h-[40px] w-[36px] h-[36px] rounded-full me-2"
                  >
                    <Badge
                      content=""
                      color="success"
                      shape="circle"
                      placement="bottom-right"
                    >
                      <Image
                        height="34"
                        width="34"
                        src="/assets/images/user-1.png"
                        alt="profile image"
                        className="w-full h-full rounded-full"
                      />
                    </Badge>
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
            </DropdownItem>
          ) : (
            <DropdownItem
              key={item.key}
              startContent={<Image src={item.icon} alt="icon" height={20} width={20} />}
              className="flex items-center rounded-none 2sm:text-base text-sm text-gray-900 2sm:py-4 py-3 2sm:px-5 px-4 border-t border-gray-400 hover:!bg-[#fafafa]"
              href={item.link}
            >
              {item.label}
            </DropdownItem>
          )
        }
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;

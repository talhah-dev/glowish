"use client";
import React from "react";
import {
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tabs,
  Tab,
  Listbox,
  ListboxItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    key: "writepost",
    profileImage: "/assets/images/user-10.png",
    name: "Damira Roman",
    link: "#",
    description: "published post - 10:03 AM",
    featuredImage: "/assets/images/not-1.png",
  },
  {
    id: 2,
    key: "myprofile",
    profileImage: "/assets/images/user-11.png",
    name: "Harold Pham",
    link: "#",
    description: "Started following you - 5:00 AM",
    showFollowBtn: true,
  },
  {
    id: 3,
    key: "createadd",
    profileImage: "/assets/images/user-12.png",
    name: "Mina Machain",
    link: "#",
    description: "Commented on your post: Economy - 6:45 PM",
    featuredImage: "/assets/images/not-1.png",
  },
  {
    id: 4,
    key: "myposts",
    profileImage: "/assets/images/user-2.png",
    name: "Pedro Baker",
    link: "#",
    description: "Wants to edit the file blackbite - 09:52 AM",
    acceptDenyBtns: true,
  },
  {
    id: 5,
    key: "bookmarks",
    profileImage: "/assets/images/user-12.png",
    name: "Aleena Watts",
    link: "#",
    description: "Liked your post - 07:15 AM",
    featuredImage: "/assets/images/not-1.png",
  },
];

const List = ({ data }) => {
  return (
    <Listbox
      items={data}
      aria-label="Notification List"
      className="p-0"
      classNames={{ list: "gap-0 max-h-[500px] overflow-auto" }}
    >
      {(item) => (
        <ListboxItem
          key={item.key}
          className={`rounded-none hover:!bg-[#f9f9f9] ${
            item.id !== 0 ? "border-t border-gray-400" : ""
          } sm:p-4 p-3`}
        >
          <div className="flex items-start justify-between">
            <div className="flex">
              {/* <Link
                href={item.link}
                className="flex mt-1 w-full sm:max-w-[34px] sm:h-[34px] max-w-[30px] h-[30px] rounded-full overflow-hidden me-[10px]"
              >
                <Avatar src={item.profileImage} size="sm" />
              </Link> */}
              <div>
                <h5 className="font-matter sm:text-base text-sm text-gray-900 hover:text-gray-800 font-semibold mb-[1px]">
                  <a href="javascript:;">{item.name}</a>
                </h5>
                <p className="line-clamp-2 font-matter sm:text-sm text-xs text-gray-800">
                  {item.description}
                </p>
                {/* {item.acceptDenyBtns && (
                  <div className="mt-2 flex gap-2 items-center">
                    <Button className="bg-black text-white h-9" radius="full">
                      Accept
                    </Button>
                    <Button
                      className="bg-gray-500 text-black hover:bg-black hover:text-white h-9"
                      radius="full"
                    >
                      Deny
                    </Button>
                  </div>
                )} */}
              </div>
            </div>
            {/* {item.showFollowBtn && (
              <Button
                className="bg-gray-500 text-black hover:bg-black hover:text-white h-9"
                radius="full"
              >
                Follow
              </Button>
            )} */}
            {/* {item.featuredImage && (
              <div className="sm:max-w-[90px] w-full sm:h-[65px] max-w-[70px] h-[50px] ms-4">
                <Image
                  width="90"
                  height="65"
                  src={item.featuredImage}
                  alt="featured image"
                  className="w-full h-full object-cover"
                />
              </div>
            )} */}
          </div>
        </ListboxItem>
      )}
    </Listbox>
  );
};

const tabs = [
  {
    id: "notification",
    label: "Notification",
    content: <List data={notifications} badge={notifications.length} />,
    badge: 5,
  },
  // {
  //   id: "messages",
  //   label: "Messages",
  //   content: <List data={notifications} />,
  // },
];

const NotificationSection = () => {
  return (
    <>
      <Popover placement="bottom-start" className="p-0 rounded-lg">
        <PopoverTrigger className="flex items-center justify-center h-7 w-7 rounded-full">
          <div>
            <Badge
              content="5"
              color="primary"
              className="bg-[#f00] text-xs border-none h-4 w-4 min-w-4 min-h-4 top-[15%] right-[15%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18.7501 9.71V9.005C18.7501 5.136 15.7261 2 12.0001 2C8.27406 2 5.25006 5.136 5.25006 9.005V9.71C5.25127 10.5516 5.01111 11.3758 4.55806 12.085L3.45006 13.81C2.43906 15.385 3.21106 17.526 4.97006 18.024C9.56617 19.327 14.434 19.327 19.0301 18.024C20.7891 17.526 21.5611 15.385 20.5501 13.811L19.4421 12.086C18.9887 11.3769 18.7482 10.5527 18.7491 9.711L18.7501 9.71Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.5 19C8.155 20.748 9.922 22 12 22C14.078 22 15.845 20.748 16.5 19"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Badge>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full 2sm:min-w-[380px] 2sm:max-w-[380px] min-w-[280px] max-w-[280px] border border-gray-400 bg-white rounded-lg shadow-lg overflow-hidden">
          <Tabs
            aria-label="Dynamic tabs"
            variant="underlined"
            items={tabs}
            className="w-full border-b border-gray-300"
            classNames={{
              tabList: "w-full p-0 gap-0",
              cursor: "w-full",
              tab: "2sm:text-base text-sm px-4 py-2 text-gray-900 flex items-center justify-center h-10",
            }}
          >
            {(item) => (
              <Tab
                key={item.id}
                title={
                  item.badge ? (
                    <div className="flex items-center gap-1">
                      {item.label}{" "}
                      <span className="flex items-center justify-center font-matter text-xs w-4 h-4 rounded-full bg-[#FF0000] text-white">
                        {item.badge}
                      </span>
                    </div>
                  ) : (
                    item.label
                  )
                }
                className="w-full p-0"
              >
                {item.content}
              </Tab>
            )}
          </Tabs>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationSection;

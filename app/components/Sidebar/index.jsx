"use client";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import React, { useContext } from "react";
import sidebarData from "./sidebarData";
import { ChevronDown, Dot, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarContext, SmallScreenContext } from "@/app/providers";

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const { isSmallScreen } = useContext(SmallScreenContext);


  return (
    <div
      id="navbar"
      className={`flex flex-col w-[250px] h-[calc(100vh-56px)] 2sm:h-[calc(100vh-60px)] md:h-[calc(100vh-73px)] border-r transition-transform bg-white fixed z-50 bottom-0 ${isSidebarOpen ? "" : "-translate-x-full"
        }`}
    >

      <div className="text-2xl px-3 pt-3 text-gray-800 lg:hidden flex justify-end" >
        <X size={24} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex-grow overflow-auto px-5 lg:pt-5 pb-0">
        {sidebarData().map((item, index) => (
          <div key={item.title}>
            {index !== 0 && <Divider className="my-4" />}
            <h3 className="py-[10px] px-[12px] font-matter text-xs font-medium text-gray-800 uppercase tracking-wider">
              {item.title}
            </h3>
            <ul>
              {item.items.map((listItem) => {
                const activeItem =
                  !pathname.includes("tag-details") &&
                  pathname.includes(listItem.label.toLowerCase());
                return (
                  <li key={listItem.id}>
                    {!listItem.subItems ? (
                      <Link
                        href={listItem.link}
                        onClick={() => isSmallScreen && setIsSidebarOpen(false)}
                        className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 ${pathname === listItem.link || activeItem
                          ? "bg-black hover:!bg-black text-white"
                          : ""
                          }
                        ${listItem.link === "/login" ||
                            listItem.link === "/register"
                            ? "xl:hidden"
                            : ""
                          }
                        `}
                      >
                        {listItem.icon}
                        {listItem.label}
                      </Link>
                    ) : (
                      <Accordion
                        className="!p-0"
                        defaultExpandedKeys={
                          activeItem ? [`Accordion ${listItem.id}`] : []
                        }
                      >
                        <AccordionItem
                          key={`Accordion ${listItem.id}`}
                          aria-label={`Accordion ${listItem.id}`}
                          startContent={listItem.icon}
                          title={listItem.label}
                          classNames={{
                            trigger: `group gap-2 mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 focus:bg-black ${activeItem ? "bg-black hover:!bg-black" : ""
                              }`,
                            title: `text-base text-[#646464] gap-0 group-focus:!text-white ${activeItem
                              ? "bg-black hover:!bg-black text-white"
                              : ""
                              }`,
                            startContent: `text-[#646464] group-focus:!text-white ${activeItem ? "text-white" : ""
                              }`,
                            indicator: `group-focus:!text-white ${activeItem ? "text-white" : ""
                              }`,
                            content: "ps-5 py-1",
                          }}
                          indicator={<ChevronDown size={17} />}
                        >
                          {listItem.subItems.map((accItem) => (
                            <Link
                              key={accItem.id}
                              href={accItem.link}
                              onClick={() =>
                                isSmallScreen && setIsSidebarOpen(false)
                              }
                              className={`w-full flex items-center text-base leading-6 text-[#646464] mb-1 px-3 py-1.5 rounded-lg hover:bg-gray-500 ${pathname.includes(accItem.link)
                                ? "bg-gray-500"
                                : ""
                                }`}
                            >
                              {accItem.subLabel}
                            </Link>
                          ))}
                        </AccordionItem>
                      </Accordion>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-5">
        <p className="font-matter text-sm text-gray-800 mb-2">
          &copy; Copyright 2024 - Glowist. All Rights Reserved.
        </p>
        <div className="flex items-center">
          <Link
            href="/"
            className="text-sm text-gray-800 hover:text-gray-900 hover:underline"
          >
            Privacy Policy
          </Link>
          <Dot size={16} className="text-gray-800" />
          <Link
            href="/"
            className="text-sm text-gray-800 hover:text-gray-900 hover:underline"
          >
            Terms of use
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

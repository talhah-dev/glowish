"use client";
import { Accordion, AccordionItem, Divider, useDisclosure } from "@nextui-org/react";
import React, { useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarContext, SmallScreenContext, TabContext } from "../../../app/providers";
import DonateModal from "./DonateModal";

// Icons
import {
  ChevronDown,
  Dot,
  X,
  House,
  Siren,
  Lightbulb,
  Award,
  CircleAlert,
  Phone,
  Settings,
  Mail,
  LogIn,
  UserPlus,
} from "lucide-react";
import { PiHandHeart } from "react-icons/pi";

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const { isSmallScreen } = useContext(SmallScreenContext);
  const { setActiveTab, activeTab } = useContext(TabContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState(null);
  const sidebarRef = useRef(null);

  const handleOpenModal = (type) => {
    setModalType(type);
    onOpen();
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, setIsSidebarOpen]);

  // Helpers to determine active states for accordions/links
  const isActivePath = (link) => link !== "#" && pathname === link;
  const includesPath = (segment) => pathname?.toLowerCase().includes(segment);

  const handleSubClick = (sectionLabel) => {
    // Preserve your original behavior: toggle between news/surveys on each click
    setActiveTab({ tab: activeTab.tab === "news" ? "surveys" : "news", title: sectionLabel });
    if (isSmallScreen) setIsSidebarOpen(false);
  };

  return (
    <>
      <DonateModal isOpen={isOpen} onOpenChange={onOpenChange} modalType={modalType} />

      <div
        id="navbar"
        ref={sidebarRef}
        className={`flex flex-col w-[250px] h-[calc(100vh-56px)] md:h-[calc(100vh-73px)] border-r transition-transform bg-white fixed z-50 bottom-0 ${isSidebarOpen ? "" : "-translate-x-full"
          }`}
      >
        <div className="text-2xl px-3 pt-6 flex lg:hidden justify-end sm:mt-32">
          {/* <X
            size={24}
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          /> */}
        </div>

        <div className="flex-grow overflow-auto px-5 pb-0 pt-2">
          {/* ======= MAIN ======= */}
          <div>
            <h3 className="py-[10px] px-[12px] font-matter text-xs font-medium text-gray-800 uppercase tracking-wider">
              Main
            </h3>
            <ul>
              {/* Home */}
              <li>
                <Link
                  href="/"
                  onClick={() => isSmallScreen && setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 ${isActivePath("/") ? "bg-black hover:!bg-black text-white" : ""
                    }`}
                >
                  <House size={20} />
                  Home
                </Link>
              </li>

              {/* Politics (Accordion) */}
              <li>
                <Accordion
                  className="!p-0"
                  defaultExpandedKeys={includesPath("politics") ? ["Accordion 2"] : []}
                >
                  <AccordionItem
                    key="Accordion 2"
                    aria-label="Accordion 2"
                    startContent={<Siren size={20} />}
                    title="Politics"
                    classNames={{
                      trigger: `group gap-2 mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 focus:bg-black ${includesPath("politics") ? "bg-black hover:!bg-black" : ""
                        }`,
                      title: `text-base text-[#646464] gap-0 group-focus:!text-white ${includesPath("politics") ? "text-white" : ""
                        }`,
                      startContent: `text-[#646464] group-focus:!text-white ${includesPath("politics") ? "text-white" : ""
                        }`,
                      indicator: `group-focus:!text-white ${includesPath("politics") ? "text-white" : ""
                        }`,
                      content: "ps-5 py-1",
                    }}
                    indicator={<ChevronDown size={17} />}
                  >
                    <Link
                      href="#"
                      onClick={() => handleSubClick("Politics")}
                      className={`w-full flex items-center text-base leading-6 text-[#646464] mb-1 px-3 py-1.5 rounded-lg hover:bg-gray-500`}
                    >
                      News
                    </Link>
                    <Link
                      href="#"
                      onClick={() => handleSubClick("Politics")}
                      className={`w-full flex items-center text-base leading-6 text-[#646464] mb-1 px-3 py-1.5 rounded-lg hover:bg-gray-500`}
                    >
                      Survey
                    </Link>
                  </AccordionItem>
                </Accordion>
              </li>

              {/* Technology (Accordion) */}
              <li>
                <Accordion
                  className="!p-0"
                  defaultExpandedKeys={includesPath("technology") ? ["Accordion 3"] : []}
                >
                  <AccordionItem
                    key="Accordion 3"
                    aria-label="Accordion 3"
                    startContent={<Lightbulb size={20} />}
                    title={
                      <span className="flex items-center gap-2">
                        <span>Technology</span>
                        <span className="text-xs opacity-50">(Soon)</span>
                      </span>
                    }
                    classNames={{
                      trigger: `group gap-2 mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 focus:bg-black ${includesPath("technology") ? "bg-black hover:!bg-black" : ""
                        }`,
                      title: `text-base text-[#646464] gap-0 group-focus:!text-white ${includesPath("technology") ? "text-white" : ""
                        }`,
                      startContent: `text-[#646464] group-focus:!text-white ${includesPath("technology") ? "text-white" : ""
                        }`,
                      indicator: `group-focus:!text-white ${includesPath("technology") ? "text-white" : ""
                        }`,
                      content: "ps-5 py-1",
                    }}
                    indicator={<ChevronDown size={17} />}
                  >
                    <Link
                      href="#"
                      onClick={() => handleSubClick("Technology")}
                      className={`w-full flex items-center text-base leading-6 text-[#646464] mb-1 px-3 py-1.5 rounded-lg hover:bg-gray-500`}
                    >
                      News
                    </Link>
                    <Link
                      href="#"
                      onClick={() => handleSubClick("Technology")}
                      className={`w-full flex items-center text-base leading-6 text-[#646464] mb-1 px-3 py-1.5 rounded-lg hover:bg-gray-500`}
                    >
                      Survey
                    </Link>
                  </AccordionItem>
                </Accordion>
              </li>

              {/* Sports (Accordion) */}
              <li>
                <Accordion
                  className="!p-0"
                  defaultExpandedKeys={includesPath("sports") ? ["Accordion 4"] : []}
                >
                  <AccordionItem
                    key="Accordion 4"
                    aria-label="Accordion 4"
                    startContent={<Award size={20} />}
                    title={
                      <span className="flex items-center gap-2">
                        <span>Sports</span>
                        <span className="text-xs opacity-50">(Soon)</span>
                      </span>
                    }
                    classNames={{
                      trigger: `group gap-2 mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 focus:bg-black ${includesPath("sports") ? "bg-black hover:!bg-black" : ""
                        }`,
                      title: `text-base text-[#646464] gap-0 group-focus:!text-white ${includesPath("sports") ? "text-white" : ""
                        }`,
                      startContent: `text-[#646464] group-focus:!text-white ${includesPath("sports") ? "text-white" : ""
                        }`,
                      indicator: `group-focus:!text-white ${includesPath("sports") ? "text-white" : ""
                        }`,
                      content: "ps-5 py-1",
                    }}
                    indicator={<ChevronDown size={17} />}
                  >
                    <Link
                      href="#"
                      onClick={() => handleSubClick("Sports")}
                      className={`w-full flex items-center text-base leading-6 text-[#646464] mb-1 px-3 py-1.5 rounded-lg hover:bg-gray-500`}
                    >
                      News
                    </Link>
                    <Link
                      href="#"
                      onClick={() => handleSubClick("Sports")}
                      className={`w-full flex items-center text-base leading-6 text-[#646464] mb-1 px-3 py-1.5 rounded-lg hover:bg-gray-500`}
                    >
                      Survey
                    </Link>
                  </AccordionItem>
                </Accordion>
              </li>
            </ul>
          </div>

          <Divider className="my-4" />

          {/* ======= RESOURCES ======= */}
          <div>
            <h3 className="py-[10px] px-[12px] font-matter text-xs font-medium text-gray-800 uppercase tracking-wider">
              Resources
            </h3>
            <ul>
              {/* About Us */}
              <li>
                <Link
                  href="/about"
                  onClick={() => isSmallScreen && setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 ${isActivePath("/about") ? "bg-black hover:!bg-black text-white" : ""
                    }`}
                >
                  <CircleAlert size={20} />
                  About Us
                </Link>
              </li>

              {/* Contact Us */}
              <li>
                <Link
                  href="/contact"
                  onClick={() => isSmallScreen && setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 ${isActivePath("/contact") ? "bg-black hover:!bg-black text-white" : ""
                    }`}
                >
                  <Phone size={20} />
                  Contact Us
                </Link>
              </li>

              {/* Settings */}
              <li>
                <Link
                  href="/profile-edit"
                  onClick={() => isSmallScreen && setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 ${isActivePath("/profile-edit") ? "bg-black hover:!bg-black text-white" : ""
                    }`}
                >
                  <Settings size={20} />
                  Settings
                </Link>
              </li>

              {/* Donate (modal) */}
              <li>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal("donate");
                  }}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500`}
                >
                  <PiHandHeart size={23} />
                  Donate
                </Link>
              </li>

              {/* Subscribe (modal) */}
              <li>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal("subscribe");
                  }}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500`}
                >
                  <Mail size={20} />
                  Subscribe
                </Link>
              </li>

              {/* Login */}
              <li>
                <Link
                  href="/login"
                  onClick={() => isSmallScreen && setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 xl:hidden ${isActivePath("/login") ? "bg-black hover:!bg-black text-white" : ""
                    }`}
                >
                  <LogIn size={20} />
                  Login
                </Link>
              </li>

              {/* Register */}
              <li>
                <Link
                  href="/register"
                  onClick={() => isSmallScreen && setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-2 text-base leading-6 text-[#646464] mb-1 px-3 py-2.5 rounded-lg hover:bg-gray-500 xl:hidden ${isActivePath("/register") ? "bg-black hover:!bg-black text-white" : ""
                    }`}
                >
                  <UserPlus size={20} />
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5">
          <p className="font-matter text-sm text-gray-800 mb-2">© Copyright 2024 - Glowist. All Rights Reserved.</p>
          <div className="flex items-center">
            <Link href="/" className="text-sm text-gray-800 hover:text-gray-900 hover:underline">
              Privacy Policy
            </Link>
            <Dot size={16} className="text-gray-800" />
            <Link href="/" className="text-sm text-gray-800 hover:text-gray-900 hover:underline">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
"use client";
import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Badge,
  Divider,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import {
  ChevronDown,
  Dot,
  Flame,
  HandCoins,
  Heart,
  Menu,
  Search,
  SquarePen,
  X,
} from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./HeaderComponents/ProfileDropdown";
import { SidebarContext } from "../providers";
import NotificationSection from "./HeaderComponents/NotificationSection";
import DonateModal from "./Sidebar/DonateModal";

const languages = [
  {
    language: "English",
    flagImage: "/assets/images/english.png",
  },
  {
    language: "German",
    flagImage: "/assets/images/german.png",
  },
  {
    language: "Hindi",
    flagImage: "/assets/images/hindi.png",
  },
  {
    language: "Australian",
    flagImage: "/assets/images/australian.png",
  },
  {
    language: "Arabic",
    flagImage: "/assets/images/arabic.png",
  },
  {
    language: "Spanish",
    flagImage: "/assets/images/spanish.png",
  },
];

const searchListData = [
  {
    id: 1,
    feturedImage: "/assets/images/search-1.png",
    postLink: "#",
    title: "The Psychology of Productivity",
    description:
      "Explore the intricate mental dynamics that drive efficient task accomplishment and goal attainment in our Psychology of Productivity blog.",
    userProfile: "/assets/images/user-14.png",
    userName: "Alexis Sanon",
    profileLink: "#",
    uploadDate: "Jun 20",
  },
  {
    id: 2,
    feturedImage: "/assets/images/search-2.png",
    postLink: "#",
    title: "The Rise of Remote Work",
    description:
      "Discover insights into the transformative shift towards remote work, exploring its impact on productivity, collaboration, and work-life balance in our blog, 'The Rise of Remote Work.",
    userProfile: "/assets/images/user-15.png",
    userName: "Skyler Day",
    profileLink: "#",
    uploadDate: "Dec 27",
  },
  {
    id: 3,
    feturedImage: "/assets/images/search-3.png",
    postLink: "#",
    title: "Sustainable Business Practices",
    description:
      "Explore the intersection of business practices and environmental sustainability in our blog, delving into strategies, challenges, and innovations shaping corporate responsibility and impact.",
    userProfile: "/assets/images/user-16.png",
    userName: "Kylie Leach",
    profileLink: "#",
    uploadDate: "Oct 19",
  },
  {
    id: 4,
    feturedImage: "/assets/images/search-4.png",
    postLink: "#",
    title: "Navigating the Gig Economy",
    description:
      "Navigate the evolving landscape of the gig economy with insights on opportunities, challenges, and strategies for success in our comprehensive blog.",
    userProfile: "/assets/images/user-17.png",
    userName: "Quinn Jensen",
    profileLink: "#",
    uploadDate: "Mar 5",
  },
];

const Header = ({ isLoggedIn }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const [modalType, setModalType] = useState(null);

  const {
    isOpen: isDonateOpen,
    onOpen: onDonateOpen,
    onOpenChange: onDonateOpenChange
  } = useDisclosure();

  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onOpenChange: onProfileOpenChange
  } = useDisclosure();


  return (
    <>
      <Navbar
        isBordered
        isBlurred={false}
        maxWidth="full"
        className="h-[56px] 2sm:h-[60px] md:h-[72px]"
        classNames={{ wrapper: "ps-[6px] 2sm:ps-2.5 pe-3 2sm:pe-5 xl:px-5" }}
      >
        {/* Start */}
        <NavbarBrand className="max-w-[199px] w-full gap-1 2sm:gap-2">
          <div className="block">
            <Button
              isIconOnly
              variant="light"
              className="min-w-9 w-full h-9 2sm:min-w-10 2sm:h-10"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu />
            </Button>
          </div>
          <Link href="/" className="sm:flex hidden relative w-[118px] h-14">
            <Image
              src={"/assets/images/logo.png"}
              alt=" Logo"
              layout="fill"
            />
          </Link>
          <Link
            href="/"
            className="sm:hidden flex 2sm:w-[34px] 2sm:h-[34px] w-[50px] h-[30px]"
          >
            <Image
              src={"/assets/images/logo.png"}
              alt="Glowist Logo"
              height={34}
              width={100}
            />
          </Link>
        </NavbarBrand>

        {/* Center */}
        <NavbarContent
          className="flex w-full px-4 grow gap-0"
          justify="start"
        >
          <NavbarItem className="relative 2xl:max-w-[500px] hidden xl:block xl:max-w-[320px] min-w-[320px] w-full flex-grow me-6">
            <Input
              onFocus={() => setShowSearchList(true)}
              onBlur={() => setShowSearchList(false)}
              classNames={{
                base: "w-full h-10 group",
                mainWrapper: "h-full",
                input:
                  "text-base text-base font-light text-gray-800 placeholder:text-base placeholder:font-light placeholder:text-gray-800",
                inputWrapper: `h-full ps-5 pe-3 text-default-500 bg-gray-500 border ${showSearchList
                  ? "rounded-t-2xl rounded-b-none border-gray-400"
                  : "rounded-full border-gray-500"
                  } shadow-none`,
              }}
              placeholder="Search here..."
              size="sm"
              startContent={<Search size={22} strokeWidth={1.5} />}
              type="search"
            />
            {showSearchList && <SearchListBox />}
          </NavbarItem>
        </NavbarContent>

        {/* remove later */}

        <DonateModal
          isOpen={isDonateOpen}
          onOpenChange={onDonateOpenChange}
          modalType={"donate"}
        />


        {/* End */}
        {isLoggedIn ? (
          <div className="flex items-center gap-2 md:gap-3">
            <NavbarItem className="block xl:hidden">
              <Button
                isIconOnly
                radius="full"
                variant="bordered"
                size="sm"
                className="border border-gray-400"
                onClick={() => setShowSearch(true)}
              >
                <Search size={16} />
              </Button>
            </NavbarItem>
            <NavbarItem onClick={onDonateOpen} className="me-2 cursor-pointer gap-1 2sm:m-0 flex items-center justify-center text-[#646464] text-sm">
              <Heart size={19} />
              <p className="">Donate</p>
            </NavbarItem>
            <NavbarItem className="me-2 2sm:mr-1.5 flex items-center justify-center">
              <NotificationSection />
            </NavbarItem>
            <NavbarItem>
              <ProfileDropdown />
            </NavbarItem>
            <NavbarItem>
              <Button
                color="primary"
                href="/login"
                as={Link}
                className="hidden md:flex justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full border border-gray-900 bg-white text-gray-900"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="primary"
                href="/register"
                as={Link}
                className="hidden md:flex justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full bg-gray-900"
              >
                Register
              </Button>
            </NavbarItem>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <NavbarItem>
              <Link
                href="/login"
                className="flex 2sm:text-base text-sm text-gray-800 hover:text-gray-900 hover:underline"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="primary"
                href="/register"
                as={Link}
                className="flex justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full bg-gray-900"
              >
                Register
              </Button>
            </NavbarItem>
          </div>
        )}

        {showSearch && (
          <div className="block xl:hidden">
            <div className="fixed top-0 left-0 z-20 h-[72px] w-full">
              <Input
                radius="none"
                onFocus={() => setShowSearchList(true)}
                onBlur={() => setShowSearchList(false)}
                classNames={{
                  base: "w-full h-full group",
                  mainWrapper: "h-full",
                  input:
                    "text-base text-base font-light text-gray-800 placeholder:text-base placeholder:font-light placeholder:text-gray-800",
                  inputWrapper:
                    "h-full ps-5 pe-3 text-default-500 bg-gray-500 shadow-none",
                }}
                placeholder="Search here..."
                size="sm"
                startContent={<Search size={22} strokeWidth={1.5} />}
                endContent={
                  <X
                    size={26}
                    strokeWidth={1.75}
                    className="cursor-pointer"
                    onClick={() => setShowSearch(false)}
                  />
                }
                type="search"
              />
            </div>
            {showSearchList && <SearchListBox />}
          </div>
        )}
      </Navbar>

      {/* Language Modal */}
      <Modal
        isOpen={isProfileOpen}
        onOpenChange={onProfileOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        closeButton={<X size={45} />}
        className="max-w-full rounded-none"
        classNames={{
          base: "!m-0 p-5 h-screen overflow-auto",
          closeButton: "md:top-5 md:right-5 xl:top-16 xl:right-16",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-0 sm:py-3 md:py-10 flex items-center justify-center">
                <div className="grid grid-cols-2 2sm:gap-8 sm:gap-12 md:gap-20 gap-5 max-w-[580px] w-full">
                  {languages.map((item) => (
                    <Link
                      href="#"
                      className="flex items-center font-matter lg:text-2xl sm:text-xl 2sm:text-lg text-sm font-medium text-gray-900 hover:text-gray-800"
                      onPress={onClose}
                    >
                      <div className="lg:max-w-[60px] w-full lg:h-[60px] 2sm:max-w-[44px] 2sm:h-[44px] max-w-[30px] h-[30px] rounded-full overflow-hidden sm:me-5 me-3">
                        <Image
                          src={item.flagImage}
                          width="60"
                          height="60"
                          alt="english"
                          className="w-full h-full"
                        />
                      </div>
                      {item.language}
                    </Link>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const SearchListBox = () => {
  return (
    <Listbox
      aria-label="Search Suggestion Box"
      className="absolute top-full left-0 z-[100] bg-white 2xl:p-5 lg:p-3 2sm:p-4 p-3 border border-gray-400 shadow-lg rounded-b-xl max-h-[calc(100vh-72px)] overflow-auto"
      classNames={{ list: "gap-0" }}
    >
      <ListboxItem key="popular" className="pointer-events-none p-0">
        <p className="flex items-center font-matter 2xl:text-base text-sm text-gray-800 2xl:mb-3 xl:mb-2 mb-3">
          <span className="flex 2xl:w-[20px] 2xl:h-[20px] w-[16px] h-[16px] me-1">
            <Flame size={20} color="#646464" strokeWidth={1.75} />
          </span>
          Popular Now
        </p>
      </ListboxItem>
      {searchListData.map((item) => (
        <ListboxItem
          key={item.id}
          className={`rounded-none p-0 hover:!bg-transparent cursor-default w-full ${item.id !== 1 &&
            "2xl:pt-4 xl:pt-3 2sm:pt-4 pt-3 2xl:mt-4 xl:mt-3 2sm:mt-4 mt-3 border-t border-gray-400"
            }`}
        >
          <div className="flex items-center w-full gap-3">
            <Link
              href={item.postLink}
              className="flex w-full 2xl:max-w-[100px] 2xl:min-w-[100px] 2xl:h-[80px] xl:max-w-[60px] xl:min-w-[60px] xl:h-[50px] 2sm:max-w-[100px] 2sm:min-w-[100px] 2sm:h-[80px] max-w-[80px] min-w-[80px] h-[70px]"
            >
              <Image
                width="100"
                height="80"
                src={item.feturedImage}
                alt="featured"
                className="w-full h-full bg-cover"
              />
            </Link>
            <div className="max-w-[330px]">
              <h4 className="font-matter 2xl:text-base xl:text-sm 2sm:text-base text-sm text-gray-900 hover:text-gray-800 font-medium 2xl:mb-1 xl:mb-0 mb-1">
                <Link href={item.postLink} className="flex">
                  {item.title}
                </Link>
              </h4>
              <p className="line-clamp-1 2xl:text-sm lg:text-xs 2sm:text-sm text-xs text-gray-800 2xl:mb-2 mb-1">
                {item.description}
              </p>
              <div className="flex items-center">
                {/* <Link
                  href={item.postLink}
                  className="flex w-[16px] h-[16px] rounded-full overflow-hidden me-[5px]"
                >
                  <Avatar
                    src={item.userProfile}
                    className="h-[18px] w-[18px]"
                  />
                </Link> */}
                <div className="flex items-center">
                  {/* <p className="font-matter text-xs text-gray-900 hover:text-gray-800">
                    <Link href={item.profileLink} className="flex">
                      {item.userName}
                    </Link>
                  </p>
                  <Dot size={14} /> */}
                  <p className="relative font-matter text-xs text-gray-800">
                    {item.uploadDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ListboxItem>
      ))}
    </Listbox>
  );
};

export default Header;

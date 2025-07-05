"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { BsGrid3X3Gap } from "react-icons/bs";

import {
  ArrowUpRight,
  Bookmark,
  Dot,
  MessageCircleMore,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { IoGridOutline } from "react-icons/io5";
import React, { useState } from "react";
import PostSwiper from "./PostSwiper";
import Comments from "./Comments";

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

const menuItems = [
  {
    key: "copy",
    label: "Copy link",
  },
];

const tags = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Photos",
  },
  {
    id: 3,
    label: "Videos",
  },
  {
    id: 4,
    label: "Articles",
  },
  {
    id: 5,
    label: "Music",
  },
  {
    id: 6,
    label: "Live",
  },
  {
    id: 7,
    label: "Events",
  }
]

const PostCard = ({ data }) => {

  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [gridView, setGridView] = useState(false);

  const toggleTag = (id) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };
  return (
    <div className="pt-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center overflow-x-auto scrollbar-hide whitespace-nowrap overflow-auto md:gap-3 gap-1.5">
          {tags.map((tag) => {
            const isSelected = selectedTagIds.includes(tag.id);
            return (
              <div
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`cursor-pointer px-3 py-1.5 flex items-center gap-2 rounded-full text-sm border transition-colors
              ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-black'}
                `}
              >
                <span className={isSelected ? 'text-white' : 'text-zinc-600'}><ArrowUpRight size={16} className='text-xs' /></span> {tag.label}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <IoGridOutline onClick={() => setGridView(false)} size={22} className="text-gray-900 hover:opacity-55 duration-500 transition-all cursor-pointer" />
          <BsGrid3X3Gap onClick={() => setGridView(true)} size={22} className="text-gray-900 hover:opacity-55 duration-500 transition-all cursor-pointer" />
        </div>
      </div>

      <div className={`pt-4 md:gap-10 grid ${gridView ? "lg:grid-cols-3" : "lg:grid-cols-2"} grid-cols-1`}>
        {Array.isArray(data) &&
          data.map((post) => <EachCard post={post} key={post.id} />)}
      </div>
    </div>
  );
};

const EachCard = ({ post }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSendOptions, setShowSendOptions] = useState(false);

  const [bookmark, setBookmark] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("5xl");

  const handleOpen = () => {
    setSize("5xl");
    onOpen();
  };

  return (
    <React.Fragment key={post.id}>
      <Card shadow="none" radius="none" className="gap-3">
        {/* <CardHeader className="flex gap-3 justify-between items-center p-0 pt-1 pe-1">
          <div className="flex items-center">
            <Avatar src={post.uploadedByImage} className="me-2" size="sm" />
            <Link
              href={post.uploaderProfile}
              className="font-matter sm:text-base text-sm font-medium text-gray-900 hover:text-gray-800"
            >
              {post.uploadedBy}
            </Link>
            <Dot />
            <p className="text-small text-default-500">
              {moment(post.uploadedDate, "DDMMYYYY").fromNow()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              radius="full"
              className="bg-gray-500 hover:text-white hover:bg-black"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>

            <Dropdown placement="bottom-end" className="min-w-[150px]">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  aria-label="More"
                >
                  <Ellipsis />
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
        </CardHeader> */}

        <CardBody className="p-0 flex flex-col gap-2">
          {post.title && (
            <h3>
              <Link
                href="/"
                className="font-matter text-gray-900 hover:text-gray-800 font-semibold sm:text-xl 2sm:text-lg text-base"
              >
                {post.title}
              </Link>
            </h3>
          )}
          {post.description && (
            <p
              className={`${post.media ? "line-clamp-2" : ""
                } font-matter 2sm:text-base text-sm text-gray-800 mb-1`}
            >
              {post.description}
            </p>
          )}
          {post.media && (
            <div className="rounded-xl overflow-hidden">
              {post.media === "image" ? (
                <Image
                  src={post.mediaPath}
                  alt="media"
                  radius="none"
                  className="w-full md:h-[33rem] object-cover"
                  classNames={{ wrapper: "!max-w-full" }}
                />
              ) : post.media === "video" ? (
                <video src={post.mediaPath} controls className="w-full md:h-[33rem] object-cover" />
              ) : post.media === "carousal" ? (
                <PostSwiper slides={post.mediaPath} />
              ) : (
                ""
              )}
            </div>
          )}
        </CardBody>
        {/* <Comments/> */}
        <CardFooter className="p-0 flex-col">
          {/* Footer Actions */}
          <div className="flex gap-3 justify-between items-center px-[3px] pt-1 pb-3 w-full">
            <div className="flex gap-2">
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
                      setShowSendOptions(!showSendOptions);
                    } else if (action.label === "Comment") {
                      handleOpen()
                    }
                  }}

                >
                  {action.icon}
                </Button>
              ))}
            </div>
            {/* No of Likes, Comments, Shares */}
            <div className="flex items-center">
              <div className="md:flex hidden text-gray-800">
                <Link
                  href="/"
                  underline="hover"
                  className="flex relative font-matter 2sm:text-sm text-[12px] text-gray-800 hover:text-gray-900 hover:underline-offset-2"
                >
                  {post.noOfLikes <= 1
                    ? `${post.noOfLikes} Like`
                    : `${post.noOfLikes} Likes`}
                </Link>
                <Dot />
                <Link
                  href="/"
                  underline="hover"
                  className="flex relative font-matter 2sm:text-sm text-[12px] text-gray-800 hover:text-gray-900 hover:underline-offset-2"
                >
                  {post.noOfComments <= 1
                    ? `${post.noOfComments} Comment`
                    : `${post.noOfComments} Comments`}
                </Link>
                <Dot />
                <Link
                  href="/"
                  underline="hover"
                  className="flex relative font-matter 2sm:text-sm text-[12px] text-gray-800 hover:text-gray-900 hover:underline-offset-2"
                >
                  {post.noOfShares <= 1
                    ? `${post.noOfShares} Share`
                    : `${post.noOfShares} Shares`}
                </Link>
              </div>
              <Bookmark onClick={() => setBookmark(!bookmark)} className={`${bookmark && "fill-gray-800"} text-gray-800 md:ml-7 transition-all duration-500 cursor-pointer`} />
            </div>
          </div>

          <Modal isOpen={isOpen} size={size} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <div className="flex md:flex-row flex-col md:h-[80vh]">
                    <div className="md:max-w-[50%] h-full flex items-center justify-center w-full relative">
                      <Image className="w-full md:h-[80vh] object-cover z-10 rounded-none " src="assets/images/image-1.png" />
                      <div onClick={onClose} className="md:hidden flex absolute top-4 right-4 z-20 items-center justify-center w-7 h-7 rounded-full bg-white">
                        <X size={16} />
                      </div>
                    </div>
                    <div className="md:max-w-[50%] w-full">
                      <Comments post={post} />
                    </div>
                  </div>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* <div className="w-full">
            <div className="flex items-start">
              <div className="">
                <Avatar src={post.uploadedByImage} className="me-2" size="sm" />
              </div>
              <div className="">
                <div className="justify-between flex items-center">
                  <div className="flex items-center">
                    <Link
                      href={post.uploaderProfile}
                      className="font-matter sm:text-base !text-sm font-medium text-gray-900 hover:text-gray-800"
                    >
                      @user
                    </Link>
                    <Dot />
                    <p className="text-xs text-default-500">
                      12h
                    </p>
                  </div>
                  <Heart size={13} className="text-gray-600 cursor-pointer" />
                </div>
                <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At porro omnis odio maxime. Ea eaque odit explicabo qui veniam a dolor, deserunt provident atque fugit eveniet, pariatur, sunt officia consequuntur?</p>
              </div>



            </div>
          </div> */}


          {showSendOptions && <Divider />}
          <div
            className={`w-full flex justify-between items-center px-1 transition-height duration-500 ${showSendOptions ? "h-11" : "h-0 invisible"
              }`}
          >
            <Button
              as={Link}
              disableRipple
              radius="none"
              className="p-0 bg-transparent hover:bg-transparent min-h-6 h-6"
              href="https://www.facebook.com/"
              target="_blank"
              startContent={
                <Image
                  src="/assets/images/facebook-s.svg"
                  height={20}
                  radius="none"
                />
              }
            >
              Facebook
            </Button>
            <Button
              as={Link}
              disableRipple
              radius="none"
              className="p-0 bg-transparent hover:bg-transparent min-h-6 h-6"
              href="https://www.x.com/"
              target="_blank"
              startContent={
                <Image
                  src="/assets/images/twitter-s.svg"
                  height={20}
                  radius="none"
                />
              }
            >
              Twitter
            </Button>
            <Button
              as={Link}
              disableRipple
              radius="none"
              className="p-0 bg-transparent hover:bg-transparent min-h-6 h-6"
              href="https://www.linkedin.com/"
              target="_blank"
              startContent={
                <Image
                  src="/assets/images/linkedin-s.svg"
                  height={20}
                  radius="none"
                />
              }
            >
              Linkedin
            </Button>
            <Button
              as={Link}
              disableRipple
              radius="none"
              className="p-0 bg-transparent hover:bg-transparent min-h-6 h-6"
              href="#"
              startContent={
                <Image
                  src="/assets/images/email-s.svg"
                  height={20}
                  radius="none"
                />
              }
            >
              Email
            </Button>
            <Button
              as={Link}
              disableRipple
              radius="none"
              className="p-0 bg-transparent hover:bg-transparent min-h-6 h-6"
              href="#"
              startContent={
                <Image
                  src="/assets/images/permalink-s.svg"
                  height={20}
                  radius="none"
                />
              }
            >
              Permalink
            </Button>
          </div>
        </CardFooter>
        <Divider className="mb-4" />
      </Card>
    </React.Fragment>
  );
};

export default PostCard;

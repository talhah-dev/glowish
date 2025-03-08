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
  Link,
} from "@nextui-org/react";
import {
  Dot,
  Ellipsis,
  MessageCircleMore,
  Send,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import PostSwiper from "./PostSwiper";

const cardFooterActions = [
  // {
  //   id: 1,
  //   label: "Like",
  //   icon: <ThumbsUp size={18} />,
  // },
  // {
  //   id: 2,
  //   label: "Dislike",
  //   icon: <ThumbsDown size={18} />,
  // },
  {
    id: 1,
    label: "Comment",
    icon: <MessageCircleMore size={18} />,
  },
  {
    id: 2,
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

const PostCard = ({ data }) => {
  return (
    <div className="pt-4">
      {data.map((post) => (
        <EachCard post={post} key={post.id} />
      ))}
    </div>
  );
};

const EachCard = ({ post }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSendOptions, setShowSendOptions] = useState(false);

  return (
    <React.Fragment key={post.id}>
      <Card shadow="none" radius="none" className="gap-3">
        <CardHeader className="flex gap-3 justify-between items-center p-0 pt-1 pe-1">
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
            {/* <Button
              radius="full"
              className="bg-gray-500 hover:text-white hover:bg-black"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button> */}
            {/* More button */}
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
        </CardHeader>

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
              className={`${
                post.media ? "line-clamp-2" : ""
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
                  className="w-full"
                  classNames={{ wrapper: "!max-w-full" }}
                />
              ) : post.media === "video" ? (
                <video src={post.mediaPath} controls />
              ) : post.media === "carousal" ? (
                <PostSwiper slides={post.mediaPath} />
              ) : (
                ""
              )}
            </div>
          )}
        </CardBody>

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
                  onClick={() =>
                    action.label === "Share" &&
                    setShowSendOptions(!showSendOptions)
                  }
                >
                  {action.icon}
                </Button>
              ))}
            </div>
            {/* No of Likes, Comments, Shares */}
            <div className="flex text-gray-800">
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
          </div>
          {showSendOptions && <Divider />}
          <div
            className={`w-full flex justify-between items-center px-1 transition-height duration-500 ${
              showSendOptions ? "h-11" : "h-0 invisible"
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
      </Card>
      <Divider className="mb-4" />
    </React.Fragment>
  );
};

export default PostCard;

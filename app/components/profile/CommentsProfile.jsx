import { Avatar } from "@nextui-org/react";
import { Reply, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import commentProfileData from "../../mock/commentProfileData.json";
import moment from "moment";

const CommentsProfile = () => {
  return (
    <div className="flex flex-col gap-3 mt-5">
      {commentProfileData.map((item) => (
        <div className=" 2sm:mb-[20px] mb-[12px]">
          <div className="flex items-center mb-[10px]">
            <Link
              href="#"
              className="2sm:w-[30px] 2sm:h-[30px] w-[28px] h-[28px] rounded-full overflow-hidden me-2"
            >
              <Avatar src={item.profileImage} size="sm" className="h-[30]" />
            </Link>
            <div className="2sm:flex block items-center">
              <p className="font-matter sm:text-base text-sm font-medium text-gray-900 hover:text-gray-800">
                <Link href="#" className="flex">
                  {item.commentBy}
                </Link>
              </p>
              <p className="date relative font-matter sm:text-base 2sm:text-sm text-xs text-gray-800 2sm:ps-4">
                {moment(item.commentDate, "DDMMYYYY").fromNow()}
              </p>
            </div>
          </div>
          <p className="font-matter 2sm:text-base text-sm text-gray-800">
            {item.comment}
          </p>
          <div className="flex justify-between items-center mt-[10px]">
            <div className="flex items-center">
              <p className="flex font-matter 2sm:text-base text-sm text-gray-900 me-[15px]">
                {item.likes} Likes
              </p>
              <Link
                href="#"
                className="reply-now flex items-center font-matter 2sm:text-base text-sm text-gray-900"
              >
                <span className="flex w-[20px] me-1">
                  <Reply />
                </span>
                Reply
              </Link>
            </div>
            <ul className="post-action flex">
              <li className="sm:me-3 me-2">
                <Link href="#" className="text-gray-800">
                  <ThumbsUp size={19} />
                </Link>
              </li>
              <li className="sm:me-3 me-2">
                <Link href="#" className="text-gray-800">
                  <ThumbsDown size={19} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsProfile;

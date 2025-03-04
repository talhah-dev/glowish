import React from "react";
import Link from "next/link";
import { Avatar, Button } from "@nextui-org/react";

const CommentBox = ({
  commentor = { name: "Jane Doe", profileImage: "/assets/images/user-3.png" },
}) => {
  return (
    <form class="bg-gray-500 p-4 rounded flex 2sm:flex-nowrap flex-wrap items-start">
      <Link
        href="/"
        class="2sm:flex hidden 2sm:max-w-[30px] w-full 2sm:h-[30px] max-w-[28px] h-[28px] rounded-full overflow-hidden me-3"
      >
        <Avatar src={commentor.profileImage} className="w-[30px] h-[30px]" />
      </Link>
      <textarea
        class="w-full h-[95px] font-matter px-3 py-2 rounded text-base text-gray-900 placeholder:font-matter placeholder:text-base placeholder:text-gray-800 focus-visible:outline-none border border-gray-400 focus:border-gray-400"
        type="text"
        name="text"
        placeholder="Add a comment…"
      ></textarea>
      <div class="flex justify-between items-center 2sm:w-fit w-full 2sm:mt-0 mt-3">
        <Link
          href="/"
          class="2sm:hidden flex 2sm:max-w-[30px] w-full 2sm:h-[30px] max-w-[28px] h-[28px] rounded-full overflow-hidden me-3"
        >
          <Avatar src={commentor.profileImage} className="w-[30px] h-[30px]" />
        </Link>
        <Button
          href="/"
          as={Link}
          className="flex justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full bg-gray-900 text-white ms-3"
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentBox;

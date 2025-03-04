import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import followedData from "../../mock/followedData.json";

const FollowingAuthor = () => {
  return (
    <div className="mt-5">
      {followedData.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-start 2sm:mb-4 mb-3"
        >
          <div className="flex">
            <Link
              href="#"
              className="flex 2sm:max-w-[36px] 2sm:h-[36px] max-w-[28px] h-[28px] w-full rounded-full overflow-hidden 2sm:me-3 me-3"
            >
              <Avatar src={item.profileImage} size="lg" className="h-10" />
            </Link>
            <div className="2sm:me-6 me-3">
              <h5 className="text-gray-900 hover:text-gray-800 sm:text-lg text-base font-semibold mb-1">
                <Link href="#">{item.name}</Link>
              </h5>
              <p className="sm:text-base text-sm text-gray-800">
                {item.description}
              </p>
            </div>
          </div>
          <Button
            color="primary"
            href="#"
            as={Link}
            className="flex justify-center items-center w-fit h-9 text-sm px-[23px] min-w-[30px] rounded-full bg-gray-900"
          >
            Follow
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FollowingAuthor;

import { Divider } from "@nextui-org/react";
import React from "react";
import RecentlyUploadedBlogs from "../RecentlyUploadedBlogs";
import PeopleYouknow from "../PeopleYouknow";
import RecommendedTopic from "../RecommendedTopic";

const RightSideBar = () => {
  return (
    <div className="lg:block hidden max-w-[350px] w-full ps-[30px] border-s border-gray-400">
      <RecentlyUploadedBlogs />
      <Divider className="my-4" />
      <PeopleYouknow />
      <Divider className="my-4" />
      <RecommendedTopic title={"Recommended Topic"} />
    </div>
  );
};

export default RightSideBar;

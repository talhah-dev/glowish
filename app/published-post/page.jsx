import React from "react";
import PublishedPostTable from "./PublishedPostTable";
import HomeLayout from "../HomeLayout";

const PublishedPost = () => {
  return (
    <HomeLayout>
      <div className="py-5">
        <h2 className="font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
        Published Posts
        </h2>
      </div>
      <PublishedPostTable />
    </HomeLayout>
  );
};

export default PublishedPost;

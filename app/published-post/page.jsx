import React from "react";
import LayoutWithSidebar from "../LayoutWithSidebar";
import PublishedPostTable from "./PublishedPostTable";

const PublishedPost = () => {
  return (
    <LayoutWithSidebar>
      <div className="py-5">
        <h2 className="font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
        Published Posts
        </h2>
      </div>
      <PublishedPostTable />
    </LayoutWithSidebar>
  );
};

export default PublishedPost;

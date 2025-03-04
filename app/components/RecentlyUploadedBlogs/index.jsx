"use client";
import React, { useState } from "react";
import { Card, CardBody, Image, Input } from "@nextui-org/react";
import recentBlogsData from "./RecentlBlogsData.json";
import { Search } from "lucide-react";

const RecentlyUploadedBlogs = () => {
  const [showMore, setShowMore] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const filteredData = recentBlogsData.filter((item) =>
    item.title.toLowerCase().includes(searchVal)
  );

  const recentBlogs = showMore ? filteredData : filteredData.slice(0, 4);

  return (
    <div>
      <Input
        className="mt-3 mb-5"
        classNames={{
          base: "w-full h-10 shado",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full rounded-full bg-white py-[8px] ps-5 pe-3 font-matter text-base font-light text-gray-800 !shadow-none placeholder:font-matter placeholder:text-base placeholder:font-light placeholder:text-gray-800 focus-visible:outline-none border border-gray-400 focus:border-[#d6d6d6]",
        }}
        placeholder="Search here..."
        size="sm"
        startContent={<Search size={22} strokeWidth={1.5} />}
        type="search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <h4 className="font-matter text-lg text-gray-900 font-bold mb-4">
        Recent uploaded blogs
      </h4>
      <div>
        {recentBlogs.length > 0 ? (
          recentBlogs.map((blog) => (
            <Card key={blog.id} className="shadow-none rounded-none mb-3">
              <CardBody className="flex-row gap-4 p-0">
                <Image
                  alt="profile image"
                  src={blog.imagePath}
                  width={60}
                  radius="md"
                  className="min-w-[60px]"
                />
                <div className="flex flex-col w-auto">
                  <p className="font-matter text-gray-900 hover:text-gray-800 font-medium mb-1 line-clamp-2">
                    {blog.title}
                  </p>
                  <p className="font-matter text-sm text-gray-800">
                    {blog.uplodadedDate}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <p className="font-matter text-gray-900 hover:text-gray-800 font-medium mb-1 line-clamp-2">
            No Data Found
          </p>
        )}
      </div>
      {recentBlogs.length > 3 && (
        <div>
          <button
            className="see-more font-matter text-sm text-green font-light"
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? "See more blog..." : "Show less"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentlyUploadedBlogs;

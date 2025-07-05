import React from "react";
import PostCard from "../../components/PostCard";
import forYou from "../../mock/forYou.json";
import RecommendedTopic from "../../../app/components/RecommendedTopic";
import recommendedTopicData from "../../mock/RecommendedTopicData.json";
import { Divider } from "@nextui-org/react";
import Sidebar from "../../../app/components/Sidebar";
import Link from "next/link";

const TagDetails = ({ params }) => {
  const currentOpen = recommendedTopicData.find(
    (item) => item.label === params.slug
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full xl:w-[calc(100%-250px)] xl:ms-[250px] p-5">
        <main className="flex-grow">
          <div className="flex justify-center">
            <div className="lg:max-w-[710px] max-w-full w-full 2xl:me-[60px] lg:me-[30px]">
              <PostCard data={forYou} />
            </div>
            <div className="lg:block hidden max-w-[350px] w-full ps-[30px] border-s border-gray-400">
              <div className="sm:mt-6 mt-5">
                <div className="sm:mt-0 mt-3 text-center">
                  <h3 className="font-semibold sm:text-[28px] text-lg text-gray-900 hover:text-gray-800 2sm:mb-4 mb-3">
                    <Link href={`/tag-details/${currentOpen.label}`}>{currentOpen.name}</Link>
                  </h3>
                  <div className="flex justify-center items-center">
                    {[
                      "Topic",
                      "-",
                      `${currentOpen.followers} Followers`,
                      "-",
                    ].map((item) => (
                      <p className="text-gray-800 2sm:text-base text-sm pe-2">
                        {item}
                      </p>
                    ))}
                    <p className="text-gray-800 2sm:text-base text-sm">
                      {currentOpen.stories} Stories
                    </p>
                  </div>
                </div>
              </div>
              <Divider className="sm:my-6 my-5 border-gray-400" />
              <RecommendedTopic title={"Explore Topic"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TagDetails;

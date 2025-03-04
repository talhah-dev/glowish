import React from "react";
import HomeLayout from "../../HomeLayout";
import { Divider } from "@nextui-org/react";
import PostCard from "../../components/PostCard";
import technologyData from "../../mock/technology.json";

export const metadata = {
  title: "Glowist - Technology",
};

const Technology = ({ params }) => {
  return (
    <HomeLayout>
      <div className="py-5">
        <h2 className="font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
          Technology
        </h2>
      </div>
      <Divider className="mt-2 mb-1" />
      <PostCard data={technologyData} />
    </HomeLayout>
  );
};

export default Technology;

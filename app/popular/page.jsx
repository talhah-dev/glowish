import React from "react";
import HomeLayout from "../HomeLayout";
import { Divider } from "@nextui-org/react";
import PostCard from "../components/PostCard";
import popularData from "../mock/popular.json";

export const metadata = {
  title: "Glowist - Popular",
};

const Popular = () => {
  return (
    <HomeLayout>
      <div className="py-5">
        <h2 className="font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
          Popular
        </h2>
      </div>
      <Divider className="mt-2 mb-1" />
      <PostCard data={popularData} />
    </HomeLayout>
  );
};

export default Popular;

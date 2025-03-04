import React from "react";
import HomeLayout from "../../HomeLayout";
import { Divider } from "@nextui-org/react";
import PostCard from "../../components/PostCard";
import moviesData from "../../mock/movies.json";

export const metadata = {
  title: "Glowist - Movies",
};

const Movies = ({ params }) => {
  return (
    <HomeLayout>
      <div className="py-5">
        <h2 className="font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
          Movies
        </h2>
      </div>
      <Divider className="mt-2 mb-1" />
      <PostCard data={moviesData} />
    </HomeLayout>
  );
};

export default Movies;

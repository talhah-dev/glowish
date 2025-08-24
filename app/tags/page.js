import React from "react";
import tagsData from "../mock/tags.json";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import HomeLayout from "../HomeLayout";

const Tags = () => {
  return (
    <HomeLayout>
      <h2 className="font-matter font-semibold sm:text-3xl 2sm:text-2xl text-[22px] sm:my-[20px] mb-[15px] mt-2">
        Tags
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 2sm:grid-cols-2 md:gap-[30px] gap-[20px]">
        {tagsData.map((item, index) => (
          <Card
            shadow="none"
            radius="none"
            key={index}
            className="border border-gray-500"
          >
            <CardBody className="overflow-hidden p-0">
              <Link href="/tag-details/technology">
                <Image
                  height={180}
                  width={260}
                  alt={item.name}
                  className="w-full object-cover hover:scale-110 duration-200 ease-in"
                  src={item.imagePath}
                />
              </Link>
            </CardBody>
            <CardFooter className="p-3 flex-col">
              <p className="text-xs text-gray-800 text-center uppercase">
                {item.posts} POSTS
              </p>
              <h3 className="font-semibold lg:text-lg text-base text-gray-900 hover:text-gray-800 text-center">
                <Link href="/tag-details">{item.name}</Link>
              </h3>
            </CardFooter>
          </Card>
        ))}
      </div>
    </HomeLayout>
  );
};

export default Tags;

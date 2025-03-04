import React from "react";
import LayoutWithSidebar from "../LayoutWithSidebar";
import authorsData from "../mock/authors.json";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const metadata = {
  title: "Glowist - Authors",
};

const Authors = () => {
  return (
    <LayoutWithSidebar>
      <h2 className="font-matter font-semibold sm:text-3xl 2sm:text-2xl text-[22px] sm:my-[20px] mb-[15px] mt-2">
        Authors
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 2sm:grid-cols-2 md:gap-[30px] gap-[20px]">
        {authorsData.map((item, index) => (
          <Card
            shadow="none"
            radius="none"
            key={index}
            className="border border-gray-500"
          >
            <CardBody className="overflow-hidden p-0">
              <Link href={`/author-profile/${item.id}`}>
                <Image
                  height={180}
                  width={260}
                  alt={item.name}
                  className="w-full object-cover hover:scale-110 duration-200 ease-in"
                  src={item.profileImage}
                />
              </Link>
            </CardBody>
            <CardFooter className="p-3 flex-col items-start">
              <h3 className="font-semibold lg:text-lg text-base text-gray-900 hover:text-gray-800">
                <Link href={`/author-profile/${item.id}`}>{item.name}</Link>
              </h3>
              <p className="lg:text-sm text-xs text-gray-800 mb-3">{item.role}</p>
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    href={item.facebookId}
                    target="_blank"
                    className="flex h-[36px] w-full min-w-[36px] max-w-[36px] items-center justify-center p-1.5 rounded-full bg-gray-500 hover:bg-black hover:text-white"
                  >
                    <Facebook size={17} strokeWidth={1.5} />
                  </Link>
                </li>
                <li>
                  <Link
                    href={item.instagramId}
                    target="_blank"
                    className="flex h-[36px] w-full min-w-[36px] max-w-[36px] items-center justify-center p-1.5 rounded-full bg-gray-500 hover:bg-black hover:text-white"
                  >
                    <Instagram size={17} strokeWidth={1.5} />
                  </Link>
                </li>
                <li>
                  <Link
                    href={item.twitterId}
                    target="_blank"
                    className="flex h-[36px] w-full min-w-[36px] max-w-[36px] items-center justify-center p-1.5 rounded-full bg-gray-500 hover:bg-black hover:text-white"
                  >
                    <Twitter size={17} strokeWidth={1.5} />
                  </Link>
                </li>
              </ul>
            </CardFooter>
          </Card>
        ))}
      </div>
    </LayoutWithSidebar>
  );
};

export default Authors;

import { Chip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const AboutProfile = ({ myHobbiesData }) => {
  return (
    <div className="mt-5">
      <div className="2sm:mb-[20px] mb-[12px]">
        <h3 className="text-gray-900 font-semibold sm:text-2xl 2sm:text-xl text-lg sm:pb-[10px] pb-[6px]">
          About
        </h3>
        <p className="2sm:text-base text-sm text-gray-800 font-semibold">
          Job Title: Software Engineer
        </p>
        <p className="text-sm text-gray-600 mb-2">
          San Francisco, CA
        </p>
        <p className="2sm:text-base text-sm text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      {/* <div className="2sm:mb-[20px] mb-[12px]">
        <div>
          <Link href="/" className="block w-full overflow-hidden mb-2">
            <img
              width="710px"
              height="200px"
              src="/assets/images/about-img-2.jpg"
              alt="profile about"
              className="w-full"
            />
          </Link>
        </div>
      </div>
      <div className="2sm:mb-[20px] mb-[12px]">
        <p className="2sm:text-base text-sm text-gray-800">
          Nor again is there anyone who loves or pursues or desires to obtain
          pain of itself, because it is pain, but because occasionally
          circumstances occur in which toil and pain can procure him some great
          pleasure.
        </p>
      </div>
      <div className="2sm:mb-[20px] mb-[12px] 2sm:pb-[30px] pb-[20px] border-b border-gray-400">
        <p className="2sm:text-base text-sm text-gray-900">
          63k Followers - 2.8k Following
        </p>
        <p className="2sm:text-base text-sm text-gray-900 mt-2">
          Ready to share my thoughts and experiences through posts!
        </p>
      </div> */}
      <div className="mb-5 2sm:mb-3">
        <h4 className="sm:text-2xl 2sm:text-xl text-lg text-gray-900 font-semibold mb-4">
          Recently viewed
        </h4>
        <div className="flex flex-wrap gap-2">
          {myHobbiesData.map((topic) => (
            <Chip
              key={topic.id}
              className="flex text-sm h-auto text-gray-900 bg-gray-500 px-4 py-1.5"
              classNames={{ content: "p-0" }}
            >
              {topic.name}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutProfile;
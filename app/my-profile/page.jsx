"use client"
import React, { useState } from "react";
import HomeLayout from "../HomeLayout";
import TabsView from "../components/TabsView";
import AboutProfile from "../components/profile/AboutProfile";
import myHobbiesData from "../mock/myHobbiesData.json";
import MyVotes from "../components/profile/MyVotes";
import CommentsProfile from "../components/profile/CommentsProfile";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { POLL_DATA } from "../mock/Survey/PollVote";
import Votes from "../components/survey/Votes";
import { CameraIcon } from "lucide-react";

// export const metadata = {
//   title: "Glowist - My Profile",
// };

let tabs = [
  {
    id: "about",
    label: "About",
    content: <AboutProfile myHobbiesData={myHobbiesData} />,
  },
  {
    id: "votes",
    label: "Votes",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {POLL_DATA.slice(0, 3).map((poll) => (
          <MyVotes key={poll.id} data={poll} />
        ))}
      </div>
    ),
  },
  {
    id: "comments",
    label: "Comments",
    content: <CommentsProfile />,
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    content: (
      <div className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-5`}>
        {POLL_DATA.slice(0, 6).map((data) => (
          <Votes key={data.id} data={data} />
        ))}
      </div>
    )
  },
];

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState("/assets/images/user-1.png");
  const [bannerImage, setBannerImage] = useState("/assets/images/banner-2.png");

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // console.log("Selected profile image:", file.name, file);
    }
  };

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
      console.log("Selected banner image:", file.name, file);
    }
  };

  return (
    <HomeLayout>
      <div className="pb-2">
        <div className="relative block w-full sm:h-[200px] 2sm:h-[150px] h-[120px] overflow-hidden mb-2">
          <Image
            width="710px"
            height="200px"
            src={bannerImage}
            alt="profile banner"
            radius="none"
            className="w-full h-full object-cover"
            classNames={{ wrapper: "!max-w-full" }}
          />
          <Button
            isIconOnly
            color="primary"
            variant="flat"
            className="absolute top-2 right-2 bg-gray-900/80 text-white rounded-full z-20"
            as="label"
          >
            <CameraIcon className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerImageChange}
            />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex 2sm:flex-nowrap flex-wrap items-center">
            <div className="relative sm:max-w-[130px] sm:h-[130px] 2sm:max-w-[100px] 2sm:h-[100px] max-w-[90px] h-[90px] w-full rounded-full overflow-hidden sm:border-4 border-[3px] border-white sm:ms-[30px] ms-[15px] sm:me-4 me-2 sm:mt-[-72px] mt-[-55px] z-10 group">
              <Image
                height="120"
                width="120"
                src={profileImage}
                alt="profile image"
                radius="none"
                className="w-full h-full transition-opacity duration-300 group-hover:opacity-50"
              />
              <Button
                isIconOnly
                color="primary"
                variant="flat"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                as="label"
              >
                <CameraIcon className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </Button>
            </div>
            <div>
              <h4 className="font-matter text-gray-900 font-semibold sm:text-[22px] 2sm:text-xg text-lg flex items-center sm:mb-1">
                Abdullah Morris
                <span className="flex sm:w-[20px] sm:h-[20px] w-[16px] h-[16px] ms-1 sm:mt-2 mt-0">
                  <Image
                    src="/assets/images/verified.svg"
                    alt="verified icon"
                  />
                </span>
              </h4>
              <p className="font-matter text-gray-800 2sm:text-sm text-xs">
                CEO, Founder
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              color="primary"
              href="/profile-edit"
              as={Link}
              className="flex justify-center items-center w-fit h-9 text-sm px-[23px] min-w-[30px] rounded-full bg-gray-900"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      <TabsView tabs={tabs} />
    </HomeLayout>
  );
};

export default MyProfile;
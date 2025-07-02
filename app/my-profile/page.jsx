import React from "react";
import HomeLayout from "../HomeLayout";
import TabsView from "../components/TabsView";
import AboutProfile from "../components/profile/AboutProfile";
import myHobbiesData from "../mock/myHobbiesData.json";
import PostCard from "../components/PostCard";
import profilePosts from "../mock/profilePosts.json";
import FollowingProfile from "../components/profile/FollowingProfile";
import CommentsProfile from "../components/profile/CommentsProfile";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

export const metadata = {
  title: "Glowist - My Profile",
};

let tabs = [
  // {
  //   id: "posts",
  //   label: "Posts",
  //   content: <PostCard data={profilePosts} />,
  // },
  {
    id: "about",
    label: "About",
    content: <AboutProfile myHobbiesData={myHobbiesData} />,
  },
  // {
  //   id: "following",
  //   label: "Following",
  //   content: <FollowingProfile />,
  // },
  // {
  //   id: "comments",
  //   label: "🔒 Comments",
  //   content: <CommentsProfile />,
  // },
];

const MyProfile = () => {
  return (
    <HomeLayout>
      <div className="pb-2">
        <div className="block w-full sm:h-[200px] 2sm:h-[150px] h-[120px] overflow-hidden mb-2">
          <Image
            width="710px"
            height="200px"
            src="/assets/images/banner-2.png"
            alt="profile banner"
            radius="none"
            className="w-full h-full object-cover"
            classNames={{ wrapper: "!max-w-full" }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex 2sm:flex-nowrap flex-wrap items-center">
            <div className="sm:max-w-[130px] sm:h-[130px] 2sm:max-w-[100px] 2sm:h-[100px] max-w-[90px] h-[90px] w-full rounded-full overflow-hidden sm:border-4 border-[3px] border-white sm:ms-[30px] ms-[15px] sm:me-4 me-2 sm:mt-[-72px] mt-[-55px] z-10">
              <Image
                height="120"
                width="120"
                src="/assets/images/user-1.png"
                alt="profile image"
                radius="none"
                className="w-full h-full"
              />
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
            {/* <div className="2sm:me-[10px] mx-[7px]">
              <Link href="#" className="flex 2sm:w-[20px] w-[16px]">
                <Ellipsis />
              </Link>
            </div> */}
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

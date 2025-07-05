import React from "react";
import { Divider } from "@nextui-org/react";
import ProfileEditForm from "./ProfileEditForm";
import HomeLayout from "../HomeLayout";

export const metadata = {
  title: "Glowist - Edit Profile",
};

const ProfileEdit = () => {
  return (
    <HomeLayout>
      <div className="max-w-[800px] mx-auto w-full px-4 md:py-[40px] sm:py-[30px] py-[20px]">
        <div>
          <h1 className="text-gray-900 font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
            Edit Profile
          </h1>
        </div>
        <Divider className="mt-4 mb-5" />

        {/* Form */}
        <ProfileEditForm />
      </div>
    </HomeLayout>
  );
};

export default ProfileEdit;

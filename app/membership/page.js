import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import HomeLayout from "../HomeLayout";

export const metadata = {
  title: "Glowist - Membership",
};

const basicPlan = [
  { id: 1, feature: "Access to core features" },
  { id: 2, feature: "5GB storage" },
  { id: 3, feature: "1 user account" },
  { id: 4, feature: "Basic customer support" },
  { id: 5, feature: "Monthly updates" },
];
const standardPlan = [
  { id: 1, feature: "All Basic Plan features" },
  { id: 2, feature: "50GB storage" },
  { id: 3, feature: "Up to 5 user accounts" },
  { id: 4, feature: "Priority customer support" },
  { id: 5, feature: "Weekly updates" },
];
const premiumPlan = [
  { id: 1, feature: "All Standard Plan features" },
  { id: 2, feature: "200GB storage" },
  { id: 3, feature: "Unlimited user accounts" },
  { id: 4, feature: "24/7 premium support" },
  { id: 5, feature: "Daily updates" },
];

const Membership = () => {
  return (
    <HomeLayout>
      <div className="lg:pb-20 md:pt-[40px] 2sm:pt-[30px] pt-[20px] sm:pb-0">
        <div className="w-full text-center text-white pb-10 lg:pb-20">
          <h1 className="font-matter text-gray-900 font-semibold sm:text-3xl 2sm:text-2xl text-[22px] mb-4">
            Get Membership Plans
          </h1>
          <p className="font-matter 2sm:text-base text-sm text-gray-800">
            Take your experience to the next level with our flexible membership
            options. Enjoy access to premium content, expert insights, and
            special events curated just for you. Choose your plan and start
            benefiting today.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center  gap-8 lg:gap-0 lg:mt-4">
          {/* Basic Plan */}
          <div className="flex-1 w-full mb-6 border border-gray-900 bg-white rounded-xl lg:scale-95">
            <TopSection
              planName={"Basic Plan"}
              price={"FREE"}
              duration={"/Lifetime"}
            />
            <div className="bg-gray-500/50 rounded-b-xl border-t-2 border-gray-200/20 p-8">
              <ul className="space-y-4 mb-6">
                {basicPlan.map((item) => (
                  <li key={item.id} className="flex items-center">
                    <Image
                      src="/assets/images/green-tick.svg"
                      alt="green tick"
                      height={15}
                      width={15}
                    />
                    <p className="font-matter sm:text-base text-sm text-gray-800 ps-2">
                      {item.feature}
                    </p>
                  </li>
                ))}
              </ul>
              <Button
                href="/"
                as={Link}
                className="flex justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full text-white bg-gray-900"
              >
                Get Started
              </Button>
            </div>
          </div>
          {/* Standard Plan */}
          <div className="lg:max-w-max mb-6 relative w-full bg-white rounded-xl border border-gray-900 lg:scale-110 z-10">
            <TopSection
              planName={"Standard Plan"}
              price={"$ 149"}
              duration={"/Month"}
            />
            <div className="bg-gray-500/50 rounded-b-xl border-t-2 border-gray-200/20 p-8">
              <ul className="space-y-4 mb-6">
                {standardPlan.map((item) => (
                  <li key={item.id} className="flex items-center">
                    <Image
                      src="/assets/images/green-tick.svg"
                      alt="green tick"
                      height={15}
                      width={15}
                    />
                    <p className="font-matter sm:text-base text-sm text-gray-800 ps-2">
                      {item.feature}
                    </p>
                  </li>
                ))}
              </ul>
              <Button
                href="/"
                as={Link}
                className="flex justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full text-white bg-gray-900"
              >
                Get Started
              </Button>
            </div>
            <div className="absolute rounded-full w-40 font-matter bg-gray-900 text-white text-center text-sm tracking-wider px-4 py-1 -top-3 inset-x-0 mx-auto">
              MOST POPULAR
            </div>
          </div>
          {/* Premium Plan */}
          <div className="flex-1 w-full mb-6 bg-white rounded-xl border border-gray-900 lg:scale-95">
            <TopSection
              planName={"Premium Plan"}
              price={"$ 200"}
              duration={"/Month"}
            />
            <div className="bg-gray-500/50 rounded-b-xl border-t-2 border-gray-200/20 p-8">
              <ul className="space-y-4 mb-6">
                {premiumPlan.map((item) => (
                  <li key={item.id} className="flex items-center">
                    <Image
                      src="/assets/images/green-tick.svg"
                      alt="green tick"
                      height={15}
                      width={15}
                    />
                    <p className="font-matter sm:text-base text-sm text-gray-800 ps-2">
                      {item.feature}
                    </p>
                  </li>
                ))}
              </ul>
              <Button
                href="/"
                as={Link}
                className="flex justify-center items-center text-base px-[22px] min-w-[30px] w-full rounded-full text-white bg-gray-900"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

const TopSection = ({ planName, price, duration }) => {
  return (
    <div className="text-center sm:px-14 px-6 pt-10 pb-8">
      <p className="font-matter xl:text-2xl text-xl pb-4 font-semibold">
        {planName}
      </p>
      <div className="flex justify justify-center items-center">
        <span className="font-matter text-5xl lg:text-4xl xl:text-6xl align-text-middle px-3">
          {price}
        </span>
        <span className="font-normal font-matter text-xl text-gray-800 inline-block align-text-middle">
          {duration}
        </span>
      </div>
    </div>
  );
};

export default Membership;

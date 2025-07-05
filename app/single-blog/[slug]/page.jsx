"use client";
import React from "react";
import LayoutWithFooter from "../../(withFooter)/layout";
import { Divider, Image } from "@nextui-org/react";
import PostCard from "../../components/PostCard";
import Link from "next/link";
import CommentBox from "../../../app/components/comments/CommentBox";
import Comments from "../../../app/components/comments/Comments";

const details = [
  {
    id: 1,
    uploadedBy: "Elijah Delaney",
    uploaderProfile: "/",
    uploadedByImage: "/assets/images/user-3.png",
    uploadedDate: "1/9/2024",
    media: "video",
    mediaPath: "/assets/images/video.mp4",
    noOfLikes: 2010,
    noOfComments: 79,
    noOfShares: 35,
  },
];

const SingleBlog = ({ params }) => {
  console.log("post id ->", params.slug);

  return (
    <LayoutWithFooter>
      <main>
        <div className="max-w-[750px] mx-auto w-full px-4 md:py-[40px] sm:py-[30px] py-[20px]">
          <div>
            <p className="2sm:text-base text-sm text-gray-800 2sm:mb-3 mb-2">
              🌟Featured Post
            </p>
            <h1 className="text-gray-900 font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
              AI Technology Effect on Human Life
            </h1>
          </div>
          <Divider className="mt-4 mb-3" />

          <PostCard data={details} />

          <div className="2sm:mb-[20px] mb-[12px] mt-5">
            <p className="sm:text-base text-sm text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus. Sociis natoque penatibus
              et magnis dis parturient montes. Ridiculus mus mauris vitae
              ultricies leo. Neque egestas congue quisque egestas diam. Risus in
              hendrerit gravida rutrum quisque non.
            </p>
          </div>

          <div className="2sm:mb-[20px] mb-[12px]">
            <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </h3>
            <p className="2sm:text-base text-sm text-gray-800">
              Neque egestas congue quisque egestas diam. Risus in hendrerit
              gravida rutrum quisque non. Sit amet nulla facilisi morbi tempus
              iaculis urna. Lorem sed risus ultricies tristique nulla aliquet
              enim. Volutpat blandit aliquam etiam erat velit.
            </p>
          </div>

          {/* side by side */}
          <div className="flex sm:flex-nowrap flex-wrap items-center 2sm:mb-[20px] mb-[12px]">
            <Link
              href="/"
              className="sm:max-w-[300px] max-w-full w-full sm:me-8"
            >
              <Image
                width="300px"
                height="320px"
                src="/assets/images/robot.png"
                alt="robot image"
                radius="sm"
              />
            </Link>
            <div className="w-full sm:mt-0 mt-3">
              <p className="2sm:text-base text-sm text-gray-800 2sm:mb-3 mb-2">
                Ut morbi tincidunt augue interdum velit. Ac felis donec et odio
                pellentesque diam volutpat commodo. Morbi tristique senectus et
                netus et malesuada fames ac turpis. Odio facilisis mauris sit
                amet.{" "}
              </p>
              <p className="2sm:text-base text-sm text-gray-800">
                Risus viverra adipiscing at in tellus integer feugiat
                scelerisque. Interdum velit laoreet id donec ultrices tincidunt
                arcu non sodales. Vulputate dignissim suspendisse.
              </p>
            </div>
          </div>

          <div className="2sm:mb-[20px] mb-[12px]">
            <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </h3>
            <p className="2sm:text-base text-sm text-gray-800 2sm:mb-3 mb-2">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem.
            </p>
            <p className="2sm:text-base text-sm text-gray-800">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?"
            </p>
          </div>

          <div className="my-6 flex flex-col gap-6">
            <CommentBox />
            <Comments />
          </div>
        </div>
      </main>
    </LayoutWithFooter>
  );
};

export default SingleBlog;

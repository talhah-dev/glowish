import React from "react";
import { Divider } from "@nextui-org/react";

export const metadata = {
  title: "Glowist - About Us",
};

const AboutUs = () => {
  return (
    <main>
      <div className="max-w-[750px] mx-auto w-full px-4 md:py-[40px] sm:py-[30px] py-[20px]">
        <div>
          <h1 className="text-gray-900 font-semibold sm:text-3xl 2sm:text-2xl text-[22px]">
            About Us
          </h1>
        </div>
        <Divider className="mt-4 mb-5" />

        <div className="2sm:mb-[20px] mb-[12px]">
          <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
            Welcome to Glowist!
          </h3>
          <p className="2sm:text-base text-sm text-gray-800">
            At Glowist, we believe that everyone deserves to shine in their own
            unique way. Our mission is to inspire, inform, and empower our
            readers by providing valuable insights, practical tips, and engaging
            stories across a variety of topics.
          </p>
        </div>
        <div className="2sm:mb-[20px] mb-[12px]">
          <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
            Our Story
          </h3>
          <p className="2sm:text-base text-sm text-gray-800">
            Glowist was founded with a simple vision: to create a platform where
            individuals from all walks of life can come together to share their
            experiences, learn from one another, and grow. Our team is
            passionate about bringing you the best content on wellness,
            lifestyle, technology, travel, and more. We strive to be your go-to
            source for reliable information and inspiration.
          </p>
        </div>
        <div className="2sm:mb-[20px] mb-[12px]">
          <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
            What We Offer
          </h3>
          <ul className="content-point">
            <li className="2sm:!text-base !text-sm">
              <b className="text-gray-900">In-Depth Articles:</b> Our articles are
              thoroughly researched and thoughtfully written to provide you with
              the most accurate and up-to-date information. Whether you're
              looking for health advice, travel tips, or the latest in tech
              trends, we've got you covered.
            </li>
            <li className="2sm:!text-base !text-sm">
              <b className="text-gray-900">Expert Insights:</b> We collaborate with
              experts and influencers in various fields to bring you valuable
              insights and perspectives. Our interviews and guest posts offer a
              deeper understanding of the topics that matter to you.
            </li>
            <li className="2sm:!text-base !text-sm">
              <b className="text-gray-900">Practical Tips:</b> At Glowist, we
              believe in actionable advice. Our practical tips how-to guides are
              designed to help you implement positive changes in your life
              easily.
            </li>
            <li className="2sm:!text-base !text-sm">
              <b className="text-gray-900">Community Engagement:</b> We value our
              readers and believe in the power of community. Join our
              discussions, share your experiences, and connect with like-minded
              individuals who share your interests and passions.
            </li>
          </ul>
        </div>
        <div className="2sm:mb-[20px] mb-[12px]">
          <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
            Meet the Team
          </h3>
          <p className="2sm:text-base text-sm text-gray-800 mb-3">
            Our diverse and talented team is the heart of Glowist. We are
            writers, researchers, designers, and editors, all united by our
            commitment to excellence and our love for sharing knowledge.
          </p>
          <ul className="content-point">
            <li className="2sm:!text-base !text-sm">
              <b className="text-gray-900">Founder &amp; Editor-in-Chief:</b>{" "}
              WebbyCrown Solutions - With a background in journalism and a
              passion for storytelling, WebbyCrown Solutions started Glowist to
              create a space where people can find trustworthy information and
              inspiring stories.
            </li>
            <li className="2sm:!text-base !text-sm">
              <b className="text-gray-900">Contributing Writers:</b> Our team of
              contributing writers brings a wealth of experience and expertise
              to the table, ensuring that our content is both informative and
              engaging.
            </li>
            <li className="2sm:!text-base !text-sm">
              <b className="text-gray-900">Design &amp; Development:</b> Our
              creative designers and developers work tirelessly to make sure
              that Glowist is not only a pleasure to read but also easy to
              navigate.
            </li>
          </ul>
        </div>
        <div className="2sm:mb-[20px] mb-[12px]">
          <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
            Our Vision
          </h3>
          <p className="2sm:text-base text-sm text-gray-800">
            We envision Glowist as more than just a blog; we see it as a vibrant
            community where readers can find inspiration, support, and valuable
            resources to lead a more fulfilled life. We are committed to
            continuous growth and innovation, always seeking new ways to serve
            our audience better.
          </p>
        </div>
        <div className="2sm:mb-[20px] mb-[12px]">
          <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
            Join Us on Our Journey
          </h3>
          <p className="2sm:text-base text-sm text-gray-800 sm:mb-[10px] mb-[6px]">
            Thank you for visiting Glowist. We invite you to explore our site,
            join our community, and be part of our journey. Together, we can
            learn, grow, and shine brighter than ever.
          </p>
          <p className="2sm:text-base text-sm text-gray-800">
            Stay connected with us through our newsletter and social media
            channels for the latest updates and exclusive content.
          </p>
        </div>
        <div className="2sm:mb-[20px] mb-[12px]">
          <h3 className="text-gray-900 font-semibold sm:text-xl 2sm:text-lg text-base sm:pb-[10px] pb-[6px]">
            Contact Us
          </h3>
          <p className="2sm:text-base text-sm text-gray-800 sm:mb-4 mb-3">
            We love hearing from our readers! If you have any questions,
            suggestions, or just want to say hello, feel free to reach out to us
            at:
          </p>
          <p className="2sm:text-base text-sm text-gray-800 sm:mb-4 mb-3">
            Email:{" "}
            <a
              href="mailto:info@webbycrown.com"
              className="hover:underline text-gray-900"
            >
              info@webbycrown.com
            </a>
          </p>
          <p className="2sm:text-base text-sm text-gray-800">
            Let's shine together!
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;

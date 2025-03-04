import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-400 2sm:py-[20px] py-[15px]">
      <div className="max-w-[750px] mx-auto px-4 w-full 2sm:flex block justify-between">
        <p className="sm:text-base text-sm text-gray-800 2sm:pb-0 pb-2">
          © Copyright 2024 - Glowist. All Rights Reserved.
        </p>
        <p className="sm:text-base text-sm text-gray-800 flex items-center gap-0.5">
          <Link
            href="/privacy-policy"
            className="pe-1 hover:underline hover:text-gray-900"
          >
            Privacy
          </Link>
          <span>-</span>
          <Link
            href="/terms-of-use"
            className="ps-1 hover:underline hover:text-gray-900"
          >
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

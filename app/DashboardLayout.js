"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DashboardSidebar from "./components/DashboardSlidebar";
import { Menu } from 'lucide-react';

const DashboardLayout = ({ children, className }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="lg:max-w-[calc(100vw-280px)] w-full ml-auto">
          {/* Top bar (only for small screens) */}
          <div className="lg:hidden flex gap-2 p-3 items-center border-b justify-between">
            <Image
              src="/assets/images/logo.png"
              alt="glowist logo"
              width={100}
              height={60}
              className="w-16 h-auto"
            />
            <Menu onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>
          <div className={`${className}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

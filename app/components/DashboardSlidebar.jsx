"use client";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import {
  X,
  LayoutDashboard,
  FilePlus2,
  FileText,
  ListChecks,
  ListPlus,
  UsersRound,
  Settings,
  LogOut,
} from "lucide-react";

const AdminDashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const Item = ({ href, icon, children, danger = false }) => (
    <Link
      href={href}
      className={`w-full flex items-center gap-2 text-base leading-6 mb-1 px-3 py-2.5 rounded-lg
      ${danger ? "bg-red-600 text-white hover:!bg-black" : "text-[#646464] hover:bg-gray-500"}
      ${pathname == href ? "bg-black text-white hover:!bg-black" : ""}`}
    >
      {icon}
      {children}
    </Link>
  );


  return (
    <aside
      id="admin-sidebar"
      ref={sidebarRef}
      className={`flex flex-col w-[250px] h-screen border-r transition-transform bg-white fixed z-50 bottom-0 left-0 ${isSidebarOpen ? "" : "-translate-x-full"
        }`}
    >
      <div className="text-2xl px-3 pt-3 text-zinc-800 flex lg:hidden justify-end">
        <X size={24} className="cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-grow overflow-auto px-5 pb-0 pt-2">
        {/* ======= ADMIN ======= */}
        <div>
          <h3 className="py-[10px] px-[12px] font-matter text-xs font-medium text-gray-800 uppercase tracking-wider">
            Admin
          </h3>
          <ul>
            <li>
              <Item href="/dashboard" icon={<LayoutDashboard size={20} />}>Dashboard</Item>
            </li>
            <li>
              <Item href="/dashboard/posts/create-post" icon={<FilePlus2 size={20} />}>Create Post</Item>
            </li>
            <li>
              <Item href="/dashboard/posts" icon={<FileText size={20} />}>All Posts</Item>
            </li>
            <li>
              <Item href="/dashboard/surveys/create-survey" icon={<ListPlus size={20} />}>Create Survey</Item>
            </li>
            <li>
              <Item href="/dashboard/surveys" icon={<ListChecks size={20} />}>All Surveys</Item>
            </li>
            <li>
              <Item href="/dashboard/users" icon={<UsersRound size={20} />}>Users</Item>
            </li>
          </ul>
        </div>

        <Divider className="my-4" />

        {/* ======= ACCOUNT ======= */}
        <div>
          <h3 className="py-[10px] px-[12px] font-matter text-xs font-medium text-gray-800 uppercase tracking-wider">
            Account
          </h3>
          <ul>
            <li>
              <Item href="/admin/settings" icon={<Settings size={20} />}>Settings</Item>
            </li>
            <li>
              <Item href="/logout" icon={<LogOut size={20} />} danger>
                Logout
              </Item>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default AdminDashboardSidebar;
"use client";
import React, { useCallback, useState } from "react";
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    key: "post",
    label: "Post",
  },
  {
    key: "likes",
    label: "Likes",
  },
  {
    key: "views",
    label: "Views",
  },
  {
    key: "categories",
    label: "Categories",
  },
  {
    key: "comments",
    label: "Comments",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const initialRows = [
  {
    id: 1,
    imgPath: "/assets/images/post-1.png",
    title: "Champions Again: India's Glorious World Cup Victory!",
    date: "Jun 20, 2024",
    likes: 15,
    views: 257,
    categories: ["Sports"],
    comments: 34,
  },
  {
    id: 2,
    imgPath: "/assets/images/post-2.png",
    title: "AI Technology Effect on Human Life",
    date: "Feb 05, 2024",
    likes: 37,
    views: 365,
    categories: ["Technology"],
    comments: 58,
  },
  {
    id: 3,
    imgPath: "/assets/images/post-3.png",
    title: "Fit & Fabulous: Your Journey to a Healthier You",
    date: "Oct 19, 2024",
    likes: 63,
    views: 892,
    categories: ["Fitness"],
    comments: 32,
  },
  {
    id: 4,
    imgPath: "/assets/images/post-4.png",
    title: "Home Horizons: Navigating the Real Estate Landscape",
    date: "Mar 25, 2024",
    likes: 57,
    views: 421,
    categories: ["Real Estate"],
    comments: 19,
  },
  {
    id: 5,
    imgPath: "/assets/images/post-5.png",
    title: "Digital Marketing Transformation at Unilever.",
    date: "Aug 02, 2024",
    likes: 82,
    views: 175,
    categories: ["Marketing"],
    comments: 3,
  },
  {
    id: 6,
    imgPath: "/assets/images/post-6.png",
    title: "Implementing Electronic Health Records.",
    date: "Nov 13, 2024",
    likes: 78,
    views: 439,
    categories: ["Health"],
    comments: 35,
  },
];

const PublishedPostTable = () => {
  const [rows, setRows] = useState(initialRows);

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    console.log(updatedRows, rows);
    setRows(updatedRows);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "post":
        return (
          <div className="flex items-center lg:pe-10 sm:pe-4 pe-0">
            <Link
              href={`/single-blog/${item.id}`}
              className="flex w-full md:min-w-[80px] md:max-w-[80px] md:h-[80px] sm:min-w-[70px] sm:max-w-[70px] sm:h-[70px] min-w-[60px] max-w-[60px] h-[60px] md:me-4 me-3"
            >
              <Image
                width="80"
                height="80"
                src={item.imgPath}
                alt="post image"
                className="w-full h-full object-cover"
              />
            </Link>
            <div>
              <h4 className="lg:text-base text-sm font-medium text-gray-900 hover:text-gray-800 mb-1">
                <Link href={`/single-blog/${item.id}`}>{item.title}</Link>
              </h4>
              <p className="lg:text-sm text-xs text-gray-800">{item.date}</p>
            </div>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "categories":
        return (
          <Link
            href="/"
            className="flex md:text-sm text-xs text-gray-900 rounded-full px-[10px] py-[4px] bg-gray-500 w-fit"
          >
            {getKeyValue(item, columnKey)}
          </Link>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit">
              <Button className="flex justify-center items-center lg:min-w-[36px] lg:max-w-[36px] lg:h-[36px] min-w-[30px] max-w-[30px] h-[30px] p-1.5 !border border-gray-400 rounded-full !bg-transparent hover:!bg-[#f2f2f2]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M14.6744 10.9539V14.5068C14.6742 15.0096 14.4744 15.4916 14.1189 15.8471C13.7634 16.2026 13.2814 16.4023 12.7787 16.4026H3.49536C3.24549 16.4025 2.99811 16.353 2.76743 16.257C2.53674 16.161 2.32731 16.0203 2.15115 15.8431C1.97499 15.6659 1.83558 15.4557 1.74093 15.2244C1.64629 14.9932 1.59827 14.7455 1.59964 14.4956V5.22272C1.59816 4.97325 1.6462 4.72597 1.74098 4.4952C1.83576 4.26443 1.9754 4.05477 2.1518 3.87837C2.32821 3.70196 2.53787 3.56232 2.76864 3.46754C2.9994 3.37276 3.24669 3.32472 3.49616 3.32621H7.04832"
                    stroke="#191919"
                    stroke-width="1.17533"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M14.6739 6.5949L11.405 3.32521M4.86719 12.0428V10.3103C4.86879 10.0246 4.98242 9.75016 5.18327 9.5477L12.8109 1.92003C12.9123 1.81788 13.0328 1.7368 13.1656 1.68147C13.2984 1.62614 13.4409 1.59766 13.5848 1.59766C13.7286 1.59766 13.8711 1.62614 14.0039 1.68147C14.1367 1.7368 14.2572 1.81788 14.3586 1.92003L16.0798 3.6413C16.1822 3.74251 16.2634 3.86301 16.3189 3.99584C16.3743 4.12867 16.4029 4.27117 16.4029 4.41511C16.4029 4.55904 16.3743 4.70155 16.3189 4.83438C16.2634 4.9672 16.1822 5.08771 16.0798 5.18892L8.45216 12.8166C8.24929 13.0179 7.97539 13.1315 7.68955 13.1327H5.95708C5.66802 13.1327 5.39081 13.0178 5.18641 12.8135C4.98202 12.6091 4.86719 12.3318 4.86719 12.0428Z"
                    stroke="#191919"
                    stroke-width="1.17533"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Button>
            </Tooltip>
            <Tooltip content="Delete">
              <Button
                onClick={() => handleDelete(item.id)}
                className="flex justify-center items-center lg:min-w-[36px] lg:max-w-[36px] lg:h-[36px] min-w-[30px] max-w-[30px] h-[30px] p-1.5 !border border-gray-400 rounded-full !bg-transparent hover:!bg-[#f2f2f2]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M7.43922 3.73171H10.5612C10.5612 3.31771 10.3967 2.92067 10.104 2.62793C9.81123 2.33519 9.41419 2.17073 9.00019 2.17073C8.58619 2.17073 8.18915 2.33519 7.89641 2.62793C7.60367 2.92067 7.43922 3.31771 7.43922 3.73171ZM6.26848 3.73171C6.26848 3.37297 6.33914 3.01775 6.47642 2.68633C6.6137 2.3549 6.81492 2.05376 7.06858 1.8001C7.32224 1.54644 7.62339 1.34522 7.95481 1.20794C8.28624 1.07066 8.64146 1 9.00019 1C9.35892 1 9.71414 1.07066 10.0456 1.20794C10.377 1.34522 10.6781 1.54644 10.9318 1.8001C11.1855 2.05376 11.3867 2.3549 11.524 2.68633C11.6612 3.01775 11.7319 3.37297 11.7319 3.73171H16.2197C16.375 3.73171 16.5238 3.79338 16.6336 3.90316C16.7434 4.01293 16.8051 4.16182 16.8051 4.31707C16.8051 4.47232 16.7434 4.62121 16.6336 4.73099C16.5238 4.84077 16.375 4.90244 16.2197 4.90244H15.1895L14.2763 14.3549C14.2062 15.0792 13.8689 15.7514 13.3301 16.2404C12.7913 16.7295 12.0896 17.0003 11.3619 17H6.63843C5.91091 17.0001 5.20944 16.7292 4.67078 16.2402C4.13213 15.7512 3.79491 15.0791 3.72487 14.3549L2.81092 4.90244H1.78068C1.62543 4.90244 1.47654 4.84077 1.36676 4.73099C1.25698 4.62121 1.19531 4.47232 1.19531 4.31707C1.19531 4.16182 1.25698 4.01293 1.36676 3.90316C1.47654 3.79338 1.62543 3.73171 1.78068 3.73171H6.26848ZM7.82946 7.43902C7.82946 7.28378 7.76779 7.13489 7.65801 7.02511C7.54823 6.91533 7.39934 6.85366 7.24409 6.85366C7.08884 6.85366 6.93995 6.91533 6.83018 7.02511C6.7204 7.13489 6.65873 7.28378 6.65873 7.43902V13.2927C6.65873 13.4479 6.7204 13.5968 6.83018 13.7066C6.93995 13.8164 7.08884 13.878 7.24409 13.878C7.39934 13.878 7.54823 13.8164 7.65801 13.7066C7.76779 13.5968 7.82946 13.4479 7.82946 13.2927V7.43902ZM10.7563 6.85366C10.9115 6.85366 11.0604 6.91533 11.1702 7.02511C11.28 7.13489 11.3417 7.28378 11.3417 7.43902V13.2927C11.3417 13.4479 11.28 13.5968 11.1702 13.7066C11.0604 13.8164 10.9115 13.878 10.7563 13.878C10.601 13.878 10.4522 13.8164 10.3424 13.7066C10.2326 13.5968 10.1709 13.4479 10.1709 13.2927V7.43902C10.1709 7.28378 10.2326 7.13489 10.3424 7.02511C10.4522 6.91533 10.601 6.85366 10.7563 6.85366ZM4.89014 14.2425C4.93224 14.677 5.13463 15.0802 5.45784 15.3735C5.78106 15.6669 6.20194 15.8294 6.63843 15.8293H11.3619C11.7984 15.8294 12.2193 15.6669 12.5425 15.3735C12.8658 15.0802 13.0681 14.677 13.1102 14.2425L14.014 4.90244H3.98634L4.89014 14.2425Z"
                    fill="#191919"
                  ></path>
                </svg>
              </Button>
            </Tooltip>
            <Tooltip content="Copy">
              <Button className="flex justify-center items-center lg:min-w-[36px] lg:max-w-[36px] lg:h-[36px] min-w-[30px] max-w-[30px] h-[30px] p-1.5 !border border-gray-400 rounded-full !bg-transparent hover:!bg-[#f2f2f2]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M14.1308 5.17773H7.60868C7.40297 5.17827 7.19939 5.21935 7.00957 5.29863C6.81976 5.37792 6.64744 5.49385 6.50247 5.6398C6.35751 5.78574 6.24274 5.95884 6.16473 6.14918C6.08672 6.33953 6.04701 6.54338 6.04787 6.74909V14.9285C6.04787 15.7961 6.74678 16.4999 7.60868 16.4999H14.1308C14.3365 16.4994 14.5401 16.4583 14.7299 16.379C14.9198 16.2997 15.0921 16.1838 15.237 16.0378C15.382 15.8919 15.4968 15.7188 15.5748 15.5284C15.6528 15.3381 15.6925 15.1343 15.6916 14.9285V6.74909C15.6916 5.88152 14.9927 5.17773 14.1308 5.17773Z"
                    stroke="#191919"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M11.9534 5.17784V3.07135C11.9534 2.65459 11.7888 2.25486 11.4961 1.96054C11.3516 1.81483 11.1797 1.69913 10.9903 1.62009C10.8009 1.54106 10.5978 1.50024 10.3925 1.5H3.87038C3.45687 1.5 3.05957 1.66541 2.76768 1.96054C2.47475 2.2561 2.31014 2.65522 2.30957 3.07135V11.2508C2.30957 11.6676 2.47416 12.0673 2.76687 12.3616C3.05957 12.6559 3.45606 12.8222 3.87038 12.8222H6.04741"
                    stroke="#191919"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Published Posts Table"
      border="none"
      shadow="none"
      radius="none"
      classNames={{
        wrapper: "p-0",
        th: "!rounded-none",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            className={`${
              column.key === "post" ? "p-0" : "sm:px-4 px-3"
            } bg-transparent lg:text-base text-sm font-normal text-left text-gray-800 border-b border-gray-400`}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={initialRows}>
        {(item) => (
          <TableRow key={item.id} className="border-b">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
            {/* {(columnKey) =>
              columnKey === "post" ? (
                <TableCell className="py-4 px-0">
                  <div className="flex items-center lg:pe-10 sm:pe-4 pe-0">
                    <Link
                      href={`/single-blog/${item.id}`}
                      className="flex w-full md:min-w-[80px] md:max-w-[80px] md:h-[80px] sm:min-w-[70px] sm:max-w-[70px] sm:h-[70px] min-w-[60px] max-w-[60px] h-[60px] md:me-4 me-3"
                    >
                      <Image
                        width="80"
                        height="80"
                        src={item.imgPath}
                        alt="post image"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div>
                      <h4 className="lg:text-base text-sm font-medium text-gray-900 hover:text-gray-800 mb-1">
                        <Link href={`/single-blog/${item.id}`}>
                          {item.title}
                        </Link>
                      </h4>
                      <p className="lg:text-sm text-xs text-gray-800">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </TableCell>
              ) : columnKey === "actions" ? (
                <TableCell className="md:p-4 p-3 ont-matter lg:text-base text-sm text-left text-gray-900 border-b border-gray-400">
                  <ul className="flex">
                    <li className="me-2">
                      <Button className="flex justify-center items-center lg:min-w-[36px] lg:max-w-[36px] lg:h-[36px] min-w-[30px] max-w-[30px] h-[30px] p-1.5 !border border-gray-400 rounded-full !bg-transparent hover:!bg-[#f2f2f2]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M14.6744 10.9539V14.5068C14.6742 15.0096 14.4744 15.4916 14.1189 15.8471C13.7634 16.2026 13.2814 16.4023 12.7787 16.4026H3.49536C3.24549 16.4025 2.99811 16.353 2.76743 16.257C2.53674 16.161 2.32731 16.0203 2.15115 15.8431C1.97499 15.6659 1.83558 15.4557 1.74093 15.2244C1.64629 14.9932 1.59827 14.7455 1.59964 14.4956V5.22272C1.59816 4.97325 1.6462 4.72597 1.74098 4.4952C1.83576 4.26443 1.9754 4.05477 2.1518 3.87837C2.32821 3.70196 2.53787 3.56232 2.76864 3.46754C2.9994 3.37276 3.24669 3.32472 3.49616 3.32621H7.04832"
                            stroke="#191919"
                            stroke-width="1.17533"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M14.6739 6.5949L11.405 3.32521M4.86719 12.0428V10.3103C4.86879 10.0246 4.98242 9.75016 5.18327 9.5477L12.8109 1.92003C12.9123 1.81788 13.0328 1.7368 13.1656 1.68147C13.2984 1.62614 13.4409 1.59766 13.5848 1.59766C13.7286 1.59766 13.8711 1.62614 14.0039 1.68147C14.1367 1.7368 14.2572 1.81788 14.3586 1.92003L16.0798 3.6413C16.1822 3.74251 16.2634 3.86301 16.3189 3.99584C16.3743 4.12867 16.4029 4.27117 16.4029 4.41511C16.4029 4.55904 16.3743 4.70155 16.3189 4.83438C16.2634 4.9672 16.1822 5.08771 16.0798 5.18892L8.45216 12.8166C8.24929 13.0179 7.97539 13.1315 7.68955 13.1327H5.95708C5.66802 13.1327 5.39081 13.0178 5.18641 12.8135C4.98202 12.6091 4.86719 12.3318 4.86719 12.0428Z"
                            stroke="#191919"
                            stroke-width="1.17533"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </Button>
                    </li>
                    <li className="me-2">
                      <Button
                        onClick={() => handleDelete(item.id)}
                        className="flex justify-center items-center lg:min-w-[36px] lg:max-w-[36px] lg:h-[36px] min-w-[30px] max-w-[30px] h-[30px] p-1.5 !border border-gray-400 rounded-full !bg-transparent hover:!bg-[#f2f2f2]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M7.43922 3.73171H10.5612C10.5612 3.31771 10.3967 2.92067 10.104 2.62793C9.81123 2.33519 9.41419 2.17073 9.00019 2.17073C8.58619 2.17073 8.18915 2.33519 7.89641 2.62793C7.60367 2.92067 7.43922 3.31771 7.43922 3.73171ZM6.26848 3.73171C6.26848 3.37297 6.33914 3.01775 6.47642 2.68633C6.6137 2.3549 6.81492 2.05376 7.06858 1.8001C7.32224 1.54644 7.62339 1.34522 7.95481 1.20794C8.28624 1.07066 8.64146 1 9.00019 1C9.35892 1 9.71414 1.07066 10.0456 1.20794C10.377 1.34522 10.6781 1.54644 10.9318 1.8001C11.1855 2.05376 11.3867 2.3549 11.524 2.68633C11.6612 3.01775 11.7319 3.37297 11.7319 3.73171H16.2197C16.375 3.73171 16.5238 3.79338 16.6336 3.90316C16.7434 4.01293 16.8051 4.16182 16.8051 4.31707C16.8051 4.47232 16.7434 4.62121 16.6336 4.73099C16.5238 4.84077 16.375 4.90244 16.2197 4.90244H15.1895L14.2763 14.3549C14.2062 15.0792 13.8689 15.7514 13.3301 16.2404C12.7913 16.7295 12.0896 17.0003 11.3619 17H6.63843C5.91091 17.0001 5.20944 16.7292 4.67078 16.2402C4.13213 15.7512 3.79491 15.0791 3.72487 14.3549L2.81092 4.90244H1.78068C1.62543 4.90244 1.47654 4.84077 1.36676 4.73099C1.25698 4.62121 1.19531 4.47232 1.19531 4.31707C1.19531 4.16182 1.25698 4.01293 1.36676 3.90316C1.47654 3.79338 1.62543 3.73171 1.78068 3.73171H6.26848ZM7.82946 7.43902C7.82946 7.28378 7.76779 7.13489 7.65801 7.02511C7.54823 6.91533 7.39934 6.85366 7.24409 6.85366C7.08884 6.85366 6.93995 6.91533 6.83018 7.02511C6.7204 7.13489 6.65873 7.28378 6.65873 7.43902V13.2927C6.65873 13.4479 6.7204 13.5968 6.83018 13.7066C6.93995 13.8164 7.08884 13.878 7.24409 13.878C7.39934 13.878 7.54823 13.8164 7.65801 13.7066C7.76779 13.5968 7.82946 13.4479 7.82946 13.2927V7.43902ZM10.7563 6.85366C10.9115 6.85366 11.0604 6.91533 11.1702 7.02511C11.28 7.13489 11.3417 7.28378 11.3417 7.43902V13.2927C11.3417 13.4479 11.28 13.5968 11.1702 13.7066C11.0604 13.8164 10.9115 13.878 10.7563 13.878C10.601 13.878 10.4522 13.8164 10.3424 13.7066C10.2326 13.5968 10.1709 13.4479 10.1709 13.2927V7.43902C10.1709 7.28378 10.2326 7.13489 10.3424 7.02511C10.4522 6.91533 10.601 6.85366 10.7563 6.85366ZM4.89014 14.2425C4.93224 14.677 5.13463 15.0802 5.45784 15.3735C5.78106 15.6669 6.20194 15.8294 6.63843 15.8293H11.3619C11.7984 15.8294 12.2193 15.6669 12.5425 15.3735C12.8658 15.0802 13.0681 14.677 13.1102 14.2425L14.014 4.90244H3.98634L4.89014 14.2425Z"
                            fill="#191919"
                          ></path>
                        </svg>
                      </Button>
                    </li>
                    <li>
                      <Button className="flex justify-center items-center lg:min-w-[36px] lg:max-w-[36px] lg:h-[36px] min-w-[30px] max-w-[30px] h-[30px] p-1.5 !border border-gray-400 rounded-full !bg-transparent hover:!bg-[#f2f2f2]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M14.1308 5.17773H7.60868C7.40297 5.17827 7.19939 5.21935 7.00957 5.29863C6.81976 5.37792 6.64744 5.49385 6.50247 5.6398C6.35751 5.78574 6.24274 5.95884 6.16473 6.14918C6.08672 6.33953 6.04701 6.54338 6.04787 6.74909V14.9285C6.04787 15.7961 6.74678 16.4999 7.60868 16.4999H14.1308C14.3365 16.4994 14.5401 16.4583 14.7299 16.379C14.9198 16.2997 15.0921 16.1838 15.237 16.0378C15.382 15.8919 15.4968 15.7188 15.5748 15.5284C15.6528 15.3381 15.6925 15.1343 15.6916 14.9285V6.74909C15.6916 5.88152 14.9927 5.17773 14.1308 5.17773Z"
                            stroke="#191919"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.9534 5.17784V3.07135C11.9534 2.65459 11.7888 2.25486 11.4961 1.96054C11.3516 1.81483 11.1797 1.69913 10.9903 1.62009C10.8009 1.54106 10.5978 1.50024 10.3925 1.5H3.87038C3.45687 1.5 3.05957 1.66541 2.76768 1.96054C2.47475 2.2561 2.31014 2.65522 2.30957 3.07135V11.2508C2.30957 11.6676 2.47416 12.0673 2.76687 12.3616C3.05957 12.6559 3.45606 12.8222 3.87038 12.8222H6.04741"
                            stroke="#191919"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </Button>
                    </li>
                  </ul>
                </TableCell>
              ) : columnKey === "categories" ? (
                <TableCell>
                  <Link
                    href="/"
                    className="flex md:text-sm text-xs text-gray-900 rounded-full px-[10px] py-[4px] bg-gray-500 w-fit"
                  >
                    {getKeyValue(item, columnKey)}
                  </Link>
                </TableCell>
              ) : (
                <TableCell className="md:p-4 p-3 ont-matter lg:text-base text-sm text-left text-gray-900 border-b border-gray-400">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )
            } */}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PublishedPostTable;

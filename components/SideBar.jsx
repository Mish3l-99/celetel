import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { AiFillAlert } from "react-icons/ai";
import { SiBitcoincash } from "react-icons/si";
import { RiSettings5Fill } from "react-icons/ri";
import { BiArrowFromLeft } from "react-icons/bi";
import { BsCloudArrowUpFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { GiArrowScope } from "react-icons/gi";
import { MdPages } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../store/sidebar";

const SideBar = () => {
  const [settingDrop, setSettingDrop] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.value);
  return (
    <div
      id="sidebar"
      className={
        isOpen
          ? "fixed left-0 md:relative w-full max-w-[260px] bg-white h-screen z-20 transition-all duration-500"
          : "fixed hidden"
      }
    >
      <div className="flex justify-between items-center bg-gray-100 py-2">
        <Image
          src="/logo.jfif"
          // src="/logo-transparent.png"
          height={50}
          width={120}
          objectFit="cover"
        />
        <span className="md:hidden" onClick={() => dispatch(closeSideBar())}>
          <ImCancelCircle />
        </span>
      </div>
      <div className="p-3">
        <ul className="text-gray-500">
          <li className="my-1 p-2 rounded text-lg active">
            <Link href="/">
              <span className="flex gap-x-2 items-center font-semibold">
                <FiHome />
                Dashboard
              </span>
            </Link>
          </li>
          <li className="my-1 p-2 rounded text-lg">
            <Link href="/">
              <span className="flex gap-x-2 items-center font-semibold">
                <IoIosPeople />
                Groups
              </span>
            </Link>
          </li>
          <li className="my-1 p-2 rounded text-lg ">
            <Link href="/">
              <span className="flex gap-x-2 items-center font-semibold">
                <AiFillAlert />
                Alerts
              </span>
            </Link>
          </li>
          <li className="my-1 p-2 rounded text-lg">
            <Link href="/">
              <span className="flex gap-x-2 items-center font-semibold">
                <SiBitcoincash />
                Banking
              </span>
            </Link>
          </li>
          <li
            onClick={() => setSettingDrop(!settingDrop)}
            className="my-1 p-2 rounded text-lg"
          >
            <div className="flex justify-between items-center">
              <span className="flex gap-x-2 items-center font-semibold">
                <RiSettings5Fill />
                Settings
              </span>
              <span
                className={
                  settingDrop ? "rotate-90 duration-700" : "duration-700"
                }
              >
                <BiArrowFromLeft />
              </span>
            </div>
          </li>
          {settingDrop && (
            <div className="options">
              <ul>
                <li className="py-1 px-2 rounded">
                  <Link href="/">
                    <span className="flex gap-x-2 items-center font-semibold">
                      <BsCloudArrowUpFill />
                      Upload
                    </span>
                  </Link>
                </li>
                <li className="py-1 px-2 rounded">
                  <Link href="/">
                    <span className="flex gap-x-2 items-center font-semibold">
                      <GiArrowScope />
                      Info
                    </span>
                  </Link>
                </li>
                <li className="py-1 px-2 rounded">
                  <Link href="/">
                    <span className="flex gap-x-2 items-center font-semibold">
                      <MdPages />
                      Pages
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

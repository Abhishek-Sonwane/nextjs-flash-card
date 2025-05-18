"use client";
import Image from "next/image";
import React, { useState } from "react";
import { asset } from "../../public/assets";
import Link from "next/link";
import { useStateContext } from "@/app/context";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const {
    currUser,
    setCurrUser,
    setToken,
    setIsLoggedIn,
    fetchUserData,
    fetchAllData,
  } = useStateContext();
  const [isProfile, setIsProfile] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setCurrUser(null);
    fetchAllData();

    window.location.href = "/";
  };
  return (
    <header className="bg-transparent">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href={"/"}>
              <Image src={asset.logo} alt="" className="w-10" />
            </Link>
          </div>

          {currUser ? (
            <div className="relative">
              <FaRegUser
                onClick={() => setIsProfile(!isProfile)}
                className="w-9 h-9 rounded-full bg-white p-1 text-teal-600 border border-gray-600 cursor-pointer hover:shadow-xl"
              />
              {isProfile && (
                <div className="absolute w-36 h-fit bg-white rounded-lg mt-2 -right-[10%] z-50 flex flex-col gap-1 py-2 shadow-xl border-2 border-gray-200 transition-all duration-1000 ease-in-out ">
                  <Link
                    href={"/profile"}
                    onClick={() => setIsProfile(false)}
                    className="w-full text-lg font-normal px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    Your Profile
                  </Link>
                  <div
                    className="w-full text-lg font-normal px-3 py-1 hover:bg-gray-100 cursor-pointer "
                    onClick={() => logout()}
                  >
                    Log Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  href="/log-in"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="/sign-up"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";
import { useStateContext } from "@/app/context";
import React from "react";
import { FaRegUser } from "react-icons/fa";

const Page = () => {
  const { currUser } = useStateContext();
  console.log(currUser);

  return (
    <>
      {currUser && (
        <div className="w-full min-h-[600px] h-[70vh] flex items-center justify-center">
          <div className="w-sm h-fit bg-white border border-teal-300 rounded-lg shadow-lg  flex flex-col items-center justify-center">
            <div className="w-full p-4 relative">
              <h1 className="text-3xl font-medium">User Profile</h1>
              <h3 className="text-lg font-normal mt-2 text-gray-500 ">
                This is some information about the user.
              </h3>

              <FaRegUser className="absolute w-16 h-16 bg-gray-300 rounded-full -top-6 right-8 p-2 text-teal-500 border border-teal-300 shadow-sm " />
            </div>
            <hr className="w-full text-teal-300" />
            <div className="w-full flex p-4 ">
              <h1 className="text-gray-600 min-w-[120px] ">Full Name</h1>
              <h2 className="">{currUser.name}</h2>
            </div>
            <hr className="w-full text-teal-300" />
            <div className="w-full flex p-4 ">
              <h1 className="text-gray-600 min-w-[120px] ">Email Address</h1>
              <h2 className="">{currUser.email}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

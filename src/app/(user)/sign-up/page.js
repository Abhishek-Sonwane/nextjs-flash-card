"use client";
import { useStateContext } from "@/app/context";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const { signUp } = useStateContext();
  const { register, handleSubmit } = useForm();

  const handleLoggedIn = async (data) => {
    const { name, email, password } = data;

    signUp({ name, email, password });
  };
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-2">
      <div className="relative ">
        <div className="w-sm min-h-[440px] bg-white  rounded-4xl border border-gray-200 shadow flex flex-col gap-8 px-6 py-10 justify-center">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleLoggedIn)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                {...register("name")}
                placeholder="Enter Name"
                className="outline-none border-b border-gray-200 rounded-xl shadow px-4 py-2 text-[16px] font-normal text-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-medium">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                {...register("email")}
                placeholder="Enter Email Address"
                className="outline-none border-b border-gray-200 rounded-xl shadow px-4 py-2 text-[16px] font-normal text-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                name="password"
                {...register("password")}
                placeholder="Enter Password"
                className="outline-none border-b border-gray-200 rounded-xl shadow px-4 py-2 text-[16px] font-normal text-gray-600 "
              />
            </div>

            <div className="flex flex-col items-center w-full gap-2">
              <button
                className="text-lg w-full  hover:bg-blue-500/90 font-semibold p-1 rounded-full cursor-pointer mt-4 bg-gradient-to-tr from-blue-500/50 to-cyan-300/50  hover:from-blue-500 hover:to-cyan-300"
                type="submit"
              >
                Create Account
              </button>
              <h1>
                Already have an Account?{" "}
                <Link
                  href={"/sign-up"}
                  className="hover:text-blue-600 underline"
                >
                  Log In
                </Link>
              </h1>
            </div>
          </form>
        </div>
        <div className="w-sm hidden sm:block min-h-[440px] bg-gradient-to-tr from-blue-500 to-cyan-300 rounded-4xl absolute top-0 transform -skew-y-6 sm:skew-y-0 sm:rotate-12 rotate-6 -z-10 shadow-2xl"></div>
      </div>
    </div>
  );
};

export default Page;

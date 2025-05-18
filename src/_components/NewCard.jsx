import { useStateContext } from "@/app/context";
import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const NewCard = ({ setNewCard }) => {
  const { addNewCard } = useStateContext();
  const { register, handleSubmit } = useForm();
  const handleNewCard = (data) => {
    addNewCard(data);
    setNewCard(false);
  };
  return (
    <div className="w-screen h-screen bg-white/35 backdrop-blur-md fixed top-0 left-0 z-50 flex flex-col items-center justify-center ">
      <div className="relative ">
        <div className="w-sm min-h-[440px] bg-white  rounded-4xl border border-gray-200 shadow flex flex-col gap-8 px-6 py-10 justify-center">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">ADD NEW CARD</h1>
            <IoClose
              className="w-7 h-7 cursor-pointer"
              onClick={() => setNewCard(false)}
            />
          </div>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleNewCard)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-lg font-medium">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                {...register("title")}
                placeholder="Enter Title"
                className="outline-none border-b border-gray-200 rounded-xl shadow px-4 py-2 text-[16px] font-normal text-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-lg font-medium">
                DESCRIPTION
              </label>
              <textarea
                id="description"
                required
                name="description"
                {...register("description")}
                placeholder="Enter Description"
                className="outline-none border-b border-gray-200 rounded-xl shadow px-4 py-2 text-[16px] font-normal text-gray-600 "
              ></textarea>
            </div>

            <div className="flex flex-col items-center w-full gap-2">
              <button className="text-lg w-full  hover:bg-blue-500/90 font-semibold p-1 rounded-full cursor-pointer mt-4 bg-gradient-to-tr to-blue-500/50 from-cyan-300/50  hover:to-blue-500 hover:from-cyan-300">
                CREATE
              </button>
            </div>
          </form>
        </div>
        <div className="w-sm hidden sm:block h-[440px] bg-gradient-to-tr to-blue-500 from-cyan-300 rounded-4xl absolute top-0 transform -skew-y-6 sm:skew-y-0 sm:-rotate-12 -rotate-6 -z-10 shadow-2xl"></div>
      </div>
    </div>
  );
};

export default NewCard;

"use client";
import { useStateContext } from "@/app/context";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const Card = ({ id, title, description, isKnown }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { deleteCard, knownCard } = useStateContext();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleButtonClick = (e, id, isKnown) => {
    e.stopPropagation();

    knownCard(id, isKnown);
  };

  const handleDeleteCard = (e, id) => {
    e.stopPropagation();

    deleteCard(id);

    // console.log(id);

    setIsFlipped(false);

    toast("Card Deleted Sucessfully.");
  };
  <div className=" text-2xl text-black">Add New Card</div>;
  return (
    <>
      <div
        className="h-40 cursor-pointer hover:scale-110 transition-transform transform duration-300 ease-in-out"
        onClick={handleCardClick}
      >
        <div className={`flip-inner ${isFlipped ? "is-flipped" : ""} relative`}>
          <div className="flip-front">
            <button
              onClick={(e) => handleDeleteCard(e, id)}
              className="absolute cursor-pointer top-0 right-0 pr-6 pt-3 text-sm font-light text-teal-200 hover:text-black"
            >
              <IoClose className="w-7 h-7" />
            </button>
            {title}
          </div>
          <div className="flip-back ">
            <div className="m-2 w-full h-full pb-8 text-center rounded-xl bg-inherit text-ellipsis text-pretty overflow-y-scroll scroll-auto  ">
              {description}
            </div>
            <div className="absolute bottom-0 right-0 w-full h-fit pl-7 pr-9 bg-white rounded-b-3xl pb-2 pt-1.5 ">
              <label className="themeSwitcherTwo relative inline-flex select-none items-center  ">
                <input
                  type="checkbox"
                  checked={isKnown}
                  onChange={(e) => handleButtonClick(e, id, isKnown)}
                  className="sr-only"
                />
                <span className="label flex items-center text-xs font-medium text-black">
                  Known
                </span>
                <span
                  className={`slider mx-4 flex h-5 w-[40px] items-center rounded-full p-1 duration-200 ${
                    isKnown ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                  }`}
                >
                  <span
                    className={`dot h-3 w-3 rounded-full bg-white duration-200 ${
                      isKnown ? "translate-x-[20px]" : ""
                    }`}
                  ></span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

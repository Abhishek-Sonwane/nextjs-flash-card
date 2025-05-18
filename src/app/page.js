"use client";
import Card from "@/_components/Card";
import React, { useEffect, useState } from "react";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { useStateContext } from "./context";
import NewCard from "@/_components/NewCard";
import { CiSearch } from "react-icons/ci";

const Page = () => {
  const { setSearchQuery, filteredData, allData, setFilterOption } =
    useStateContext();
  const [newCard, setNewCard] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 mt-10 relative">
      <div>
        <div className="border-b border-gray-500 py-2 flex justify-between items-center">
          <h1 className="text-2xl lg:text-3xl font-semibold">Flash Cards</h1>

          <div className="flex items-center gap-4 ">
            <div className="rounded-full bg-white border-2 border-gray-300 px-2">
              <select
                name="known"
                id="filterOption"
                onChange={(e) => setFilterOption(e.target.value)}
                className=" rounded-full px-2 py-1 text-md text-shadow-sm font-medium outline-none text-gray-500 "
              >
                <option value="">All</option>
                <option value={true}>Known</option>
                <option value={false}>Not Known</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                className="bg-white rounded-full px-4 py-1 text-md text-shadow-sm font-medium outline-none text-gray-500 border-2 border-gray-300 "
              />
            </div>
          </div>

          <div
            className="pr-6 flex gap-3 items-center border border-gray-300 rounded-xl px-4 py-1 text-teal-600 bg-white hover:shadow-md cursor-pointer hover:bg-gray-300"
            onClick={() => setNewCard(true)}
          >
            <RiStickyNoteAddLine className="w-5 h-5" />
            <h1 className="text-base font-medium hidden sm:block">
              Add Flash Card
            </h1>
          </div>
        </div>

        {allData ? (
          <>
            {filteredData ? (
              <div>
                {filteredData.length > 0 ? (
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 my-4 gap-4 `}
                  >
                    {filteredData.map((item, index) => (
                      <Card
                        key={index}
                        id={item._id}
                        title={item.title}
                        description={item.description}
                        isKnown={item.isKnown}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full min-h-fit flex flex-col items-center justify-center py-20 gap-2">
                    <CiSearch className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 p-1" />

                    <h1 className="text-lg font-medium">No Data Found</h1>

                    <h4 className="text-base font-normal text-center">
                      Try Searching for another flash card <br />{" "}
                      <span className="text-lg font-medium">or</span>
                    </h4>

                    <div
                      className="pr-6 flex gap-3 items-center border border-gray-300 rounded-xl px-4 py-1 text-teal-600 bg-white hover:shadow-md cursor-pointer hover:bg-gray-300"
                      onClick={() => setNewCard(true)}
                    >
                      <RiStickyNoteAddLine className="w-5 h-5" />
                      <h1 className="text-base font-medium">Add Flash Card</h1>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full min-h-52 h-[50vh] ">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full min-h-fit flex flex-col items-center justify-center py-20 gap-2">
            <CiSearch className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 p-1" />

            <h1 className="text-lg font-medium">No Data Found</h1>

            <h4 className="text-base font-normal">
              Create your first flash card
            </h4>

            <div
              className="pr-6 flex gap-3 items-center border border-gray-300 rounded-xl px-4 py-1 text-teal-600 bg-white hover:shadow-md cursor-pointer hover:bg-gray-300"
              onClick={() => setNewCard(true)}
            >
              <RiStickyNoteAddLine className="w-5 h-5" />
              <h1 className="text-base font-medium">Add Flash Card</h1>
            </div>
          </div>
        )}
      </div>
      {newCard && <NewCard setNewCard={setNewCard} />}
    </div>
  );
};

export default Page;

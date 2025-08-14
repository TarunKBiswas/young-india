/* eslint-disable react/prop-types */
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoStar, IoStarHalfSharp } from "react-icons/io5";
import { webState } from "../../../data/webStates";
import Coarse from "../UI/Icon/Coarse";
import { IP } from "../../../utils/Store/Constant";

const TestimonialsCard = ({ data }) => {
  const videoHandler = () => {
    if (data?.video) {
      webState.videoUrl = data?.video?.url;
      webState.testimonialVideo = true;
    }
  };

  function stripHtmlTags(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const backendRichText = data?.content;
  const plainText = stripHtmlTags(backendRichText);

  return (
    <>
      <div
        className="min-w-[200px] lg:min-w-[320px] bg-white border-2 border-gray-100 relative shadow-sm p-1 lg:p-0  md:mx-0 "
        // onClick={() => {
        //   videoHandler();
        // }}
      >
        <div className=" p-1.5  flex flex-col min-h-[170px] lg:min-h-[240px]  justify-around ">
          <div className=" self-stretch flex-col justify-start items-start gap-3 inline-flex">
            <div className=" justify-start items-center gap-3 inline-flex">
              <div className="flex items-center gap-4 ">
                {data?.user?.avatar ? (
                  <img
                    width={"auto"}
                    height={"auto"}
                    alt="image"
                    src={data?.user?.avatar?.url}
                    className="rounded-full w-20 h-20 object-cover object-top"
                  />
                ) : (
                  <div className="bg-gray-600 text-white capitalize border rounded-full text-[36px] flex items-center justify-center font-semibold w-20 h-20">
                    {data?.user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                <div className=" text-zinc-800 text-lg lg:text-lg font-semibold leading-7 tracking-wide capitalize">
                  {data?.user?.name}
                </div>

                <div className=" text-neutral-600 text-xs font-medium leading-none">
                  {data?.user?.email}
                </div>
              </div>
            </div>
            {/* {data?.video?.url ? (
              <div className="absolute w-full h-full flex items-center justify-center left-0 top-0">
                <div className="p-1 rounded-full w-max h-max  flex bg-white items-center justify-center cursor-pointer">
                  <FaPlayCircle className=" w-8 h-8 text-themecolor" />
                </div>
              </div>
            ) : null} */}

            <span className="">
              
              <Coarse />
            </span>
            <div className=" flex-col flex">
              <div className="capitalize text-neutral-700 text-sm font-normal leading-6 tracking-tight">
                {data?.content}
              </div>
              <div className="flex justify-start items-center gap-2 mt-2 ">
                {Array.from({ length: data?.rating })?.map((_, i) => (
                  <IoStar className="fill-[#FDAF4E] w-5 h-5 " key={i} />
                ))}
                {data?.rating % 1 !== 0 && (
                  <IoStarHalfSharp className="fill-[#FDAF4E] w-6 h-6" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsCard; 
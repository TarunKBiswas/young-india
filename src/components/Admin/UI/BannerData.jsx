import React, { useState } from "react";
import OutletWrapper from "../../../Pages/OutletWrapper";
const sectionContent = [
  {
    title: "24 x 7 Lifetime access",
  },
  {
    title: "Drafted by Lakshit Sethiya",
  },
  {
    title: " Explained in Hindi + English",
  },
];

const BannerData = ({ video, thumbnail, title1, title2 }) => {
  const [playVideo, setPlayvideo] = useState();
  return (
    <div className="bg-[#0d66ff] text-white py-12">
      <OutletWrapper>
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-16  h-full  ">
          {/* <div className="w-full md:w-1/2 h-80 flex justify-center items-center ">
            <img
              src="https://course.socialseller.in/socialseller/src/assets/img/thumb.png"
              alt="Video Thumbnail"
              className="w-full md:w-2/3 h-full object-cover"
            />
          </div>
          
          */}

          <div
            className="w-full md:w-1/2 relative flex items-center justify-center h-80"
            onClick={() => setPlayvideo(!playVideo)}
          >
            {playVideo && (
              <iframe
                title="C0910 -Startup Academy - AD Video"
                allow="autoplay; fullscreen"
                allowtransparency="true"
                frameborder="0"
                class="wistia_embed"
                name="wistia_embed"
                msallowfullscreen
                width="100%"
                height="100%"
                src={video}
              ></iframe>
            )}
            {!playVideo && (
              <div className="h-full relative">
                <img
                  src={thumbnail}
                  alt="img"
                  className="object-contain m-auto h-full"
                />

                {/* <div className=" w-full flex items-center cursor-pointer justify-center h-full absolute top-0 left-0 "> */}
                {/* <PlayCircleIcon className=" text-white" /> */}
                {/* </div> */}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-start h-full justify-start">
            <h2 className="text-3xl md:text-4xl tracking-wider font-normal leading-9 mb-4 text-white max-w-[570px]">
              {title1}
              <span className="font-semibold px-2">{title2}</span>
            </h2>
            <ul className="space-y-2 text-lg ">
              {sectionContent?.map((s, i) => {
                return (
                  <li className="flex items-center" key={i}>
                    <span className="text-green-500 mr-2">✔</span>
                    {s?.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </OutletWrapper>
    </div>
  );
};

export default BannerData;

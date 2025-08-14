import React from "react";
import { PrimaryButton } from "./Buttons";

const statsData = [
  {
    stats: "2011",
    title: "Founded",
  },
  {
    stats: "5000+",
    title: "Products",
  },
  {
    stats: "99.9%",
    title: "Satisfied Customer",
  },
];

const Stats = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <span className="text-neutral-100 text-lg lg:text-2xl 2xl:text-4xl font-normal text-start leading-10 tracking-tight">
        Selling Branded Products Since 2011
      </span>
      <span className="text-neutral-100 sm:mt-2  text-sm lg:mt-7  2xl:text-base font-light text-start leading-loose tracking-tight">
        Figma ipsum component variant main layer. Pencil outline main layer
        layer. Pencil outline main layer object team invite list rotate. Flows
        style scrolling mask boolean.
      </span>
      <div className="flex items-center  justify-start mt-2 gap-4 lg:mt-4 2xl:mt-7">
        {statsData.map((sta, i) => {
          return (
            <div
              className=" flex flex-col items-start gap-1 mt-3 justify-start "
              key={i}
            >
              <div className=" text-neutral-100 font-normal  lg:text-xl 2xl:text-2xl  lg:font-medium uppercase  tracking-tight">
                {sta?.stats}
              </div>
              <div className="text-neutral-100 text-xs lg:text-sm 2xl:text-base font-light lg:font-normal tracking-tight">
                {sta?.title}
              </div>
            </div>
          );
        })}
      </div>
      <PrimaryButton title={"Explore"} className={"border"}/>
    </div>
  );
};

export default Stats;

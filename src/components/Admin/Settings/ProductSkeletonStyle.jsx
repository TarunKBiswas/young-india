/* eslint-disable react/prop-types */
import { BiBox } from "react-icons/bi";

export const ProductSkeletonStyle = ({ aspect }) => {
  let shape = aspect === "PORTRAIT" ? "auto min-h-[120px]" : "square h-auto";
  return (
    <div className="max-w-full  p-0 border border-gray-100 rounded ">
      <div
        className={`flex items-center justify-center w-full aspect-${shape} bg-gray-300 rounded max-h-[280px]`}
      >
        <BiBox className="w-10 h-10 text-gray-200 " />
      </div>
      <div className="p-2">
        <div className="h-1.5 bg-gray-200 rounded-full w-full mb-1"></div>
        <div className="h-1 bg-gray-200 rounded-full w-5 "></div>
      </div>
    </div>
  );
};

export const ProductSkeletonStyleMobile = ({ aspect, row }) => {
  let hStyle = "";

  switch (row) {
    case "1":
      hStyle = "h-[280px]";
      break;
    case "2":
      hStyle = "h-[200px]";
      break;
    case "3":
      hStyle = "h-[140px]";
      break;
    case "4":
      hStyle = "h-[100px]";
      break;
    default:
      hStyle = "h-[100px]";
  }

  let shape = aspect === "PORTRAIT" ? `auto ${hStyle} ` : "square  h-auto";
  return (
    <div className="max-w-full  p-0 border border-gray-100 rounded ">
      <div
        className={`flex items-center justify-center w-full aspect-${shape} bg-gray-300 rounded `}
      >
        <BiBox className="w-10 h-10 text-gray-200 " />
      </div>
      <div className="p-2">
        <div className="h-1.5 bg-gray-200 rounded-full w-full mb-1"></div>
        <div className="h-1 bg-gray-200 rounded-full w-5 "></div>
      </div>
      {/* <span
        className="hidden h-[280px]
h-[250px]
h-[200px]
h-[150px]
h-[100px]"
      ></span> */}
    </div>
  );
};

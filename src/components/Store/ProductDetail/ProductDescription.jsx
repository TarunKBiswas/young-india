import React from "react";
import CopyText from "../UI/Icon/CopyText";
import { notify } from "../UI/HotToast";

// const prodInfo = [
//   { name: " White T-shirt for men" },
//   { name: "Solid" },
//   { name: "Regular length" },
//   { name: "Short, regular sleeves" },
//   { name: " Knitted pure cotton fabric" },
//   { name: " Button closure" },
// ];

const ProductDescription = ({ data }) => {
  const copyDescHandler = (info) => {
    navigator.clipboard.writeText(info);
    notify("Copied");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full mt-3">
      <div className="w-full flex items-center justify-between cursor-pointer">
        <span className="text-neutral-800 text-sm lg:text-base font-medium leading-normal">
          Product Description
        </span>

        <CopyText
          className="text-gray-500 h-3 w-3 lg:h-5 lg:w-5 cursor-pointer"
          onClick={() => {
            copyDescHandler(data);
          }}
        />
      </div>
      <div className="w-full flex flex-col items-start capitalize justify-start gap-4 mt-3">
        <span
          className="text-neutral-800 text-opacity-70 text-xs lg:text-base font-normal leading-tight"
          dangerouslySetInnerHTML={{ __html: data }}
        />
        {/* 
        <div className="w-full flex flex-col items-start justify-start gap-2 ">
          {prodInfo?.map((item, i) => {
            return (
              <span
                className="text-neutral-800 text-opacity-70 text-xs lg:text-sm font-normal leading-tight"
                key={i}
              >
                {item?.name}
              </span>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default ProductDescription;

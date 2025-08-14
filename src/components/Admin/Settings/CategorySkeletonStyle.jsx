/* eslint-disable react/prop-types */
import { BiBox } from "react-icons/bi";

const CategorySkeletonStyle = ({ aspect }) => {
  let shape = aspect;
  return (
    <div
      className={`min-w-[100px] p-0 border border-gray-100 rounded ${
        shape === "LANDSCAPE" ? "h-[60px]  " : "h-[100px]"
      }   mx-auto `}
    >
      <div
        className={`flex items-center  justify-center h-full w-full bg-gray-300 rounded `}
      >
        <BiBox className="w-10 h-10 text-gray-200 " />
      </div>
    </div>
  );
};

export default CategorySkeletonStyle;

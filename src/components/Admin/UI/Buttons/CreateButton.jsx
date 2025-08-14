/* eslint-disable react/prop-types */
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const CreateButton = ({ title, action, to }) => {
  return (
    <Link
      className="button bg-[#222222] "
      type="button"
      onClick={action}
      to={to}
    >
      <span className="button__text">{title}</span>
      <span className="button__icon bg-[#222222]">
        <BsPlus className="h-5 w-5 text-white" />
      </span>
    </Link>
    // <Link
    //   className="w-full  h-10 px-2.5 flex items-center justify-center cursor-pointer bg-blue-100 hover:bg-white transition-all duration-300 border  gap-2 rounded "
    //   onClick={action}
    //   to={to}
    // >
    //   {Icon ? (
    //     <Icon className="text-gray-600 h-5" />
    //   ) : (
    //     <BsPlus className="h-5 w-5 text-white" />
    //   )}
    //   <span className="font-medium capitalize text-sm text-gray-700">
    //     {title}
    //   </span>
    // </Link>
  );
};

export default CreateButton;

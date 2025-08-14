/* eslint-disable react/prop-types */

import { BsTrash } from "react-icons/bs";

const GroupCard = ({ group, handleWhatsAppClick, deleteHandler }) => {
  return (
    <div
      className="w-full flex flex-col p-3 rounded-md border cursor-pointer hover:scale-95 transition-all duration-500 ease-in-out   group"
      onClick={() => handleWhatsAppClick(group?.url)}
    >
      <div className="flex items-center justify-between w-full">
        <h1>
          Name: <span className="font-semibold">{group?.name}</span>
        </h1>
        <p className="flex items-center gap-2">
          <span
            className="cursor-pointer hover:scale-110 transition-all duration-300 "
            onClick={() => deleteHandler(group?.id)}
          >
            <BsTrash className="h-4 w-4 text-red-500 group-hover:text-red-800 transition-all duration-500" />
          </span>
        </p>
      </div>
      <div className="pt-3">
        <p>
          URL:
          <span className="text-sm text-[#222222]  transition-all duration-500">
            {group?.url?.slice(0, 40)}...
          </span>
        </p>
      </div>
    </div>
  );
};

export default GroupCard;

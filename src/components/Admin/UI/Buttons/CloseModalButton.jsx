/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { BsFillXCircleFill } from "react-icons/bs";

const CloseModalButton = ({ closeModalHandler }) => {
  return (
    <button onClick={closeModalHandler} type="button">
      <BsFillXCircleFill className="w-8 h-8 p-1.5 bg-slate-200 rounded-full fill-black cursor-pointer hover:p-2 transition-all duration-300" />
      <span className="sr-only">Close modal</span>
    </button>
  );
};

export default CloseModalButton;

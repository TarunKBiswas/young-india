/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const SettingsButtonSubmit = ({ className, title, func }) => {
  return (
    <button
      className={`px-3 py-2 text-sm bg-[#222222] rounded-md text-white transition-all duration-500 
            ${className}`}
      onClick={(e) => func}
    >
      {title}
    </button>
  );
};

export default SettingsButtonSubmit;

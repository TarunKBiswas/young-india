/* eslint-disable react/prop-types */

import { BsDownload } from "react-icons/bs";

export const ExportButton = ({ action, text }) => {
  return (
    <button
      className="button bg-[#222222] hover:bg-[#222222]/95"
      type="button"
      onClick={action}
    >
      <span className="button__text">{text}</span>
      <span className="button__icon bg-[#222222]">
        <BsDownload className="h-5 w-5 text-white" />
      </span>
    </button>
  );
};

/* eslint-disable react/prop-types */

import { Popover } from "@headlessui/react";

const SubCatPopOver = ({ data }) => {
  return (
    <Popover className="relative">
      <Popover.Button>
        <span className="numberCircle bg-[#222222] text-white">{data}</span>
      </Popover.Button>
    </Popover>
  );
};

export default SubCatPopOver;

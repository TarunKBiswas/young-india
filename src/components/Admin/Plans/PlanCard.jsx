/* eslint-disable react/prop-types */

import { BsInfoCircleFill } from "react-icons/bs";

const PlanCard = ({ plan, planDetailModalHandler }) => {
  return (
    <div
      className="border hover:bg-[#222222] hover:text-white transition duration-500 rounded-md flex items-start justify-between py-2 px-3"
      key={plan?.id}
    >
      <div className="flex items-center">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold flex gap-2">{plan?.name}</span>
          <span className="text-sm">{plan?.validity + " Days"} </span>
          <span className="text-sm font-medium">₹ {plan?.price}</span>
        </div>
      </div>
      <BsInfoCircleFill
        className="w-6 h-6 p-1.5 bg-[#222222] rounded-full fill-white cursor-pointer hover:p-2 transition-all duration-200"
        onClick={() => planDetailModalHandler(plan?.id)}
      />
    </div>
  );
};

export default PlanCard;

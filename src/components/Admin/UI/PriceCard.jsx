/* eslint-disable react/prop-types */
import { FaIndianRupeeSign } from "react-icons/fa6";

const PriceCard = ({
  plan,
  price,
  duration,
  bgColor,
  desc,
  desc1,
  btncolor,
  offer,
  pay,
  type,
}) => {
  return (
    <div className="w-full bg-white p-3 shadow rounded-[12px] opacity-100 animate__animated animate__fadeInUp">
      <div className=" flex flex-col rounded-[10px] h-full justify-between gap-1">
        <div
          className={`flex flex-col p-[18px] gap-3 rounded-[10px] bg-[#e8f0ff] text-left ${bgColor}`}
        >
          <span className=" gap-3 flex flex-row font-Poppins font-medium text-[14px] leading-[21px] items-center">
            {plan} <span className="px-2">{offer}</span>
          </span>
          <span className="flex gap-1">
            <span className="text-[27px] flex leading-6 font-semibold font-roboto ">
              <FaIndianRupeeSign />
              <span className="text-[32px]">{price}</span>
            </span>
            <span className="pt-1 font-Poppins font font-medium text-[14px]">
              {duration}
            </span>
          </span>

          <div className="font-Poppins font font-medium text-[14px] flex flex-col ">
            <span>{desc}</span>
            <span className="font-semibold"> {desc1}</span>
          </div>
        </div>

        <div
          className={`h-[54px] w-full rounded px-[15px]  text-4 font-semibold leading-6 font-Poppins cursor-pointer justify-center items-center flex  ${btncolor} `}
          onClick={() => pay(type)}
        >
          Pay Now
        </div>
      </div>
    </div>
  );
};

export default PriceCard;

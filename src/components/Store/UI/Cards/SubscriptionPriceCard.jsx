import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

/* eslint-disable react/prop-types */
const SubscriptionPriceCard = ({ data, planId }) => {
  const handleOnClick = () => {
    planId(data?.id);
  };

  return (
    <div className="px-3 flex flex-col min-h-[200px] lg:min-h-[300px]  justify-around ">
      <h3 className="text-lg md:text-2xl font-semibold text-themecolor">
        {data?.attributes?.name}
      </h3>
      <p className="text-xl md:text-3xl font-bold text-black ">
        ₹{data?.attributes?.price}{" "}
        <span className="text-sm md:text-base font-normal">
          / {data?.attributes?.days} Days
        </span>
        {/* <span className=" text-base text-gray-600 font-normal">
          One-time payment
        </span> */}
      </p>

      <div className="flex gap-1 my-2 lg:gap-3 text-base font-normal items-center md:my-4">
        <div className="flex flex-col gap-2  md:gap-3 text-[16px]">
          <p>
            {data?.attributes?.premiumPricing ? (
              <AiOutlineCheck className="w-7 h-5 text-green-600" />
            ) : (
              <RxCross2 className="w-7 h-5 text-themecolor " />
            )}
          </p>
          <p>
            {data?.attributes?.prepaidAllowed ? (
              <AiOutlineCheck className="w-7 h-5 text-green-600" />
            ) : (
              <RxCross2 className="w-7 h-5 text-themecolor " />
            )}
          </p>
          <p>
            {data?.attributes?.price ? (
              <AiOutlineCheck className="w-7 h-5 text-green-600" />
            ) : (
              <RxCross2 className="w-7 h-5 text-themecolor " />
            )}
          </p>
        </div>

        <div className="flex flex-col text-black/50 gap-2 md:gap-3 tracking-wide text-sm">
          <span>Premium Pricing</span>
          <span>Prepaid Orders</span>
          <span>COD Orders</span>
        </div>
      </div>

      <div className="w-full text-center">
        <button
          onClick={handleOnClick}
          className="w-full inline-flex items-center justify-center px-3 py-1.5 text-xs mt-3 md:mt-6 md:text-base font-medium text-white transition-all duration-200 bg-themecolor rounded-md"
        >
          Buy now
        </button>
        {/* <span className="py-2 text-xs text-center text-gray-500">
          {data?.attributes?.description?.length > 60
            ? ` ${data?.attributes?.description?.substring(0, 60)}...`
            : data?.attributes?.description}
        </span> */}
      </div>
    </div>
  );
};

export default SubscriptionPriceCard;

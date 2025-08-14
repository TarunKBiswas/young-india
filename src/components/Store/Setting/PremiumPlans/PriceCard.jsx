import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

/* eslint-disable react/prop-types */
const PriceCard = ({ data, planId }) => {
  const handleOnClick = () => {
    planId(data?.id);
  };

  return (
    <div className="p-3 flex flex-col justify-between min-h-[400px] max-h-[600px]  gap-2">
      <div className="w-full flex flex-col gap-1">
        <h3 className="text-2xl font-semibold text-themecolor">{data?.name}</h3>
        <p className="text-2xl font-bold ">
          ₹{data?.price}
          <span className="text-base font-normal">/ {data?.validity} Days</span>
          <span className=" text-base text-gray-600 font-normal">
            One-time payment
          </span>
        </p>
      </div>
      <div className="flex flex-col text-black/50 gap-3 tracking-wide text-sm">
        <div className="w-full flex items-center gap-2">
          <span>Premium Pricing: </span>
          {data?.premium_pricing ? (
            <AiOutlineCheck className="w-7 h-5 text-green-600" />
          ) : (
            <RxCross2 className="w-7 h-5 text-red-500 " />
          )}
        </div>
        <div className="w-full flex items-center gap-2">
          <span>Prepaid Allowed: </span>
          {data?.prepaid_allowed ? (
            <AiOutlineCheck className="w-7 h-5 text-green-600" />
          ) : (
            <RxCross2 className="w-7 h-5 text-red-500 " />
          )}
        </div>
        <div className="w-full flex items-center gap-2">
          <span>Cash on Delivery: </span>
          {data?.cod_allowed ? (
            <AiOutlineCheck className="w-7 h-5 text-green-600" />
          ) : (
            <RxCross2 className="w-7 h-5 text-red-500 " />
          )}
        </div>
      </div>

      <div className="w-full text-center">
        <button
          onClick={handleOnClick}
          className="w-full inline-flex items-center rounded justify-center px-3 py-1.5 mt-6 text-sm text-white transition-all duration-200 bg-themecolor "
        >
          Buy now
        </button>
        <span className="py-2 text-xs text-center text-gray-500">
          {data?.description?.length > 60
            ? ` ${data?.description?.substring(0, 60)}...`
            : data?.description}
        </span>
      </div>
    </div>
  );
};

export default PriceCard;

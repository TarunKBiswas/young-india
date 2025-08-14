/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PremiumPlans from "./Icon/PremiumPlans";

export const ResellerPriceBadge = ({ price, action, description }) => {
  return (
    <div
      className="w-max  h-7 px-2.5 py-0.5 bg-neutral-800 rounded-3xl justify-start items-center gap-2 inline-flex"
      onClick={action}
    >
      <div className="H2 text-white text-xs font-normal  leading-tight">
        ₹ {price}
      </div>
      <div className="text-white text-xs font-normal  leading-tight">
        {description}
      </div>
      <div className="px-2 w-5 h-5 relative flex-col justify-center items-center flex">
        <PremiumPlans className={"fill-white stroke-white"} />
      </div>
    </div>
  );
};

export const OrderBadges = ({ title, tag, active, action, count }) => {
  return (
    <div
      className={`w-full flex items-center justify-between min-w-[150px] h-[40px] gap-3 border px-3 py-1 cursor-pointer text-xs font-normal leading-normal ${
        active === tag ? "bg-themecolor text-white" : null
      }`}
      onClick={(e) => action(e, tag)}
    >
      {title}{" "}
      <span
        className={`text-xs font-medium rounded-full w-6 h-6 md:w-6 md:h-6 flex items-center justify-center ${
          active === tag ? "bg-white text-black" : "bg-themecolor/70 text-white"
        }`}
      >
        {count}
      </span>
    </div>
  );
};

export const PaymentStatus = ({ status }) => {
  return (
    <span
      className={`text-center w-full whitespace-nowrap ${
        status === "success" ? "text-successColor" : "text-themecolor"
      } text-xs font-normal cursor-pointer flex items-start justify-start`}
    >
      {status}
    </span>
  );
};

export const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={`text-center shadow-sm w-full whitespace-nowrap ${
        status === "declined" ? "bg-themecolor " : "bg-successColor"
      } text-white border text-xs px-2 py-0.5  rounded-full cursor-pointer`}
    >
      {status}
    </span>
  );
};

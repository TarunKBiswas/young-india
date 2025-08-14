import React from "react";

const OrderContactInfo = ({ data }) => {
  return (
    <>
      <div className="border border-[#222222]/20 flex flex-col gap-2 p-2.5">
        <span className="text-sm uppercase">Shipping Details</span>
        <span className="text-sm font-semibold text-themecolor capitalize">
          {data?.order?.consumer_name}
        </span>
        <span className="text-sm font-semibold text-themecolor">
          {data?.order?.consumer_phone}
        </span>
        <span className="text-xs font-medium text-[#222222]/60 capitalize">
          {data?.order?.address?.addressLine1}
        </span>
      </div>
    </>
  );
};

export default OrderContactInfo;

import { BadgePercent } from "lucide-react";
import CouponCard from "./CouponCard";

/* eslint-disable react/prop-types */
const Coupons = ({ productDetail }) => {
  // console.log(productDetail);

  return (
    <>
      {productDetail?.coupons?.some((coupon) => coupon?.active) && (
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center gap-2">
            <BadgePercent className="text-blue-800" />
            <span className="text-base font-medium">Exclusive Offers</span>
          </div>
          <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-3">
            {productDetail?.coupons
              ?.filter((coupon) => coupon?.active)
              .map((data) => (
                <div key={data?.id}>
                  <CouponCard data={data} applyButton />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Coupons;

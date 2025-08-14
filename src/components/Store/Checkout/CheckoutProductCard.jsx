/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { webState } from "../../../data/webStates";
import { useState } from "react";
import ApplyCouponModal from "./ApplyCouponModal";
import { useSnapshot } from "valtio";

const CheckoutProductCard = ({ data }) => {
  // console.log(data);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const snap = useSnapshot(webState);

  const navigate = useNavigate();
  const productDetailHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const thumbnailUrl = data?.thumbnail || data?.product?.thumbnail?.url;

  const couponHandler = (data) => {
    webState.selectProductCoupon = data;
    setShowCouponModal(true);
  };

  const closeCouponModal = () => {
    setShowCouponModal(false);
  };

  return (
    <div className="w-full flex flex-col border  rounded">
      <div className="flex items-center w-full gap-2 px-2">
        <img
          className="object-contain rounded object-top w-14 h-14"
          src={thumbnailUrl}
          width={"auto"}
          height={"auto"}
          alt="image"
          onClick={() => productDetailHandler(data?.productId || data?.id)}
        />
        <div className="w-full flex flex-col">
          <span className="flex text-black text-base w-full">
            {(data?.productName || data?.product?.name)?.length > 38
              ? `${(data?.productName || data?.product?.name)?.substring(
                  0,
                  38
                )}...`
              : (data?.productName || data?.product?.name)?.substring(0, 20)}
          </span>

          <div className="w-full gap-1 text-xs md:text-sm flex items-start">
            <div className="flex flex-col">
              <span className="w-full flex items-center gap-2 text-sm">
                <span className="">
                  {data?.selectedVariant?.name || data?.name}
                </span>
                <span className="h-1 w-1 text-black bg-gray-400 rounded-full"></span>
                <span className="">
                  Qty: {data?.CartVariant?.quantity || data?.quantity}
                </span>
              </span>
              <span className="w-full flex text-sm"></span>

              <span>
                <span className="text-xs lg:text-sm">
                  {"₹"}
                  {Number(data?.prodPrice || data?.price).toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${snap.purhcaseType !== "addtocart" && "hidden"}`}>
        {data?.discountedPrice && (
          <div className="py-1 w-full flex items-center justify-center text-xs">
            <span className="text-green-600 font-medium">
              🎊🥳Coupon Discount : ₹ {data?.discountedPrice} off🥳🎊
            </span>
          </div>
        )}
      </div>

      <div className={`${snap.purhcaseType !== "buynow" && "hidden"}`}>
        {data?.coupon?.some((coupon) => coupon?.active) && (
          <div
            className={`full flex flex-col items-center justify-center my-1 `}
            onClick={() => couponHandler(data)}
          >
            <div className="w-full border-1 border-gray-300 border-dashed" />
            <span className="font-normal text-xs pt-1 cursor-pointer mb-1 hover:font-medium transition-all duration-300 hover:text-black">
              {data?.couponCode ? (
                <span className="text-green-600">
                  🎊🥳 Coupon Applied: #{data?.couponCode} off 🥳🎊
                </span>
              ) : (
                <span className="bg-green-800 text-white py-1 px-2 rounded ">
                  Apply Coupon
                </span>
              )}
            </span>
          </div>
        )}
      </div>
      {showCouponModal && (
        <ApplyCouponModal closeModalHandler={closeCouponModal} />
      )}
    </div>
  );
};

export default CheckoutProductCard;

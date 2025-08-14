/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
import SimpleModal from "../../Admin/Modals/SimpleModal";
import CouponCard from "../ProductDetail/CouponCard";
import { webState } from "../../../data/webStates";

const ApplyCartCouponModal = ({ setCouponApplied, closeModalHandler }) => {
  const snap = useSnapshot(webState);
  const data = snap.selectProductCoupon;

  const applyCouponValue = (price, type, value, quantity) => {
    if (type === "PERCENTAGE") {
      return ((price * value) / 100) * quantity;
    } else {
      return value * quantity;
    }
  };

  const applyCouponHandler = (coupon) => {
    closeModalHandler();
    setCouponApplied(true);

    webState.cartItems?.forEach((product) => {
      const productCoupons = product?.product?.collections
        ?.flatMap((collection) => collection?.coupons)
        ?.filter(Boolean);

      const hasMatchingCoupon = productCoupons?.some(
        (productCoupon) => productCoupon?.id === coupon?.id
      );

      if (hasMatchingCoupon) {
        product.couponCode = coupon?.coupon_code;

        const value = applyCouponValue(
          product?.price,
          coupon?.discount_type,
          +coupon?.discount_value,
          +product?.CartVariant?.quantity
        );
        product.discountedPrice = value;
      } else {
        product.couponCode = null;
        product.discountedPrice = null;
      }
    });
  };

  return (
    <SimpleModal
      closeModalHandler={closeModalHandler}
      modalSize={"max-w-xl"}
      position={"lg:items-center"}
      padding={"p-2"}
    >
      <div className="w-full flex items-center justify-center">
        <span className="font-medium">
          {data?.filter((coupon) => coupon?.active)?.length > 0 ? (
            "Available Coupons"
          ) : (
            <span className="text-xl text-red-600">No Coupons Available</span>
          )}
        </span>
      </div>
      <div className="w-full p-6 grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {data
          ?.filter((coupon) => coupon?.active)
          .map((data) => (
            <div key={data?.id}>
              <CouponCard data={data} applyButton action={applyCouponHandler} />
            </div>
          ))}
      </div>
    </SimpleModal>
  );
};

export default ApplyCartCouponModal;

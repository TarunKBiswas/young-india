/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import SimpleModal from "../../Admin/Modals/SimpleModal";
import CouponCard from "../ProductDetail/CouponCard";
import { SuccessAlert } from "../../Toast";

const ApplyCouponModal = ({ closeModalHandler }) => {
  const snap = useSnapshot(webState);
  const data = snap.selectProductCoupon;
  // console.log(data);

  const applyCouponValue = (price, type, value, quantity) => {
    if (type === "PERCENTAGE") {
      return ((price * value) / 100) * quantity;
    } else {
      return value * quantity;
    }
  };

  const applyCouponHandler = (coupon) => {
    if (snap.purhcaseType === "buynow") {
      if (webState.buyNowProduct) {
        webState.buyNowProduct.couponCode = coupon.coupon_code;
        const value = applyCouponValue(
          snap.buyNowProduct.prodPrice,
          coupon?.discount_type,
          coupon?.discount_value,
          snap.buyNowProduct.quantity
        );
        webState.buyNowProduct.discountedPrice = value;
        SuccessAlert("Coupon Applied");
      }
    }
    closeModalHandler();
  };

  return (
    <SimpleModal
      closeModalHandler={closeModalHandler}
      modalSize={"max-w-xl"}
      position={"lg:items-center"}
      padding={"p-2"}
    >
      <div className="w-full p-6 grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {data?.coupon
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

export default ApplyCouponModal;

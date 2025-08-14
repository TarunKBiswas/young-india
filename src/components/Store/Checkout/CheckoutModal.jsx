import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
// import CheckoutProgressBar from "./CheckoutProgressBar";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import CheckoutProductCard from "./CheckoutProductCard";
import Payment from "./Payment";
import CheckoutMobileInput from "./CheckoutMobileInput";
import CheckoutOtpVerify from "./CheckoutOtpVerify";
import CheckOutAddress from "./CheckOutAddress";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutModalBody from "../../Admin/Modals/CheckoutModalBody";
import { RxCross2 } from "react-icons/rx";
import { Tag } from "lucide-react";
import ApplyCartCouponModal from "./ApplyCartCouponModal";
import CheckoutDetails from "./CheckoutDetails";
import CartPayment from "../Cart/CartPayment";

const CheckoutModal = () => {
  const snap = useSnapshot(webState);
  const [showProducts, setShowProducts] = useState(true);
  const [currentStage, setCurrentStage] = useState(snap.checkOutStatus);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  let data = [];

  if (snap.purhcaseType === "buynow") {
    data?.push(snap.buyNowProduct);
  } else {
    data = snap.cartItems;
  }

  // console.log(data);

  const showProductHandler = () => {
    setShowProducts(!showProducts);
  };

  const modalHandler = () => {
    webState.showCheckoutModal = false;

    if (snap.purhcaseType === "buynow") {
      webState.buyNowProduct = null;
    } else {
      webState.cartProducts = data?.filter((product) => product.quantity > 0);
    }
  };

  useEffect(() => {
    setCurrentStage(snap.checkOutStatus);
  }, [snap.checkOutStatus]);

  const isLogedIn = sessionStorage.getItem("userdata");

  const couponHandler = () => {
    // console.log(data);

    // const coupons = [
    //   ...new Map(
    //     data.flatMap((product) =>
    //       product?.coupon?.map((coupon) => [coupon?.coupon_code, coupon])
    //     )
    //   ).values(),
    // ];
    const coupons = [
      ...new Map(
        data?.flatMap((product) =>
          product?.product?.collections?.flatMap((collection) =>
            collection?.coupons?.map((coupon) => [coupon?.coupon_code, coupon])
          )
        )
      ).values(),
    ];

    // console.log(coupons);
    webState.selectProductCoupon = coupons;
    setShowCouponModal(true);
  };

  const closeCouponModal = () => {
    setShowCouponModal(false);
  };

  return (
    <CheckoutModalBody closeModalHandler={modalHandler}>
      <div className="w-full flex flex-col-reverse lg:flex-row max-h px-2 pb-6 lg:pb-1">
        <div className="w-full lg:max-w-[30%] flex flex-col items-start gap-4 rounded-lg ">
          <div className="w-full flex flex-col gap-2 p-2 bg-gray-100 h-full">
            <div className="w-full flex items-center justify-between text-base ">
              <div className="flex items-center gap-2 text-lg text-black">
                <HiOutlineShoppingBag className="h-5 w-6" />
                Order Summary
                <IoIosArrowUp
                  className={`${
                    showProducts ? "" : "rotate-180"
                  } transform transition-transform duration-500 cursor-pointer lg:hidden h-5 w-5`}
                  onClick={showProductHandler}
                />
              </div>
            </div>
            <div
              className={`w-full flex flex-col gap-3 rounded-lg transition-all duration-500 ease-in-out ${
                showProducts ? "block" : "hidden lg:block"
              }`}
            >
              <div
                className={`w-full flex flex-col gap-2 bg-white rounded-lg max-h-[200px] lg:max-h-[180px] p-2 ${
                  snap.cartItems?.length > 1 &&
                  "overflow-y-scroll scrollbar-hide"
                }`}
              >
                {data?.map((data, i) => {
                  return <CheckoutProductCard data={data} key={i} />;
                })}
              </div>
            </div>

            {data?.filter((coupon) => coupon?.active) && (
              <div
                className={`${
                  snap.purhcaseType === "buynow" && "hidden"
                } flex items-center justify-between w-full py-4 px-3 bg-white rounded-lg cursor-pointer`}
                onClick={couponHandler}
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {couponApplied ? (
                      <span className="text-green-600">Coupon Applied</span>
                    ) : (
                      "Apply Coupons"
                    )}
                  </span>
                </div>
                <div
                  className={`text-sm font-medium cursor-pointer text-green-600`}
                >
                  {couponApplied ? (
                    <span className="text-red-600">Edit</span>
                  ) : (
                    "Apply"
                  )}
                </div>
              </div>
            )}

            <div className="w-full gap-2 bg-white rounded-lg p-3">
              {snap.purhcaseType === "buynow" ? <Payment /> : <CartPayment />}
            </div>
          </div>
          <div className="w-full flex  lg:hidden ">
            {currentStage === "number" &&
              (!isLogedIn ? <CheckoutMobileInput /> : <CheckOutAddress />)}
            {currentStage === "details" && <CheckoutDetails />}
            {currentStage === "otp" && <CheckoutOtpVerify />}
            {currentStage === "address" && <CheckOutAddress />}
            {currentStage === "payment" && <CheckoutPayment />}
          </div>
        </div>

        <div className="w-full ">
          <div className=" items-center justify-end hidden lg:flex pt-1">
            <RxCross2
              className="h-6 w-6 cursor-pointer hover:scale-75 transition-all duration-300"
              onClick={modalHandler}
            />
          </div>
          <div
            className={`w-full h-full flex flex-col items-center  ${
              currentStage === "otp" ? "justify-center" : "justify-start"
            } `}
          >
            <div className=" hidden lg:flex w-full mb-10">
              {currentStage === "number" &&
                (!isLogedIn ? <CheckoutMobileInput /> : <CheckOutAddress />)}
              {currentStage === "details" && <CheckoutDetails />}
              {currentStage === "otp" && <CheckoutOtpVerify />}
              {currentStage === "address" && <CheckOutAddress />}
              {currentStage === "payment" && <CheckoutPayment />}
            </div>
          </div>
          {/* <div className="w-full ">
            <Guarantees />
          </div> */}
        </div>
      </div>

      {showCouponModal && (
        <ApplyCartCouponModal
          closeModalHandler={closeCouponModal}
          setCouponApplied={setCouponApplied}
        />
      )}
    </CheckoutModalBody>
  );
};

export default CheckoutModal;

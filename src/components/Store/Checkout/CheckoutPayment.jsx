import { useEffect, useState } from "react";
import { CheckoutSubmitButton } from "../UI/Buttons";
import PaymentCard from "./PaymentCard";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import axios from "axios";
import { baseURL } from "../../../utils/const_API";
import { getStoreHeader } from "../../../utils/Store/Constant";
import { useNavigate } from "react-router-dom";
import { checkout, wallet } from "../../../utils/Store/Payment";
import { FailureAlert, SuccessAlert } from "../../Toast";
import { initiateCheckoutEvent } from "../../../lib/FbPixelEvent";
import useRazorpay from "react-razorpay";
import { cleanCartList } from "../../../utils/Store/ApiCalls";

const CheckoutPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Razorpay] = useRazorpay();
  const snap = useSnapshot(webState);
  const navigate = useNavigate();

  const data = JSON.parse(sessionStorage.getItem("userdata"));

  const userData = data;
  const StoreUserID = data.id;
  const addressId = snap.checkoutAddressId;
  const payment_mode = snap.selectPayment;
  const globalData = snap?.globalData;
  const companyInfo = snap.brandInfo;
  const userInfo = snap?.userData?.data;
  const codAdvance = webState.codAdvancePrice;
  // console.log(codAdvance);

  useEffect(() => {
    initiateCheckoutEvent();
  }, []);

  const payGateway = snap.globalData.data?.selected_payment_gateway;

  let productDetails;
  let isResellerOrder;

  // console.log(webState.cartProducts);

  if (snap.purhcaseType === "buynow") {
    let data = snap.buyNowProduct;
    productDetails = [
      {
        VariantId: data?.selectedVariant?.id,
        quantity: data?.quantity,
      },
    ];

    if (data?.couponCode) {
      productDetails[0].coupon_code = data?.couponCode;
    } else {
      delete productDetails?.coupon_code;
    }

    if (data?.resellengPrice !== "" || undefined) {
      productDetails[0].sellingPrice = +data?.resellengPrice;
    } else {
      delete productDetails.sellingPrice;
    }
  } else {
    productDetails = snap?.cartItems?.map((data) => {
      // console.log(data);
      const productDetail = {
        VariantId: data?.CartVariant?.VariantId,
        quantity: data?.CartVariant?.quantity,
      };

      if (data?.couponCode) {
        productDetail.coupon_code = data?.couponCode;
      } else {
        delete productDetail.coupon_code;
      }

      // if (data?.resellengPrice !== "" || undefined) {
      //   productDetail.sellingPrice = +data?.resellengPrice;
      // } else {
      //   delete productDetail.sellingPrice;
      // }

      return productDetail;
    });
  }

  if (snap.purhcaseType === "buynow") {
    isResellerOrder =
      snap.buyNowProduct.isResellerOrder === true ? true : false;
  } else {
    isResellerOrder = productDetails?.some(
      (obj) => obj.isResellerOrder === true
    );
  }

  const finalData = {
    name: userData?.name,
    phone: userData?.phone,
    email: userData?.email,
    isResellerOrder,
  };

  if (isResellerOrder) {
    finalData.isResellerOrder = true;
  }

  const checkoutHandler = async () => {
    if (!payment_mode) {
      return FailureAlert("Please Select Payment Mode");
    }

    setIsLoading(true);
    try {
      if (payment_mode === "PREPAID" || payment_mode === "COD") {
        let data = {
          variants: productDetails,
          consumer: finalData,
          StoreUserID,
          AddressId: addressId,
          payment_mode,
        };
        console.log(data);
        let res;
        switch (payGateway) {
          case "RAZORPAY":
            res = await checkout(data);
            break;
          case "PHONEPE":
            res = await handlePhonepe(data);
            break;
          default:
            break;
        }
        if (res?.status === 200) {
          webState.orderDetails = res?.data;
          if (
            payment_mode === "PREPAID" ||
            (payment_mode === "COD" && codAdvance > 0)
          ) {
            handlePayment(res?.data?.data);
          } else {
            webState.showCheckoutModal = false;
            webState.buyNowProduct = null;
            webState.checkOutStatus = "number";
            // webState.checkoutStage = "2%";
            navigate("/paymentSuccess");
            SuccessAlert(res?.data?.message);
            cleanCartList();
          }
        }
      } else if (payment_mode === "WALLET") {
        let res = await wallet({
          variants: productDetails,
          consumer: finalData,
          StoreUserID,
          AddressId: addressId,
          payment_mode,
        });
        if (res?.status === 200) {
          webState.orderDetails = res?.data?.data;
          SuccessAlert(res?.data?.message);
          webState.showCheckoutModal = false;
          webState.buyNowProduct = null;
          webState.checkOutStatus = "number";
          // webState.checkoutStage = "2%";
          navigate("/paymentSuccess");
          cleanCartList();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePhonepe = async () => {
    let data = {
      variants: productDetails,
      consumer: finalData,
      StoreUserID,
      AddressId: addressId,
      payment_mode,
    };
    const response = await axios.post(
      `${baseURL}/orders/checkout/razorpay`,
      data,
      getStoreHeader()
    );
    const resp = response?.data;
    if (!resp?.data?.amount) {
      resp.status = 200;
      return resp;
    } else {
      window.location.href =
        resp?.data?.data?.instrumentResponse?.redirectInfo?.url;
    }
  };

  const handlePayment = async (order) => {
    const options = {
      key: globalData?.data?.razorpay_key,
      amount: order?.amount / 100,
      currency: "INR",
      name: companyInfo?.name,
      order_id: order?.id,
      prefill: {
        email: userInfo?.name,
        contact: userInfo?.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#CF2831",
      },
      handler: async (response) => {
        if (
          typeof response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          return false;
        } else {
          const res = await axios.post(
            `${baseURL}/orders/verify/razorpay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            getStoreHeader()
          );
          if (res?.status === 200) {
            webState.showCheckoutModal = false;
            webState.buyNowProduct = null;
            webState.checkOutStatus = "number";
            webState.checkoutStage = "2%";
            navigate("/paymentSuccess");
          }
        }
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  return (
    <div className="mobile-input-wrapper w-full grid h-full text-left px-2 lg:mx-6 mb-4">
      <div className="w-full text-sm flex ">
        <span className="w-full font-semibold text-base">
          Select Payment Method
        </span>
      </div>

      <div className="my-4">
        <PaymentCard />
      </div>

      <CheckoutSubmitButton
        title={"Place Order"}
        isLoading={isLoading}
        action={checkoutHandler}
      />
    </div>
  );
};

export default CheckoutPayment;

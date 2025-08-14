/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import PaymentMethodCard from "./Checkout/PaymentMethodCard";
import BreadCrumb from "../UI/BreadCrumb";
import AddressCard from "./AddressCard";
import { useState } from "react";
import { webState } from "../../../data/webStates";
import { ApplyButton } from "../UI/Buttons";
import { useSnapshot } from "valtio";
import { FailureAlert, SuccessAlert } from "../../Toast";
import {
  creatAddress,
  fetchAreaData,
  getAddress,
} from "../../../utils/Store/Address";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  baseURL,
  getStoreHeader,
  lengthMsg,
  phoneRegExp,
  reqMsg,
} from "../../../utils/Store/Constant";
import { useEffect } from "react";
import Protected from "../UI/Wrappers/Protected";
import { checkout } from "../../../utils/Store/Payment";
import { notify } from "../UI/HotToast";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { axios } from "./Store/Axios";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  houseNumber: yup.string().required(reqMsg),
  addressLine1: yup.string().required(reqMsg).min(10, lengthMsg(10)),
  pincode: yup.string().required(reqMsg),
  area: yup.string().required("Please Select Area"),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
});

const Shipping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addresses, setAddresses] = useState(null);
  const [addAdrees, setAddAddress] = useState(true);
  const [pinCodeApi, setPinCodeApi] = useState(null);
  const [pinCode, setPincode] = useState(null);
  const [area, setArea] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

  const snap = useSnapshot(webState);
  const userInfo = snap?.userData;
  const paymentMode = snap?.selectPayment;
  const address = snap?.selectAddressID;
  const razorpayKey = snap?.globalData?.razorpayKey;

  const storedActiveButton = sessionStorage?.getItem("activeButton");

  useEffect(() => {}, [
    storedActiveButton,
    sessionStorage.getItem("activeButton"),
  ]);

  const paymentHandler = () => {
    checkOutDetails();
  };

  const [Razorpay] = useRazorpay();

  const companyInfo = snap.brandInfo?.name;

  const handlePayment = async (order) => {
    const options = {
      key: razorpayKey,
      amount: order?.amount / 100,
      currency: "INR",
      name: companyInfo || "Sumeet Wholesale",
      order_id: order?.id,
      prefill: {
        name: snap?.userData?.name,
        email: snap?.userData?.email,
        contact: snap?.userData?.phone,
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
            `${baseURL}/custom/verifyPaymentOrder`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            getStoreHeader()
          );
          if (res?.status === 200) {
            navigate("/paymentSuccess");
          }
        }
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  const getData = async () => {
    try {
      let res = await getAddress();
      if (res?.status === 200) {
        setAddresses(res?.data?.addresses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!snap.selectPayment && sessionStorage.getItem("activeButton")) {
      webState.selectPayment = sessionStorage.getItem("activeButton");
    }
  }, [snap.selectPayment]);

  useEffect(() => {
    getData();
    webState.refreshAddressList = false;
  }, [snap.refreshAddressList]);

  const retrievePincode = async (pincode) => {
    try {
      let res = await fetchAreaData(pincode);
      if (res?.status === 200) {
        setPinCodeApi(res?.data[0]?.PostOffice);
        setCity(res?.data[0]?.PostOffice[0]?.District);
        setState(res?.data[0]?.PostOffice[0]?.State);
        setCountry(res?.data[0]?.PostOffice[0]?.Country);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editModalHandler = (id) => {
    webState.selectedID = id;
    webState.showEditAddressModal = true;
  };

  const deleteAddressHandler = async (id) => {
    webState.selectedID = id;
    webState.showDeleteAddressModal = true;
  };

  const addAddressHandler = async (data) => {
    let finalData = { ...data, city, state, country };
    try {
      let res = await creatAddress(finalData);
      if (res?.status === 200) {
        webState.refreshAddressList = true;
        SuccessAlert("Address Selected");
        reset();
        setAddAddress(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let productDetails = snap?.cartProducts?.map((data) => {
    const productDetail = {
      product_variant_id: data?.selectedVariant?.id,
      quantity: data?.quantity,
    };

    if (data?.resellengPrice !== "") {
      productDetail.sellingPrice = data.resellengPrice;
    }

    return productDetail;
  });

  let isResellerOrder = productDetails.some(
    (productDetail) => productDetail.sellingPrice !== undefined
  );
  let finalData = {
    addressID: address,
    conEmail: userInfo?.email,
    conName: userInfo?.name,
    conPhone: userInfo?.phone,
    payment_mode: paymentMode,
  };

  if (isResellerOrder) {
    finalData.isResellerOrder = true;
  }

  const checkOutDetails = async () => {
    if (!address) {
      FailureAlert("Select Your address");
    } else {
      try {
        let res = await checkout({
          consumer: finalData,
          products: productDetails,
        });
        if (res?.status === 200) {
          webState.orderDetails = res?.data;
          if (paymentMode === "PREPAID" || paymentMode === "COD") {
            handlePayment(res?.data);
          } else {
            SuccessAlert(res?.data?.message);
            navigate("/paymentSuccess");
          }
        } else {
          FailureAlert(res?.response?.data?.message.slice(0, 33));
        }
      } catch (error) {
        console.log(error);
        notify("Something went wrong");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Protected>
      <div className="w-full flex flex-col items-center justify-center p-2 max-w-[1440px] mx-auto">
        <BreadCrumb page={"shipping"} />
        <div className="w-full flex flex-col md:flex-row  gap-4  h-full items-stretch">
          <div className="w-full lg:max-w-[647px] mx-auto flex flex-col gap-2 mb-4">
            <div className="w-full flex flex-col items-start gap-2 mt-4">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => setAddAddress(!addAdrees)}
              >
                <span className="text-lg text-darkText font-medium">
                  Select Address
                </span>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 min-h-80 max-h-[380px] overflow-y-scroll">
                {addresses?.length >= 0 ? (
                  addresses?.map((data) => {
                    return (
                      <AddressCard
                        data={data}
                        editModalHandler={editModalHandler}
                        deleteAddressHandler={deleteAddressHandler}
                        key={data?.id}
                      />
                    );
                  })
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <span className="text-base font-medium">
                      No Address Found
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-start  mt-4">
              <span className="text-lg text-darkText font-medium cursor-pointer flex items-center gap-2">
                Add New Address
              </span>
              <form
                className="w-full flex flex-col gap-2 mt-2 "
                onSubmit={handleSubmit(addAddressHandler)}
              >
                <input
                  type="text"
                  className="webInputStyle focus:outline-none"
                  placeholder="Name"
                  {...register("name")}
                />
                <p className="text-red-600 text-sm ">{errors.name?.message}</p>
                <input
                  type="text"
                  className="webInputStyle focus:outline-none"
                  placeholder="Phone"
                  {...register("phone", {
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                    max: 10,
                  })}
                />
                <p className="text-red-600 text-sm ">{errors.phone?.message}</p>

                <input
                  type="text"
                  className="webInputStyle"
                  placeholder="House No."
                  {...register("houseNumber")}
                />
                <p className="text-red-600 text-sm ">
                  {errors.houseNumber?.message}
                </p>

                <textarea
                  type="text"
                  className="webInputStyle"
                  placeholder="Address Line 1"
                  {...register("addressLine1")}
                />
                <p className="text-red-600 text-sm ">
                  {errors.addressLine1?.message}
                </p>

                <textarea
                  rows="4"
                  cols="50"
                  type="text"
                  className="webInputStyle"
                  placeholder="Address Line 2 (Optional)"
                  {...register("addressLine2")}
                />

                <input
                  type="number"
                  className="webInputStyle"
                  placeholder="Pincode"
                  {...register("pincode", {
                    onChange: (e) => {
                      if (e.target.value?.length === 6) {
                        retrievePincode(e.target.value);
                        setPincode(e.target.value);
                      }
                    },
                  })}
                />
                <p className="text-red-600 text-sm ">
                  {errors.pincode?.message}
                </p>

                <div className="w-full relative mb-4">
                  <select
                    className="webInputStyle py-2"
                    {...register("area", {
                      onChange: (e) => {
                        setArea(e.target.value);
                      },
                    })}
                  >
                    <option value="">Select Area</option>
                    {pinCodeApi?.map((obj, i) => (
                      <option key={i} value={obj?.Name} selected>
                        {obj?.Name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-600 text-sm ">
                    {errors.area?.message}
                  </p>
                </div>

                {/* <div className="w-full flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="rounded checked:text-themecolor"
                    />
                    <span className="text-xs">
                      Save this informations for a future fast checkout
                    </span>
                  </div> */}

                <div className="w-full flex items-center justify-end">
                  <ApplyButton text={"Save"} />
                </div>
              </form>
            </div>
          </div>

          {snap.cartProducts?.length > 0 ? (
            <div className="w-full lg:max-w-[35%] border-l-2  ">
              <PaymentMethodCard
                text={"Proceed to Payment"}
                action={paymentHandler}
                data={snap.cartProducts}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Protected>
  );
};

export default Shipping;

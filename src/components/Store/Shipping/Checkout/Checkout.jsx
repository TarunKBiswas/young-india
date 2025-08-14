/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import Contact from "./Contact";
import Delivery from "./Delivery";
import {
  creatAddress,
  fetchAreaData,
  getAddress,
} from "../../../../utils/Store/Address";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import PaymentCard from "../../Checkout/PaymentCard";
import PaymentSlip from "./PaymentSlip";
import { CheckOutButton, HeadingName } from "../../UI/Buttons";
import { useRef } from "react";
import { registerInfo, login } from "../../../../utils/Store/login";
import { useEffect } from "react";
import { FailureAlert, SuccessAlert } from "../../../Toast";
import useRazorpay from "react-razorpay";
import { baseURL, getStoreHeader } from "../../../../utils/Store/Constant";
import { checkout, wallet } from "../../../../utils/Store/Payment";
import LoginUserInfo from "./LoginUserInfo";
import AddressCard from "../AddressCard";
import ShippingContainer from "../../UI/Wrappers/ShippingContainer";
import BreadCrumb from "../../UI/BreadCrumb";
import { notify } from "../../UI/HotToast";
import { useNavigate } from "react-router-dom";
import { axios } from "./Store/Axios";
import { IoIosArrowDown } from "react-icons/io";
import ProductCard from "../../UI/ProductCard";
import Container from "../../UI/Wrappers/Container.Wrapper";

const Checkout = () => {
  const [addresses, setAddresses] = useState(null);
  const [pinCodeApi, setPinCodeApi] = useState(null);
  const [address, setAddress] = useState();
  const [register, setRegister] = useState();
  const [pinCode, setPincode] = useState(null);
  const [area, setArea] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doLogInCheckout, setDoLogInCheckout] = useState(false);
  const [isAddressAdded, setIsAddressAdded] = useState();
  const [isUserOnBoarded, setIsUserOnBoarded] = useState(false);

  const [showAddress, setShowAddress] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const snap = useSnapshot(webState);
  const registerRef = useRef();
  const deliveryRef = useRef();
  const navigate = useNavigate();
  const userInfo = snap?.userData?.data;
  const paymentMode = snap?.selectPayment;
  const addressId = snap?.selectAddressID;
  const razorKey = snap?.globalData;
  const companyInfo = snap.brandInfo;
  const [Razorpay] = useRazorpay();

  const productDetails = snap?.cartProducts?.map((data) => {
    const productDetail = {
      VariantId: data?.selectedVariant?.id,
      quantity: data?.quantity,
    };

    if (data?.resellengPrice !== "") {
      productDetail.sellingPrice = data?.resellengPrice;
    }

    return productDetail;
  });

  const isResellerOrder = productDetails.some(
    (productDetail) => productDetail.sellingPrice !== undefined
  );

  const finalData = {
    name: userInfo?.name || register?.name,
    phone: userInfo?.phone || register?.phone,
    email: userInfo?.email || register?.email,
  };

  if (isResellerOrder) {
    finalData.isResellerOrder = true;
  }

  if (userInfo?.email) {
    finalData.email = userInfo?.email;
  }

  const action = () => {
    registerRef?.current?.click();
    deliveryRef?.current?.click();
  };

  const handleLogInUserCheckout = () => {
    if (!addressId) {
      deliveryRef?.current?.click();
    } else {
      setDoLogInCheckout(true);
    }
  };

  // const handlePayment = async (order) => {
  //   const options = {
  //     key: razorKey?.razorpay_key,
  //     amount: order?.amount / 100,
  //     currency: "INR",
  //     name: companyInfo?.name,
  //     order_id: order?.id,
  //     prefill: {
  //       email: userInfo?.name,
  //       contact: userInfo?.phone,
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#CF2831",
  //     },
  //     handler: async (response) => {
  //       if (
  //         typeof response.razorpay_payment_id == "undefined" ||
  //         response.razorpay_payment_id < 1
  //       ) {
  //         return false;
  //       } else {
  //         const res = await axios.post(
  //           `${baseURL}/orders/verify/razorpay`,
  //           {
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
  //           },
  //           getStoreHeader()
  //         );
  //         if (res?.status === 200) {
  //           navigate("/paymentSuccess");
  //         }
  //       }
  //     },
  //   };
  //   const rzpay = new Razorpay(options);
  //   rzpay.open();
  // };

  const onCheckout = () => {
    if (!isLoggedIn) {
      if (paymentMode) {
        action();
      } else {
        FailureAlert("You Must Select Payment Method");
      }
    } else {
      handleLogInUserCheckout();
    }
  };

  const showAddressFormHandler = () => {
    webState.selectAddressID = null;
    setShowAddress(!showAddress);
  };

  const retrievePincode = async (pincode) => {
    try {
      let res = await fetchAreaData(pincode);
      if (res?.status === 200) {
        setAddress;
        setPinCodeApi(res?.data[0]?.PostOffice);
        setCity(res?.data[0]?.PostOffice[0]?.District);
        setState(res?.data[0]?.PostOffice[0]?.State);
        setCountry(res?.data[0]?.PostOffice[0]?.Country);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      let res = await getAddress();
      if (res?.status === 200) {
        setAddresses(res?.data?.data);
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

  useEffect(() => {
    if (snap?.resellerToken || sessionStorage.getItem("usertoken")) {
      setIsLoggedIn(true);
    }
  }, []);

  const addAddressHandler = async (data, callback) => {
    let finalData = { ...data, city, state, country, countryCode: "+91" };
    try {
      let res = await creatAddress(finalData);
      if (res?.status === 200) {
        webState.selectAddressID = res?.data?.data?.id;
        if (callback) {
          callback(res?.data?.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerationHandler = async (data) => {
    webState.userPhoneNumber = register?.phone;
    try {
      let finalData = {
        ...data,
        name: register?.name,
        username: register?.name,
        password: register?.password,
        email: register?.email,
        phone: `+91 ${register?.phone}`,
      };
      let res = await registerInfo(finalData);
      if (res?.status === 200) {
        return true;
      } else {
        FailureAlert(res?.response?.data?.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async () => {
    let data = {
      email: register?.email,
      password: register?.password,
    };
    try {
      let response = await login(data);
      webState.userPhoneNumber = register?.phone;
      if (response?.status === 200) {
        sessionStorage.setItem("usertoken", response?.data?.data?.jwt);
        webState.resellerToken = response?.data?.data?.jwt;
        webState.loggedinUserData = response?.data?.data?.user;
        webState.proceedCheck = true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleOTPModal = async () => {
    await registerationHandler();
    await loginHandler();
  };

  const checkOutDetails = async (id) => {
    if (!(addressId || id)) {
      FailureAlert("Select Your address");
    } else {
      try {
        if (paymentMode === "PREPAID" || paymentMode === "COD") {
          let res = await checkout({
            payment_mode: paymentMode,
            consumer: finalData,
            variants: productDetails,
            // StoreUserID: userInfo?.id || snap?.loggedinUserData?.id,
            AddressId: addressId || id,
          });
          if (res?.status === 200) {
            webState.orderDetails = res?.data?.data;
            if (
              paymentMode === "PREPAID" ||
              (paymentMode === "COD" && res?.data?.amount > 0)
            ) {
              // handlePayment(res?.data?.data);
            } else {
              SuccessAlert(res?.data?.message);
              navigate("/paymentSuccess");
            }
          } else {
            FailureAlert(res?.response?.data?.error?.message?.slice(0, 33));
          }
        } else if (paymentMode === "WALLET") {
          let res = await wallet({
            payment_mode: paymentMode,
            consumer: finalData,
            variants: productDetails,
            // StoreUserID: userInfo?.id || snap?.loggedinUserData?.id,
            AddressId: addressId || id,
          });
          if (res?.status === 200) {
            webState.orderDetails = res?.data?.data;
            SuccessAlert(res?.data?.message);
            navigate("/paymentSuccess");
          } else {
            FailureAlert(res?.response?.data?.error?.message?.slice(0, 33));
          }
        }
      } catch (error) {
        console.log(error);
        notify("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (register && address && !isLoggedIn && !isUserOnBoarded) {
      handleOTPModal();
    }
  }, [register, address]);

  useEffect(() => {
    if (snap?.proceedCheck) {
      setIsUserOnBoarded(true);
      addAddressHandler(address);
    }
  }, [snap.proceedCheck]);

  useEffect(() => {
    if (!isLoggedIn && addressId) {
      checkOutDetails();
    }
  }, [addressId]);

  useEffect(() => {
    if (address && !register) {
      addAddressHandler(address, () => setIsAddressAdded(true));
    }
  }, [address]);

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (doLogInCheckout) {
      if (addressId) {
        checkOutDetails();
        setDoLogInCheckout(false);
      } else if (address) {
        addAddressHandler(address, () => setIsAddressAdded(true));
        setDoLogInCheckout(false);
      }
    }
  }, [doLogInCheckout, address]);

  useEffect(() => {
    if (isAddressAdded && isLoggedIn) {
      checkOutDetails();
    }
  }, [isAddressAdded]);

  useEffect(() => {
    if (!snap.resellerToken) {
      setIsLoggedIn(false);
    } else {
      getData();
    }
  }, [snap.resellerToken]);

  useEffect(() => {
    if (snap.cartProducts.length <= 0) {
      navigate("/cart");
    }
  }, [snap.cartProducts]);

  useEffect(() => {
    return () => {
      webState.selectAddressID = null;
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
    webState.refreshAddressList = false;
  }, [snap.refreshAddressList]);

  useEffect(() => {
    if (isLoggedIn && addresses?.length > 0) {
      webState.selectAddressID = addresses[0]?.id;
    }
  }, [addresses]);

  useEffect(() => {
    if (addresses?.length > 0) {
      setShowAddress(true);
    }
  }, [addresses]);

  return (
    <>
      <ShippingContainer>
        <BreadCrumb page={"checkout"} />

        {snap.cartProducts?.length > 0 ? (
          <div className="w-full flex flex-col lg:flex-row lg:gap-5 items-start justify-center mt-8  ">
            {/* forms */}
            <div className="min-w-[60%] w-full ">
              {!isLoggedIn && !snap.resellerToken && (
                <Contact
                  contactRef={registerRef}
                  registerationHandler={(data) => setRegister(data)}
                />
              )}
              {isLoggedIn && <LoginUserInfo />}
              {isLoggedIn && addresses?.length > 0 ? (
                <>
                  <span
                    className="text-lg text-darkText font-medium cursor-pointer flex items-center my-3 gap-1"
                    onClick={showAddressFormHandler}
                  >
                    Delivery Addresses
                    {showAddress ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowDown className="rotate-180" />
                    )}
                  </span>
                  {showAddress && (
                    <div className="w-full grid grid-cols-1  gap-3 min-h-70 max-h-[300px] overflow-y-scroll scrollbar-hide">
                      {addresses?.map((data) => {
                        return (
                          <AddressCard
                            data={data}
                            editModalHandler={editModalHandler}
                            deleteAddressHandler={deleteAddressHandler}
                            key={data?.id}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              ) : null}

              <Delivery
                deliveryRef={deliveryRef}
                addresses={addresses}
                retrievePincode={retrievePincode}
                pinCodeApi={pinCodeApi}
                addAddressHandler={(data) => setAddress(data)}
                setPincode={setPincode}
                setArea={setArea}
                showAddress={showAddress}
                showAddressForm={showAddress}
                // showAddressHandler={showAddressHandler}
                showAddressFormHandler={showAddressFormHandler}
                isLoggedIn={isLoggedIn}
              />

              <span className="text-lg text-darkText font-medium cursor-pointer flex items-center mt-3">
                Payment
              </span>
              <span className="text-xs ">
                All transactions are secure and encrypted.
              </span>
              <div className="my-3">
                <PaymentCard />
              </div>

              {/* {snap.cartProducts?.length > 0 ? (
                <div className="hidden my-6 w-full lg:flex items-center justify-center ">
                  <CheckOutButton
                    text={"Checkout"}
                    action={onCheckout}
                    style={"w-full"}
                  />
                </div>
              ) : null} */}
            </div>

            {/* summery */}
            <div className="min-w-[40%] w-full px-2.5">
              {snap?.cartProducts?.length > 0 ? (
                <>
                  <PaymentSlip />
                  <div className=" my-6 w-full  items-center justify-center ">
                    <CheckOutButton
                      text={"Checkout"}
                      action={onCheckout}
                      style={" w-full"}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </ShippingContainer>
      {/* <div className="w-full mt-10 px-2.5 bg-[#F5F5F5] ">
        <Container>
          <HeadingName title={"featured products"} className={"my-5"} />

          <div className="my-4 grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {snap?.checkoutFeaturedProducts?.map((item) => {
              return <ProductCard product={item} key={item.id} />;
            })}
          </div>
        </Container>
      </div> */}
    </>
  );
};

export default Checkout;

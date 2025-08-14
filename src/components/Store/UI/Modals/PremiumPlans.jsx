import { useState } from "react";
import ModalBody from "./ModalBody";
import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import {
  getSubscription,
  premiumPlansData,
} from "../../../../utils/Store/Setting";
import { useEffect } from "react";
import { FailureAlert } from "../../../Toast";
import useRazorpay from "react-razorpay";
import { baseURL, getStoreHeader } from "../../../../utils/Store/Constant";
import SubscriptionPriceCard from "../Cards/SubscriptionPriceCard";
import { useNavigate } from "react-router-dom";

// import moment from "moment";
// import PlanDetail from "../../Setting/PremiumPlans/PlanDetail";
// import UserInfoData from "../UserInfoData";
import { axios } from "../../../../utils/Store/Axios";

const PremiumPlans = () => {
  const [dataPlans, setDataPlans] = useState([]);
  const navigate = useNavigate();
  const snap = useSnapshot(webState);
  const companyInfo = snap.brandInfo;
  const razorKey = snap?.globalData;

  const getPlans = async () => {
    try {
      let res = await premiumPlansData();
      if (res?.status === 200) {
        setDataPlans(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const subscriptionHandler = async (id) => {
    try {
      let res = await getSubscription({ plan: id });
      if (res?.status === 200) {
        paymentHandler(res?.data);
      } else {
        FailureAlert(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [Razorpay] = useRazorpay();

  const paymentHandler = async (selectedId) => {
    const options = {
      key: razorKey?.razorpayKey,
      amount: selectedId?.amount / 100,
      currency: "INR",
      name: companyInfo?.name,
      order_id: selectedId?.id,
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
            `${baseURL}/subscriptions/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            getStoreHeader()
          );
          if (res?.status === 200) {
            webState.userData = null;
            webState.premiumPlans = false;
          } else {
            FailureAlert(res?.response?.data?.message);
          }
        }
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  const primiumHandler = () => {
    navigate("/setting/plans");
    webState.premiumPlans = false;
  };

  const closeModalHandler = () => {
    webState.premiumPlans = false;
  };

  return (
    <div>
      <ModalBody closeModalHandler={closeModalHandler}>
        <p className=" text-center text-slate-900 text-2xl font-bold leading-10">
          The right price for you, whoever you are
        </p>
        <p className="text-center text-neutral-400 md:text-md font-normal">
          Upgrade to Premium and enjoy this product for just ₹99!
        </p>
        <div
          className={`w-full flex ${
            dataPlans?.length > 1
              ? " items-start justify-start"
              : " items-center justify-center"
          }  gap-2 mt-2 overflow-x-scroll scrollbar-hide`}
        >
          {dataPlans?.map((data, i) => (
            <div
              className="min-w-[280px]  bg-white border-2 border-gray-100 rounded-md"
              key={i}
            >
              <SubscriptionPriceCard data={data} planId={subscriptionHandler} />
            </div>
          ))}
        </div>
        {/* </>)} */}

        {snap?.resellerToken && (
          <div
            className="  py-1 rounded-lg mt-3 border border-themecolor flex items-center justify-center cursor-pointer"
            onClick={primiumHandler}
          >
            <div className=" text-themecolor text-base font-medium leading-normal">
              Explore More Plans
            </div>
          </div>
        )}
      </ModalBody>
    </div>
  );
};

export default PremiumPlans;

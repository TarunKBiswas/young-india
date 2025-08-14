import { useState } from "react";
import {
  getSubscription,
  premiumPlansData,
} from "../../../../utils/Store/Setting";
import { useEffect } from "react";
import PriceCard from "./PriceCard";
import PlanDetail from "./PlanDetail";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import useRazorpay from "react-razorpay";
import { baseURL, getStoreHeader } from "../../../../utils/Store/Constant";
import moment from "moment";
import { FailureAlert, SuccessAlert } from "../../../Toast";
import NoDataAnime from "../../../Admin/UI/NoDataAnime";
import { axios } from "../../../../utils/Store/Axios";

const PremiumPlans = () => {
  const [dataPlans, setDataPlans] = useState([]);
  // const [selectedId, setSelectedId] = useState(null);
  const snap = useSnapshot(webState);
  const userInfo = snap?.userData?.data;
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
    } finally {
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const subscriptionHandler = async (id) => {
    try {
      let res = await getSubscription({ plan_id: id });

      if (res?.status === 200) {
        paymentHandler(res?.data?.data);
      } else {
        FailureAlert(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const [Razorpay] = useRazorpay();

  const paymentHandler = async (selectedId) => {
    const options = {
      key: razorKey?.razorpay_key,
      amount: selectedId?.amount / 100,
      currency: "INR",
      name: companyInfo?.name,
      order_id: selectedId?.id,
      prefill: {
        name: snap?.userData?.data?.name,
        email: snap?.userData?.data?.email,
        contact: snap?.userData?.data?.phone,
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
            `${baseURL}/store-subscriptions/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            getStoreHeader()
          );

          if (res?.status === 200) {
            SuccessAlert(res?.data?.data?.message);
            // webState.userData = null;
          } else {
            FailureAlert(res?.response?.data?.message);
          }
        }
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  const isSubscriptionActive = userInfo?.isPremium
    ? moment().diff(moment(userInfo?.subscription?.valid_to)) < 0
    : false;

  return (
    <div className="w-full mt- px-3">
      {dataPlans?.length > 0 ? (
        <>
          {isSubscriptionActive ? (
            <>
              <div className="mt-3">
                <span className="text-base capitalize">
                  Hey
                  <span className="text-themecolor font-medium px-1">
                    {userInfo?.name}
                  </span>
                  , You Already have one of our premium plans active.
                </span>
              </div>
              <PlanDetail />
            </>
          ) : (
            <>
              <span className="w-full text-lg ">
                Hey{" "}
                <span className="text-themecolor  font-semibold capitalize px-1 text-lg">
                  {userInfo?.name} ,
                </span>{" "}
                Become a Premium Member now
              </span>
              <div className="mt-4">
                <span className="text-lg font-medium leading-3 ">
                  Pricing Details
                </span>
              </div>
              <div className="w-full flex items-center gap-2 mt-2 overflow-x-scroll scrollbar-hide lg:grid lg:grid-cols-3">
                {dataPlans?.map((data, i) => (
                  <div
                    className="min-w-[250px] 2xl:min-w-[280px] bg-white border-2 border-gray-100 rounded-md "
                    key={i}
                  >
                    <PriceCard data={data} planId={subscriptionHandler} />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <NoDataAnime msg={"No Plans found"} />
        // </div>
      )}
    </div>
  );
};

export default PremiumPlans;

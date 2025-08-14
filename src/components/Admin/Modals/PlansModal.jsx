/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { state } from "../../../data/state";
import { useSnapshot } from "valtio";
import {
  serverPaymentRequest,
  serverPaymentverify,
} from "../../../utils/const_API";
import SubscriptionCard from "../UI/plans/SubscriptionCard";
// import PriceCard from "../UI/PriceCard";
// import Plans from "../UI/plans/Plans";

const plans = [
  {
    plan: "Basic",
    monthlyPrice: 499,
    yearlyPrice: 4790,
    isPopular: false,
    monthlyBasicType: "basic_monthly_server_price",
    yearlyProType: "basic_yearly_server_price",
  },
  {
    plan: "Pro",
    monthlyPrice: 1499,
    yearlyPrice: 14390,
    isPopular: true,
    monthlyBasicType: "pro_monthly_server_price",
    yearlyProType: "pro_yearly_server_price",
  },
];

const PlansModal = ({ setShowPlansModal }) => {
  const [paymentAmount, setPaymentAmout] = useState(null);
  const [keyId, setKeyId] = useState("");
  const [isYearly, setIsYearly] = useState(false);

  const [Razorpay] = useRazorpay();

  const snap = useSnapshot(state);

  const handlePayment = useCallback(
    async (res) => {
      const options = {
        key: keyId,
        amount: paymentAmount,
        order_id: res?.id,
        currency: "INR",
        name: "Social Seller Technologies",
        prefill: {
          name: snap.adminInfo?.name,
          email: snap?.adminInfo?.email,
          contact: snap?.adminInfo?.phone,
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
            (response.razorpay_payment_id < 1 &&
              response.razorpay_order_id == "undefined") ||
            (response.razorpay_order_id < 1 &&
              response.razorpay_signature == "undefined") ||
            response.razorpay_signature < 1
          ) {
            return false;
          } else {
            const res = await serverPaymentverify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (res?.status === 200) {
              state.paymentAlertModal = false;
              state.serverFeePaidModal = true;
              setShowPlansModal(false);
            }
          }
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open();
    },
    [
      Razorpay,
      keyId,
      paymentAmount,
      setShowPlansModal,
      snap.adminInfo?.email,
      snap.adminInfo?.name,
      snap.adminInfo?.phone,
    ]
  );

  const handlePrePayment = async (plan) => {
    // console.log(plan);
    try {
      let res = await serverPaymentRequest(plan);
      if (res?.status === 200) {
        setPaymentAmout(res?.data?.data);
        setKeyId(res?.data?.key_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlePayment(paymentAmount);
  }, [handlePayment, paymentAmount]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-black/[.95] fixed inset-0 z-20 flex  items-center justify-center  overflow-y-scroll scrollbar-hide "
      >
        <motion.div
          initial={{ scale: 0, rotate: "20deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white border rounded-lg w-full max-w-3xl shadow-xl cursor-default relative overflow-y-scroll scrollbar-hide"
        >
          {/* <div className="w-full flex items-end justify-start gap-2 p-3">
            <div className="w-full relative p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Basic</h3>
                <p className="mt-4 flex items-baseline ">
                  <span className="text-5xl font-extrabold tracking-tight">
                    ₹499
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
              </div>
              <div
                onClick={() => paymentHandler("basic_monthly_server_price")}
                className="bg-emerald-500 cursor-pointer text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
              >
                Pay Now
              </div>
            </div>
            <div className="w-full relative p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <span className="text-xl font-semibold">Value For Money</span>
                <div className="w-full flex items-center justify-center">
                  <span className="absolute top-0 right-1/2 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2 ">
                    Most popular
                  </span>
                </div>
                <p className="mt-4 flex items-baseline ">
                  <span className="text-5xl font-extrabold tracking-tight">
                    ₹1499
                  </span>
                  <span className="ml-1 text-xl font-semibold">/Month</span>
                </p>
                <p className="capitalize font-medium">
                  (save flat 20% with yearly plan)
                </p>
              </div>
              <div
                onClick={() => paymentHandler("basic_yearly_server_price")}
                className="bg-emerald-500 cursor-pointer text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
              >
                Pay Now
              </div>
            </div>

          </div> */}

          <div className=" bg-gradient-to-br from-blue-100 to-indigo-100 py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
                Choose Your Plan
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Select the perfect plan for your needs
              </p>
              <div className="flex justify-center mb-12">
                <div className="flex items-center bg-white rounded-full p-1 shadow-md">
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      !isYearly ? "bg-blue-500 text-white" : "text-gray-700"
                    }`}
                    onClick={() => setIsYearly(false)}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      isYearly ? "bg-blue-500 text-white" : "text-gray-700"
                    }`}
                    onClick={() => setIsYearly(true)}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {plans?.map((plan, index) => (
                  <SubscriptionCard
                    key={index}
                    plan={plan.plan}
                    price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    features={plan.features}
                    isPopular={plan.isPopular}
                    isYearly={isYearly}
                    monthlyType={plan.monthlyBasicType}
                    yearlyType={plan.yearlyProType}
                    paymentHanlder={handlePrePayment}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlansModal;

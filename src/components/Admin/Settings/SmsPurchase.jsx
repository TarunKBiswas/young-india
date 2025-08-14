/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { buySmsApi, buySmsVerifyApi } from "../../../utils/settings";
import { SuccessAlert } from "../../Toast";
import useRazorpay from "react-razorpay";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state";

const SmsPurchase = ({ settingsData }) => {
  const [smsQuantity, setSmsQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [keyID, setKeyID] = useState("");
  const [amount, setAmount] = useState("");

  const snap = useSnapshot(state);
  const [Razorpay] = useRazorpay();

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    setSmsQuantity(quantity);
    setTotalAmount(quantity * 0.25);
  };

  const buyNowHandler = async () => {
    try {
      let res = await buySmsApi({ message_qty: smsQuantity });
      if (res?.status === 200) {
        setKeyID(res?.data);
        setAmount(res?.data?.data?.amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlePayment(keyID);
  }, [keyID]);

  const handlePayment = async (res) => {
    const options = {
      key: res?.key_id,
      amount: amount,
      order_id: res?.data?.id,
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
          const res = await buySmsVerifyApi({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          if (res?.status === 200) {
            SuccessAlert("Sms Purchase Successful");
          }
        }
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  return (
    <div className="w-full max-w-lg ">
      <div className=" p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">SMS Balance</h2>
          <span
            className={`text-xl font-bold ${
              settingsData?.msg_balance < 50 ? "text-red-600" : "text-green-600"
            } `}
          >
            {settingsData?.msg_balance} SMS
          </span>
        </div>

        <div className="mt-4">
          <label
            htmlFor="smsQuantity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Buy More SMS
          </label>
          <input
            type="number"
            value={smsQuantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="mt-2 text-sm text-gray-700 font-semibold">
            {" "}
            Quantity: {smsQuantity} * {"₹"}0.25
          </div>
          <div className="mt-2 text-sm text-gray-700">
            Total Amount:{" "}
            <span className="font-semibold">
              ₹{totalAmount?.toFixed(2) || "0.25"}
            </span>
          </div>
        </div>

        {/* Buy Button */}
        <button
          className="mt-4 w-full py-2 px-4 bg-themecolor text-white font-semibold rounded-md shadow "
          onClick={buyNowHandler}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default SmsPurchase;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const RazorPaySettings = ({
  settingsData,
  inputData,
  setInputData,
  updateSetting,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full">
          <label className="font-semibold text-sm">Razorpay Secret</label>
          <div className="relative flex items-center mt-6">
            <input
              className=" w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
              type="text"
              placeholder="Razorpay Secret..."
              defaultValue={settingsData?.razorpay_secret}
              onChange={(e) =>
                setInputData({ ...inputData, razorpay_secret: e.target.value })
              }
            />
          </div>
        </div>

        <div className="w-full">
          <label className="font-semibold text-sm">Razorpay Key</label>
          <div className="relative flex items-center mt-6">
            <input
              className=" w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
              type="text"
              placeholder="Razorpay Key..."
              defaultValue={settingsData?.razorpay_key}
              onChange={(e) =>
                setInputData({ ...inputData, razorpay_key: e.target.value })
              }
            />
          </div>
        </div>

        <div className="w-full">
          <label className="font-semibold text-sm">Account Number</label>
          <div className="relative flex items-center mt-6">
            <input
              className=" w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
              type="text"
              placeholder="Razorpay Key..."
              defaultValue={settingsData?.razorpayX_account_number}
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  razorpayX_account_number: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end my-6">
        <button
          className={`submitButton py-[11px] rounded absolute mt-2  `}
          onClick={(e) =>
            updateSetting(
              {
                razorpay_secret:
                  inputData?.razorpay_secret || settingsData?.razorpay_secret,
                razorpay_key:
                  inputData?.razorpay_key || settingsData?.razorpay_key,
                razorpayX_account_number:
                  inputData?.razorpayX_account_number ||
                  settingsData?.razorpayX_account_number || "null",
              },
              e
            )
          }
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default RazorPaySettings;

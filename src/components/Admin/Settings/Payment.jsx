/* eslint-disable react/prop-types */
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import RazorPaySettings from "./RazorPaySettings";
import PhonePay from "./PhonePay";
import TabList from "../UI/TabList";

const Payment = ({ settingsData, inputData, setInputData, updateSetting }) => {
  const [categories] = useState({
    RazorPay: "",
    PhonePe: "",
  });

  const changeHandler = (type) => {
    updateSetting({ selected_payment_gateway: type });
  };

  return (
    <div className="w-full flex items-start justify-between flex-col max-w-5xl">
      <div className="w-full sm:px-0 mt-4">
        <TabGroup>
          <div className="w-full flex items-center justify-between">
            <TabList categories={categories} size={"max-w-lg"} />
            <div className="hidden lg:flex text-lg  text-gray-700 items-center gap-4">
              Current :
              <select
                className="border border-gray-200"
                onChange={(e) => changeHandler(e.target.value)}
              >
                <option value="" selected disabled>
                  {settingsData?.selected_payment_gateway}
                </option>
                <option value="RAZORPAY">Razorpay</option>
                <option value="PHONEPE">PhonePe</option>
              </select>
            </div>
          </div>
          <TabPanels className="mt-4">
            <TabPanel>
              <RazorPaySettings
                settingsData={settingsData}
                inputData={inputData}
                setInputData={setInputData}
                updateSetting={updateSetting}
              />
            </TabPanel>
            <TabPanel>
              <PhonePay
                settingsData={settingsData}
                inputData={inputData}
                setInputData={setInputData}
                updateSetting={updateSetting}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Payment;

import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import Payment from "./Settings/Payment.jsx";
import AuthSetting from "./Settings/AuthSetting.jsx";
import StoreSetting from "./Settings/StoreSetting.jsx";
import ThemeSettings from "./Settings/ThemeSettings.jsx";
import PricingSettings from "./Settings/PricingSettings.jsx";
import { thankyouModalHandler } from "../../utils/const_API.js";
import ShipRocketSetting from "./Settings/ShipRocketSetting.jsx";
import GlobalBrandSettings from "./Settings/GlobalBrandSettings.jsx";
import { getGlobadData, updateGlobalData } from "../../utils/settings.js";
import TabList from "./UI/TabList.jsx";
import OutletWrapper from "../../Pages/OutletWrapper.jsx";
import Marketing from "./Settings/Marketing.jsx";

const Settings = () => {
  const [settingsData, setSettingData] = useState(null);
  const [inputData, setInputData] = useState({
    withdraw_limit: null,
    cod_prepaid: null,
    shipping_value: null,
    shipping_value_type: null,
    razorpay_key: null,
    razorpay_secret: null,
    razorpayX_account_number: null,
    cashfree_client_id: null,
    cashfree_client_secret: null,
    phonepe_key_index: null,
    phonepe_merchant_id: null,
    phonepe_merchant_key: null,
    user_verification_method: null,
    prepaid_discount_type: null,
    prepaid_discount: null,
  });

  const [pixelCode, setPixelCode] = useState(null);

  const [cod_enabled, setCodEnabled] = useState(null);

  const getSettingsData = useCallback(async () => {
    try {
      const res = await getGlobadData();
      // console.log(res);
      if (res?.status === 200) {
        setSettingData(res?.data?.data);
        setCodEnabled(res?.data?.data?.cod_enabled);
        setPixelCode(res?.data?.data?.facebook_pixel);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (settingsData === null) {
      getSettingsData();
    }
  }, [getSettingsData, settingsData]);

  const updateSetting = async (data) => {
    try {
      // console.log(data);
      let res = await updateGlobalData(data);
      console.log(res);
      if (res?.status === 200) {
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function pixelCodeHandler(code) {
    // console.log(code);
    const head = document.getElementsByTagName("head")[0];

    const existingPixelScript = document.getElementById("fb-pixel-script");
    if (existingPixelScript) {
      head.removeChild(existingPixelScript);
    }

    const pixelScript = document.createElement("script");
    pixelScript.id = "fb-pixel-script";
    pixelScript.innerHTML = code;
    head.appendChild(pixelScript);
  }

  useEffect(() => {
    if (pixelCode) {
      pixelCodeHandler(pixelCode);
    }
  }, [pixelCode]);

  const [categories] = useState({
    Brand: "",
    Store: "",
    "Order & Wallet": "",
    Payment: "",
    Shipping: "",
    Theme: "",
    Notification: "",
    Marketing: "",
  });

  return (
    <OutletWrapper>
      <div className="w-full flex items-start justify-between flex-col">
        <span className="text-black text-2xl font-semibold">Settings</span>
        <div className="w-full sm:px-0 mt-4">
          <TabGroup>
            <TabList
              categories={categories}
              size={"max-w-6xl flex-col md:flex-row"}
            />
            <TabPanels className="mt-4">
              <TabPanel>
                <GlobalBrandSettings />
              </TabPanel>
              <TabPanel>
                <StoreSetting />
              </TabPanel>
              <TabPanel>
                <PricingSettings
                  settingsData={settingsData}
                  inputData={inputData}
                  setInputData={setInputData}
                  updateSetting={updateSetting}
                  cod_enabled={cod_enabled}
                  setCodEnabled={setCodEnabled}
                />
              </TabPanel>
              <TabPanel>
                <Payment
                  settingsData={settingsData}
                  inputData={inputData}
                  setInputData={setInputData}
                  updateSetting={updateSetting}
                />
              </TabPanel>
              <TabPanel>
                <ShipRocketSetting
                  settingsData={settingsData}
                  inputData={inputData}
                  setInputData={setInputData}
                  updateSetting={updateSetting}
                />
              </TabPanel>
              <TabPanel>
                <ThemeSettings />
              </TabPanel>
              <TabPanel>
                <AuthSetting
                  settingsData={settingsData}
                  inputData={inputData}
                  setInputData={setInputData}
                  updateSetting={updateSetting}
                />
              </TabPanel>
              <TabPanel>
                <Marketing
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
    </OutletWrapper>
  );
};

export default Settings;

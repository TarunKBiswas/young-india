import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import Notification from "./Notification";
import SmsPurchase from "./SmsPurchase";
import TabList from "../UI/TabList";

/* eslint-disable react/prop-types */
const AuthSetting = ({
  settingsData,
  inputData,
  setInputData,
  updateSetting,
}) => {
  const [categories] = useState({
    "Auth Notification": "",
    "SMS Service": "",
  });

  return (
    <div className="w-full flex items-start justify-between flex-col max-w-5xl">
      <div className="w-full sm:px-0 mt-4">
        <TabGroup>
          <div className="w-full flex items-center justify-between">
            <TabList categories={categories} size={"max-w-lg"} />
          </div>
          <TabPanels className="mt-4">
            <TabPanel>
              <Notification
                settingsData={settingsData}
                inputData={inputData}
                setInputData={setInputData}
                updateSetting={updateSetting}
              />
            </TabPanel>
            <TabPanel>
              <SmsPurchase
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

export default AuthSetting;

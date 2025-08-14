/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FreePlans from "./FreePlans.jsx";
import SubscriptionPlans from "./SubscriptionPlans.jsx";
import { Tab, TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import TabList from "../UI/TabList.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const Plans = () => {
  const [plans] = useState({
    Free: "",
    Premium: "",
  });

  return (
    <OutletWrapper>
      <div className="w-full flex items-start justify-between flex-col">
        <span className="text-black text-2xl font-semibold">Plans</span>
        <div className="w-full sm:px-0 mt-4">
          <TabGroup>
            <TabList categories={plans} size={"max-w-sm"} />
            <TabPanels className="mt-[55px]">
              <TabPanel>
                <FreePlans />
              </TabPanel>
              <TabPanel>
                <SubscriptionPlans />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </OutletWrapper>
  );
};

export default Plans;

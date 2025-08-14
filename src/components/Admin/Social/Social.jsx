import { useState } from "react";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import CampaignListing from "./Campaign/CampaignListing.jsx";
import GroupList from "./Groups/GroupList.jsx";
import TabList from "../UI/TabList.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const Social = () => {
  const [data] = useState({
    Campaigns: "",
    Groups: "",
  });

  return (
    <OutletWrapper>
      <div className="w-full flex items-start justify-between flex-col">
        <span className="text-black text-2xl font-semibold">
          Campaign & Groups
        </span>
        <div className="w-full sm:px-0 mt-4">
          <TabGroup>
            <TabList categories={data} size={"max-w-sm"} />
            <TabPanels>
              <TabPanel>
                <CampaignListing />
              </TabPanel>
              <TabPanel>
                <GroupList />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </OutletWrapper>
  );
};

export default Social;

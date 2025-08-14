import { useEffect, useState } from "react";

import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import StoreType from "./store/StoreType";
import Promotion from "./store/Promotion";
import TabList from "../UI/TabList";
import StoreFooterData from "./store/StoreFooterData";
import { getStoreFooterData } from "../../../utils/settings";
import Marquees from "./store/Marquees";
import Testimonails from "./store/Testimonails";
import Story from "./store/Story";
// import DeleteStoreData from "./store/DeleteStoreData";
// import { useSnapshot } from "valtio";

const StoreSetting = () => {
  const [data, setData] = useState(null);

  const [categories] = useState({
    Status: "",
    Marquee: "",
    Testimonials: "",
    Stories: "",
    Promotion: "",
    Footer: "",
    // "Delete Data": "",
  });

  const getData = async () => {
    try {
      let res = await getStoreFooterData();
      if (res?.status === 200) {
        setData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex items-start justify-between flex-col">
        <div className="w-full mt-2">
          <TabGroup>
            <div className="w-full flex items-center justify-between">
              <TabList categories={categories} size={"max-w-3xl"} />
            </div>
            <TabPanels className="mt-4">
              <TabPanel>
                <StoreType />
              </TabPanel>
              <TabPanel>
                <Marquees />
              </TabPanel>
              <TabPanel>
                <Testimonails />
              </TabPanel>
              <TabPanel>
                <Story />
              </TabPanel>
              <TabPanel>
                <Promotion />
              </TabPanel>
              <TabPanel>
                <StoreFooterData data={data} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};

export default StoreSetting;

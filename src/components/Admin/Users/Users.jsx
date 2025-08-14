// import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";

import UserListing from "./Customers/CustomerListing";
// import StaffListing from "./Staff/StaffListing";
// import TabList from "../UI/TabList";
import OutletWrapper from "../../../Pages/OutletWrapper";

const Users = () => {
  return (
    <OutletWrapper>
      <div className="w-full flex items-start justify-between flex-col">
        <span className="text-black text-2xl font-semibold">Users</span>
        <div className="w-full sm:px-0 ">
          <UserListing />
        </div>
      </div>
    </OutletWrapper>
  );
};

export default Users;

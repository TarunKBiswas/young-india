/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { sidebarMenu } from "../../../data/SidebarData.js";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import { useState } from "react";
import logo from "../../../assets/SSA-Logo.png";
import { LogOut } from "lucide-react";

const Sidebar = ({ showSidebar }) => {
  const snap = useSnapshot(state);

  // const [activeRoute, setActiveRoute] = useState("");
  const [activeRoute, setActiveRoute] = useState(location.pathname.slice(1));

  let storeType = snap.storeType?.store_type;

  const handleClick = (route) => {
    setActiveRoute(route);
  };

  const filteredSidebarData = sidebarMenu?.filter((item) => {
    if (storeType === "RESELLER-ECOMMERCE") {
      return true;
    }

    // return !["Plans", "Subscribers", "Wallet", "Campaign"]?.includes(
    return !["Plans", "Subscribers", "Wallet"]?.includes(item?.name);
  });

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <div className={`${snap.hideSideBarName ? "hidden" : "block"}`}>
      <div
        className={
          showSidebar
            ? "lg:hidden bg-gradient-to-b from-[#081229] to-[#223d7c] w-[232px] h-full top-[65px] sm:top-[95px] z-10 left-0 fixed transition-all duration-500 shadow-sm overflow-scroll scrollbar-hide pb-20"
            : "hidden bg-gradient-to-b from-[#081229] to-[#1f376e] lg:flex w-[225px] h-screen top-10 left-[-100%] fixed transition-all duration-500 lg:left-0 flex-col lg:top-0 shadow-sm"
        }
      >
        <div className="sidebar-wrapper relative overflow-y-scroll scrollbar-hide h-full">
          <div className="w-full max-h-screen">
            {/* Sidebar Logo and Navigation */}
            <div>
              <div className="w-full flex items-center justify-center my-2">
                <img src={logo} alt="" className="w-full max-w-[200px]" />
              </div>

              <nav className="space-y-1 py-2">
                {filteredSidebarData?.map((data, i) => (
                  <div
                    key={i}
                    className={`text-white text-sm hover:bg-blue-950 duration-300 ${
                      activeRoute === data?.route
                        ? "bg-blue-950 font-semibold"
                        : ""
                    } hover:text-white`}
                  >
                    <Link
                      to={data?.route}
                      className="p-2.5 mt-0.5 flex items-center px-4 transition-all duration-1000 cursor-pointer"
                      onClick={() => handleClick(data?.route)}
                    >
                      <data.icon className="text-[#3970e7] font-bold h-6 w-6" />
                      <div className="w-full flex items-center justify-between">
                        <span
                          className={`text-sm ml-3 text-white font-medium ${
                            snap.hideSideBarName ? "hidden" : "block"
                          }`}
                        >
                          {data.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
                <div
    className={`text-white text-sm hover:bg-blue-950 duration-300 ${
      activeRoute === "/blogs"
        ? "bg-blue-950 font-semibold"
        : ""
    } hover:text-white`}
  >
    <Link
      to="/blogs"
      className="p-2.5 mt-0.5 flex items-center px-4 transition-all duration-1000 cursor-pointer"
      onClick={() => handleClick("/blogs")}
    >
      {/* Example icon from Heroicons */}
      <svg
        className="text-[#3970e7] font-bold h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
      </svg>
      <div className="w-full flex items-center justify-between">
        <span
          className={`text-sm ml-3 text-white font-medium ${
            snap.hideSideBarName ? "hidden" : "block"
          }`}
        >
          Blogs
        </span>
      </div>
    </Link>
  </div>
              </nav>
            </div>
            {/* Fixed Logout Button */}
            <div className="relative bottom-0 w-full  py-2 ">
              <div
                onClick={handleLogout}
                className="w-full flex gap-4 text-sm items-center justify-start p-2 pl-4 text-white cursor-pointer hover:bg-blue-900 transition-all duration-300 font-semibold "
              >
                <LogOut className="text-[#3970e7] font-bold h-6 w-6" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

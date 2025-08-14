/* eslint-disable react-hooks/exhaustive-deps */
import { IoIosArrowForward } from "react-icons/io";
import { Link, useResolvedPath } from "react-router-dom";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Logout from "../UI/Icon/Logout";
import { webState } from "../../../data/webStates";
import { useSnapshot } from "valtio";
import { userAccountData } from "../../../data/SidebarData";

const SettingsSidebarDesktop = () => {
  const path = useResolvedPath();
  const snap = useSnapshot(webState);

  const handleLogin = () => {
    webState.showLogotModal = true;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const storeType = snap.storeInfo.store_type;

  const filterdData = userAccountData?.filter((data) => {
    if (storeType === "RESELLER-ECOMMERCE") {
      return true;
    } else {
      return !["plans", "wallet"]?.includes(data?.link);
    }
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 ">
        {filterdData?.map((data) => {
          return (
            <Link
              to={data?.link === "setting" ? "/setting" : data?.link}
              key={data?.link}
              className={twMerge([
                `flex justify-between items-center px-3 h-[50px] text-[#000000]/50 cursor-pointer stroke-[#222222] `,
                path.pathname.split("/")[
                  path.pathname.split("/").length - 1
                ] === data?.link && "bg-themecolor text-white",
              ])}
            >
              <span className="flex gap-2 items-center justify-center">
                <data.icon className="w-6 h-6 flex items-center" />
                <span className="text-base">{data?.name}</span>
              </span>
              <span>
                <IoIosArrowForward className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
        <div
          className="flex items-center justify-center p-2 bottom-0 cursor-pointer"
          onClick={handleLogin}
        >
          <span className="flex gap-[12px] items-center justify-center">
            <Logout className="w-5 h-5 flex items-center " />
            <span className="text-base">Logout</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebarDesktop;

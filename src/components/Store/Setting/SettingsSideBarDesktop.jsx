/* eslint-disable react-hooks/exhaustive-deps */

import { IoIosArrowForward } from "react-icons/io";
import { Link, useResolvedPath } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { webState } from "../../../data/webStates";
import { CiLogout } from "react-icons/ci";
import { useSnapshot } from "valtio";
import { userAccountData } from "../../../data/SidebarData";

const SettingsSidebarDesktop = () => {
  const path = useResolvedPath();
  const snap = useSnapshot(webState);

  const handleLogin = () => {
    webState.showLogotModal = true;
  };

  const storeType = snap.storeInfo.store_type;

  const filterdData = userAccountData?.filter((data) => {
    if (storeType === "RESELLER-ECOMMERCE") {
      return true;
    } else {
      return !["plans", "wallet"]?.includes(data?.link);
    }
  });

  return (
    <div className="w-full bg-gray-50 rounded h-full">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col">
          {filterdData?.map((data) => {
            return (
              <Link
                to={data?.link === "setting" ? "/setting" : data?.link}
                key={data?.link}
                className={twMerge([
                  `flex justify-between items-center p-3 cursor-pointer stroke-[#222222]`,
                  path.pathname.split("/")[
                    path.pathname.split("/").length - 1
                  ] === data?.link &&
                    "bg-themecolor text-white fill-white stroke-white rounded",
                ])}
              >
                <span className="flex gap-[12px] items-center justify-center">
                  <data.icon className="w-5 h-5 flex items-center " />
                  <span className="text-base">{data?.name}</span>
                </span>

                <span>
                  <IoIosArrowForward className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center py-4 bg-black/10">
          <div className="flex gap-[12px] bottom-0 items-end justify-center ">
            <CiLogout className="w-5 h-5 flex items-center " />
            <span className="text-base cursor-pointer" onClick={handleLogin}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebarDesktop;

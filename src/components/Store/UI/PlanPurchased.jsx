/* eslint-disable react/prop-types */
import { IoDiamondOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSnapshot } from "valtio";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { webState } from "../../../data/webStates";

const PlanPurchased = () => {
  const snap = useSnapshot(webState);

  const userInfo = snap?.userData;

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-3 bg-white border h-full rounded-md shadow-md px-3 py-2 ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>
            <IoDiamondOutline className="w-5 h-5 flex items-center" />
          </span>
          <p className="text-xl  text-black font-semibold">
            {userInfo?.subscription?.plan?.name}
          </p>
        </div>
        <p className=" text-themecolor font-medium ">
          Valid Till - {userInfo?.subscription?.validTo}
        </p>
      </div>
      <span className="w-full text-sm font-normal  ">
        {userInfo?.subscription?.plan?.description}
      </span>
      <div className="flex flex-col items-center w-full justify-start mt-2 gap-2">
        <span className="text-xl text-[#434343] w-full font-medium">
          Features
        </span>

        <div className="flex flex-col items-center gap-3 text-base font-normal w-full my-2 ">
          <div className="w-full flex items-center gap-3">
            <span>
              {userInfo?.subscription?.plan?.premiumPricing ? (
                <BsFillCheckCircleFill className="w-7 h-5 text-green-600" />
              ) : (
                <RxCross2 className="w-7 h-5 text-themecolor " />
              )}
            </span>
            <span className="font-medium">Premium Pricing</span>
          </div>
          <div className="w-full flex items-center gap-3">
            <span>
              {userInfo?.subscription?.plan?.premiumPricing ? (
                <BsFillCheckCircleFill className="w-7 h-5 text-green-600" />
              ) : (
                <RxCross2 className="w-7 h-5 text-themecolor " />
              )}
            </span>
            <span className="font-medium">Prepaid Orders</span>
          </div>
          <div className="w-full flex items-center gap-3">
            <span>
              {userInfo?.subscription?.plan?.premiumPricing ? (
                <BsFillCheckCircleFill className="w-7 h-5 text-green-600" />
              ) : (
                <RxCross2 className="w-7 h-5 text-themecolor " />
              )}
            </span>
            <span className="font-medium">COD Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPurchased;

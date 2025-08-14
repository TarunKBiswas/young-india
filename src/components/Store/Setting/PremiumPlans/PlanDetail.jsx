/* eslint-disable react/prop-types */
import { IoDiamondOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { AiOutlineCheck } from "react-icons/ai";
import moment from "moment";

const PlanDetail = () => {
  const snap = useSnapshot(webState);

  const userInfo = snap?.userData?.data;

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-3 bg-white border h-full shadow-md px-3 py-2 ">
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
          Valid Till -{" "}
          {moment(userInfo?.subscription?.valid_to).format("MMM Do YY")}
        </p>
      </div>
      <span className="w-full text-sm font-normal capitalize">
        {userInfo?.subscription?.plan?.description}
      </span>
      <div className="flex flex-col items-center w-full justify-start mt-2 gap-2 capitalize">
        <span className="text-xl text-[#434343] w-full font-medium">
          Features
        </span>

        <div className="flex gap-3 text-base font-normal items-center justify-start my-4 w-full">
          <div className="flex flex-col text-black/50 gap-3 tracking-wide text-sm">
            {userInfo?.subscription?.plan?.features?.map((title, i) => {
              return (
                <div className="flex  gap-3 text-[16px]" key={i}>
                  {title?.is_tick ? (
                    <AiOutlineCheck className="w-7 h-5 text-green-600" />
                  ) : (
                    <RxCross2 className="w-7 h-5 text-themecolor " />
                  )}
                  <span>{title?.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;

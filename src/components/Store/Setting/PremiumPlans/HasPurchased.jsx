/* eslint-disable react/prop-types */
import { AiOutlineCheck } from "react-icons/ai";
import { IoDiamondOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const HasPurchased = ({ data }) => {
  const [purchase, setPurchased] = useState();

  return (
    <div>
      <div className="w-full flex flex-col items-center gap-2 mt-3 bg-white border h-full rounded-md shadow-md py-2 px-3 ">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center md:gap-2">
            <IoDiamondOutline className="w-4 h-4 md:w-5 md:h-5 flex items-center" />
            <p className="text-[25px] md:text-[30px] text-black font-semibold">
              Diamond
            </p>
          </div>
          <p className="text-[11px] md:text-[14px] text-[#E90F23] font-normal">
            Plan Expiring 2 days left !
          </p>
        </div>
        <p className="w-full text-[12px] md:text-[14px] font-normal text-black/50 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>

        <div className="flex flex-col items-center w-full justify-start">
          <div className="flex flex-col gap-3 text-[16px]">
            <p>
              {data?.pricingPlans ? (
                <AiOutlineCheck className="flex flex-col items-center justify-center " />
              ) : (
                <RxCross2 className="flex flex-col items-center" />
              )}
            </p>

            <p>
              {data?.pricingPlans ? (
                <AiOutlineCheck className="flex flex-col items-center justify-center gap-3 lg:grid lg:grid-cols-3 lg:gaps-3 xl:grid xl:grid-cols-4 xl:gap-4" />
              ) : (
                <RxCross2 className="flex flex-col items-center justify-center gap-3 lg:grid lg:grid-cols-4 lg:gap-3 xl:grid xl:grid-col" />
              )}
            </p>

            <p>
              {data?.prepaidPlans ? (
                <AiOutlineCheck className="w-7 h-5 text-green-600" />
              ) : (
                <RxCross2 className="w-7 h-5 text-themecolor" />
              )}
            </p>

            <p>
              {data?.codPlans ? (
                <AiOutlineCheck className="w-7 h-5 text-green-600" />
              ) : (
                <RxCross2 className="w-7 h-5 text-themecolor " />
              )}
            </p>
          </div>
          <div className="flex flex-col text-black/50 gap-3 tracking-wide">
            <p>Premium Pricing</p>
            <p>Prepaid Orders</p>
            <p>COD Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasPurchased;

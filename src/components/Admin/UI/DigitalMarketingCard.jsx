/* eslint-disable react/prop-types */
import { FaRegUser, FaStar } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { PiCertificateBold } from "react-icons/pi";

const DigitalMarketingCard = ({ data, title }) => {
  return (
    <div className="rounded-xl shadow-md flex flex-col bg-white h-full ">
      <div className="w-full h-2/3">
        <img src={data?.instructor?.image_url} className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-2 items-start h-full w-full">
        <div className="flex items-center gap-3 p-2">
          <div className="flex gap-1 items-center ">
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar key={s} className="text-[#ffcc00] w-6 h-5" />
            ))}
          </div>
          <div className="flex items-center text-[#121127] font-semibold text-[20px]">
            {data?.rating?.stars}
          </div>
          <div className="text-[#121127]/50 font-semibold text-sm">
            ({data?.rating?.reviews})
          </div>
        </div>

        <div className="flex flex-col gap-3 px-2">
          <h3 className="font-bold text-[#121127] text-[18px]">
            {data?.course_name || data?.title}
          </h3>

          <div className="flex gap-5 text-[#121127]/50 font-medium text-[14px] ">
            <div className="flex items-center gap-1">
              <span className="">
                <IoIosTimer className="text-[#121127]/70 w-4 h-4 font-semibold" />
              </span>{" "}
              <p>{data?.details?.duration || data?.business_name}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="">
                <FaRegUser className="text-[#121127]/70 w-4 h-4 font-semibold" />
              </span>{" "}
              <p>{data?.details?.students || data?.category}</p>
            </div>
            {data?.details?.certificate && (
              <div className="flex items-center gap-1">
                <span className="mr-1">
                  <PiCertificateBold className="text-[#121127]/70 w-4 h-5 font-semibold" />
                </span>{" "}
                <p>{data?.details?.certificate === true && "certificate"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" w-full flex mt-3 justify-end">
        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-b-xl hover:bg-blue-700 transition duration-300">
          {title}
        </button>
      </div>
    </div>
  );
};

export default DigitalMarketingCard;

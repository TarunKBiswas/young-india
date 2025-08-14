import { useState } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineContentCopy,
  // MdSupportAgent,
} from "react-icons/md";
import { SuccessAlert } from "../../Toast";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
// import { AiOutlineYoutube } from "react-icons/ai";
// import { IoIosRadio } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { supportNumber } from "../../../utils/const_API";
import OutletWrapper from "../../../Pages/OutletWrapper";
import { Globe } from "lucide-react";

const StoreLink = () => {
  const [copied, setCopied] = useState(false);
  const snap = useSnapshot(state);

  const copyDescHandler = (link) => {
    navigator.clipboard.writeText(link);
    SuccessAlert("URL Copied");
    setCopied(true);
  };

  // console.log(snap.globalData);
  let link = snap.globalData?.data?.store_link;

  const redirectToWhatsApp = (number) => {
    window.open(`https://api.whatsapp.com/send?phone=${number}`, "_blank");
  };

  const handleWhatsAppClick = (link) => {
    const groupLink = `${link}`;
    window.open(groupLink, "_blank");
  };

  // const handleTutorialClick = () => {
  //   const link = `https://youtu.be/P91Vk6ycuGc?si=2-72QiqrHbqc0nPT`;
  //   window.open(link, "_blank");
  // };

  return (
    <OutletWrapper>
      <div className="w-full flex py-4 rounded-lg px-4 bg-blue-600">
        <div className="w-full flex flex-col items-start gap-2 max-w-[1500px] mx-auto">
          <span className="text-sm xl:text-base ml-2 text-white font-medium">
            Here is your store link
          </span>
          <div className="w-full flex items-center justify-between gap-4">
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="w-full flex items-center gap-4 relative">
                <div className="absolute">
                  <Globe className=" ml-2 h-6 w-6 text-slate-400" />
                </div>
                <input
                  className="w-full py-2 pl-10 rounded-full text-xs xl:text-base font-medium bg-gray-200 border-gray-200  text-green-700/95"
                  type="text"
                  disabled
                  value={link}
                />
                <div className=" flex items-center gap-4">
                  <span>
                    {copied ? (
                      <MdOutlineCheckBox className="h-7 w-7 text-white cursor-pointer" />
                    ) : (
                      <MdOutlineContentCopy
                        className="h-6 w-6 text-white cursor-pointer"
                        onClick={() => copyDescHandler(link)}
                      />
                    )}
                  </span>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="tooltipID"
                  >
                    <BsBoxArrowUpRight className="h-6 w-6 text-white cursor-pointer tooltipID " />
                  </a>
                </div>
              </div>
              <div className="w-full hidden lg:flex flex-col lg:flex-row items-center gap-4 ">
                <div
                  className=" bg-white px-3 py-2.5 text-sm rounded-lg text-black font-medium cursor-pointer hover:scale-95 transition-all duration-300"
                  onClick={() => redirectToWhatsApp(supportNumber)}
                >
                  Custom Domain
                </div>
                <div className="relative flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg font-medium text-white cursor-pointer border border-white hover:scale-95 transition-all duration-300">
                  <FaWhatsapp className="h-5 w-5" />
                  <div
                    className=" "
                    onClick={() =>
                      handleWhatsAppClick(
                        "https://chat.whatsapp.com/JDNn7t9K8Ry4JHwjkaVaNv"
                      )
                    }
                  >
                    Join Community
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="hidden  gap-4 items-center justify-end  mt-4">
            <div className="flex flex-col items-center cursor-pointer">
            <AiOutlineYoutube
            className="h-8 w-8 text-white"
            onClick={handleTutorialClick}
            />
            <span className="text-white text-xs">Watch Tutorial</span>
            </div>
            <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() =>
              handleWhatsAppClick("https://socialseller.in/webinar")
              }
              >
              <IoIosRadio className="h-8 w-8 text-white" />
              <span className="text-white text-xs">Live Webinar</span>
              </div>
              <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => redirectToWhatsApp(supportNumber)}
              >
              <MdSupportAgent className="h-8 w-8 text-white" />
              <span className="text-white text-xs"> 24*7 Support</span>
              </div>
              </div> */}
          </div>
        </div>
      </div>
    </OutletWrapper>
  );
};

export default StoreLink;

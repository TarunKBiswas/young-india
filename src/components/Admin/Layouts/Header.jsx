import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { AiOutlineMenu } from "react-icons/ai";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import OptionsDropdown from "./OptionsDropdown.jsx";
// import ssa_logo from "../../../assets/SSA-Logo.png";
import { supportNumber } from "../../../utils/const_API.js";
import { Crown, GraduationCap, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showSidebar, setShowSideBar] = useState(false);
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const sidebarToggle = () => {
    setShowSideBar(false);
  };

  const sidebarHandler = () => {
    setShowSideBar(!showSidebar);
  };

  useEffect(() => {
    state.refreshHeader = false;
  }, [snap.refreshHeader]);

  const redirectToWhatsApp = (number) => {
    window.open(`https://api.whatsapp.com/send?phone=${number}`, "_blank");
  };

  // const location = window.location.host;

  return (
    <>
      <div className="w-full h-16 flex items-center border-b-[1px]  ">
        <div className="w-full flex flex-row-reverse items-center justify-between">
          <div className="w-full flex items-center justify-between">
            {/* <div
              className={`${
                location?.includes("socialseller") ? "block" : "hidden"
              }`}
            >
              <img
                src={ssa_logo}
                alt="Image"
                width="auto"
                height="auto"
                className="h-10"
              />
            </div> */}

            <div className="w-full flex items-center justify-end max-w-[1500px] mx-auto ">
              <div className="flex items-center justify-end mr-4 z-10">
                <span
                  className="flex text-xs items-center gap-1 bg-gray-100 border font-medium px-2 py-2 rounded-lg cursor-pointer hover:scale-95 transition-all"
                  onClick={() => navigate("course")}
                >
                  <GraduationCap className="h-5" /> Academy
                </span>
              </div>
              <div className="flex items-center justify-end z-10 mr-2">
                <span
                  className="flex text-xs items-center gap-1 bg-gradient-to-l from-yellow-400 to-yellow-500 px-2 py-2 rounded-lg text-white cursor-pointer hover:scale-95 transition-all"
                  onClick={() => redirectToWhatsApp(supportNumber)}
                >
                  <Crown className="h-5" /> Upgrade
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[8%] p-0 ml-4 flex items-center justify-start">
            <div className="lg:hidden">
              {!showSidebar ? (
                <AiOutlineMenu
                  className="text-green-600 text-xl cursor-pointer"
                  onClick={sidebarHandler}
                />
              ) : (
                <X
                  className="text-green-600 text-xl cursor-pointer"
                  onClick={sidebarHandler}
                />
              )}
            </div>

            <div className="flex items-center justify-end">
              <OptionsDropdown />
            </div>
          </div>
        </div>
      </div>
      <Sidebar showSidebar={showSidebar} sidebarToggle={sidebarToggle} />
    </>
  );
};

export default Header;

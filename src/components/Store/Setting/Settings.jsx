/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
// import Profile from "./Profile/Profile";
// import SettingsSidebarMobile from "./SettingsSidebarMobile";
import SettingsSidebarDesktop from "./SettingsSideBarDesktop";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import Container from "../UI/Wrappers/Container.Wrapper";

const Setting = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(webState);

  useEffect(() => {
    if (!webState?.resellerToken && !sessionStorage.getItem("usertoken")) {
      navigate("/");
    }
  }, [snap.resellerToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white relative">
      <Container
        className={"w-full lg:max-w-6xl xl:max-w-[90rem] mx-auto min-h-[90vh]"}
      >
        {/* <div className="w-full flex flex-col lg:flex-row-reverse max-w-[1420px] min-h-[400px] mx-auto lg:pt-10"> */}
        <div className="w-full flex flex-col lg:flex-row-reverse mx-auto lg:pt-10 lg:h-[calc(100vh_-_130px)]">
          {/* <div className="w-full hidden">
            <div className="w-full max-w-[945px] mx-auto">
              <Profile />
              <SettingsSidebarMobile />
            </div>
          </div> */}

          <div className="flex w-full lg:flex-row-reverse items-stretch gap-4 h-full">
            <div className="w-full mx-auto flex-1">
              <Outlet />
            </div>
            <div className="hidden lg:block max-w-[280px] 2xl:max-w-[340px] mx-auto flex-1">
              <SettingsSidebarDesktop />
            </div>
          </div>
          {/* <div className="flex w-full lg:flex-row-reverse items-stretch gap-4">
            <div className="w-full lg:max-w-[950px] 2xl:max-w-[1000px] mx-auto flex-1">
              <Outlet />
            </div>
            <div className="hidden lg:block max-w-[280px] 2xl:max-w-[340px] mx-auto flex-1 ">
              <SettingsSidebarDesktop />
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Setting;

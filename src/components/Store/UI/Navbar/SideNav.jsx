/* eslint-disable react/prop-types */
import { useState } from "react";
import SidebarDropdownItem from "./SidebarDropdownItem";
import { HiX } from "react-icons/hi";
import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { ArrowRightLeft, ChevronRight, Logs, MapPinHouse } from "lucide-react";
const SideNav = ({
  setSideMenuOpen,
  userLoginHandler,
  getCollectionData,
  categories,
  handleRedirect,
  sideMenuOpen,
}) => {
  const snap = useSnapshot(webState);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (index) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === index ? null : index));
  };

  return (
    <div
      className={`fixed h-full min-h-screen w-screen lg:hidden z-[1990] bg-black/60 top-0 left-0 right-0 bottom-0 backdrop-blur-sm transition-all ${
        sideMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-start justify-between pointer-events-auto relative top-0 max-h-full overflow-clip">
        <div className="flex h-screen w-full flex-col border-r bg-white">
          <div className="flex flex-row gap-3 justify-between px-4 py-3 shadow-[0px_1px_8px_0px_#00000010]">
            {!snap?.loggedinUserData ? (
              <div className="flex items-center py-2">
                <div className="relative items-center">
                  <span
                    onClick={userLoginHandler}
                    className="bg-themecolor text-textcolor font-semibold tracking-wider text-center border !border-black px-3 py-2 rounded-md"
                  >
                    Sign in
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex outline-none gap-3">
                <span
                  onClick={() => {
                    navigate("/setting");
                    setSideMenuOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="h-10 w-10 rounded-full border p-2 flex justify-center items-center">
                    <CiUser className="text-xl" />
                  </div>
                </span>
                <span
                  onClick={() => {
                    navigate("/wishlist");
                    setSideMenuOpen(false);
                  }}
                  className="font-bold text-[18px] flex items-center gap-2"
                >
                  <div className="h-10 w-10 rounded-full border p-2 flex justify-center items-center">
                    <IoMdHeartEmpty className="text-xl" />
                  </div>
                </span>
              </div>
            )}
            <button onClick={() => setSideMenuOpen(false)}>
              <HiX className="text-2xl" />
            </button>
          </div>
          <nav className="flex-1 overflow-x-hidden px-4 relative">
            {getCollectionData && (
              <SidebarDropdownItem
                title="Collections"
                items={getCollectionData}
                isOpen={openMenu === 0}
                handleRedirect={handleRedirect}
                onClick={() => handleMenuClick(0)}
                setSideMenuOpen={setSideMenuOpen}
              />
            )}

            {categories && (
              <SidebarDropdownItem
                title="Categories"
                items={categories}
                isOpen={openMenu === 1}
                handleRedirect={handleRedirect}
                onClick={() => handleMenuClick(1)}
                setSideMenuOpen={setSideMenuOpen}
              />
            )}

            {snap?.loggedinUserData && (
              <>
                <hr className="my-3" />
                <div className="flex flex-col">
                  <div
                    onClick={() => {
                      navigate("setting/order");
                      setSideMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <div className="flex gap-2 items-center">
                      <Logs className="w-4 h-4 flex items-center" />
                      Orders
                    </div>
                    <ChevronRight className="w-4 h-4 flex items-center" />
                  </div>
                  <div
                    onClick={() => {
                      navigate("setting/transaction");
                      setSideMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <div className="flex gap-2 items-center">
                      <ArrowRightLeft className="w-4 h-4 flex items-center" />
                      Transactions
                    </div>
                    <ChevronRight className="w-4 h-4 flex items-center" />
                  </div>
                  <div
                    onClick={() => {
                      navigate("setting/address");
                      setSideMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <div className="flex gap-2 items-center">
                      <MapPinHouse className="w-4 h-4 flex items-center" />
                      Addressess
                    </div>
                    <ChevronRight className="w-4 h-4 flex items-center" />
                  </div>
                </div>
                <div
                  onClick={() => (webState.showLogotModal = true)}
                  className="flex flex-row items-start py-3 left-0 max-h-14 w-full bg-white/80"
                >
                  <span className="font-bold text-medium border py-2 px-3 rounded-md text-red-600">
                    Logout
                  </span>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

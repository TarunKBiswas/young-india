import { RxCross2 } from "react-icons/rx";
import UserInfoData from "../UserInfoData";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
// import NavBarDropDownMenu from "../Navbar/NavBarDropDownMenu";
// import { useState } from "react";

const SideBar = () => {
  const snap = useSnapshot(webState);
  const navigate = useNavigate();
  // const categories = snap.categoriesData;

  // const [activeCategoryMenu, setActiveCategoryMenu] = useState(false);
  // const [activeCollectionMenu, setActiveCollectionMenu] = useState(false);
  // const [activeSubmenu, setActiveSubmenu] = useState(null);

  const closeModalHandler = () => {
    webState.mobileSideBar = false;
  };

  const userLoginHandler = () => {
    webState.previousRoute = window.location.pathname;
    webState.mobileSideBar = false;
    navigate("storelogin");
  };

  const collectionHandler = (id) => {
    webState.mobileSideBar = false;
    navigate(`collection/${id}`);
  };

  const collection = snap?.collectionsData;

  const logoutHandlerModal = () => {
    webState.mobileSideBar = false;
    webState.showLogotModal = true;
  };

  const profileHandler = () => {
    webState.mobileSideBar = false;
    navigate("/setting");
  };

  const whishlisthandler = () => {
    webState.mobileSideBar = false;
    navigate("wishlist");
  };

  // const handleMenuToggle = (type) => {
  //   if (type === "collection") {
  //     setActiveCollectionMenu(!activeCollectionMenu);
  //     setActiveCategoryMenu(false);
  //     setActiveSubmenu(null);
  //   } else {
  //     setActiveCategoryMenu(!activeCategoryMenu);
  //     setActiveCollectionMenu(false);
  //     setActiveSubmenu(null);
  //   }
  // };

  // const handleSubmenuToggle = (index) => {
  //   setActiveSubmenu(activeSubmenu === index ? null : index);
  // };

  // const handleRedirect = (path) => {
  //   navigate(path);
  //   setActiveCategoryMenu(false);
  //   setActiveCollectionMenu(false);
  // };

  return (
    <div
      className={`bg-navBgColor border text-navTextColor fixed top-0 right-0 z-50 w-[85vw] 
        ${
          snap.mobileSideBar ? "translate-x-0" : "translate-x-full"
        } duration-1000 h-screen md:inset-0`}
    >
      <div className="relative p-4 w-full">
        <div className="w-full flex items-center justify-between mt-4">
          <button onClick={closeModalHandler}>
            <RxCross2 className="h-7 w-7" />
          </button>
          <div className={"text-sm flex items-center gap-2"}>
            <span className="text-xl font-medium">
              {!snap?.resellerToken ? (
                <span onClick={userLoginHandler}>Login</span>
              ) : (
                <span onClick={logoutHandlerModal}>Logout</span>
              )}
            </span>
          </div>
        </div>

        {snap?.resellerToken && (
          <div
            onClick={() => profileHandler()}
            className={" p-2 text-sm flex items-center gap-2 mt-6"}
          >
            <CiUser className="h-5 w-5 rounded-full  " />
            <span className="text-[18px] font-normal leading-6"> Profile</span>
          </div>
        )}

        <UserInfoData>
          <div className="flex flex-col gap-3 mt-8">
            <div
              className="text-xl  flex items-center gap-2 font-medium"
              onClick={whishlisthandler}
            >
              Wishlist Items
              <FaHeart className="fill-red-600" />
            </div>
            <hr />
            <div className="w-full flex flex-col gap-3 ps-1.5 ">
              <span className="text-xl font-medium">Collections</span>
              {collection?.map((data, i) => {
                return (
                  <span
                    onClick={() => collectionHandler(data?.id)}
                    className="cursor-pointer capitalize text-base "
                    key={i}
                  >
                    {data?.name}
                  </span>
                );
              })}
            </div>
            {/* <NavBarDropDownMenu
              title="Categories"
              items={categories}
              activeMenu={activeCategoryMenu}
              onToggleMenu={() => handleMenuToggle("category")}
              onSubmenuToggle={handleSubmenuToggle}
              activeSubmenu={activeSubmenu}
              handleRedirect={handleRedirect}
            /> */}
            {/* <NavBarDropDownMenu
              title="Collections"
              items={getCollectionData}
              activeMenu={activeCollectionMenu}
              onToggleMenu={() => handleMenuToggle("collection")}
              onSubmenuToggle={handleSubmenuToggle}
              activeSubmenu={activeSubmenu}
              handleRedirect={handleRedirect}
            /> */}
          </div>
        </UserInfoData>
      </div>
    </div>
  );
};

export default SideBar;

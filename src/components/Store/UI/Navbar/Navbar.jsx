/* eslint-disable react-hooks/exhaustive-deps */
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { getSearch } from "../../../../utils/Store/Products";
import { RxHamburgerMenu } from "react-icons/rx";
// import { IoIosArrowDown } from "react-icons/io";
import { getStoreHeader } from "../../../../utils/Store/Constant";
import { FiLogOut } from "react-icons/fi";
import UserInfoData from "../UserInfoData";
import { getCollection } from "../../../../utils/Store/collection";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import Container from "../Wrappers/Container.Wrapper";
import NavBarDropDownMenu from "./NavBarDropDownMenu";
import SideNav from "./SideNav";
import { Search, ShoppingCart, User } from "lucide-react";
import { getHandlerWithToken } from "../../../../utils/Store/ApiCalls";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const webDropDownMenuData = [
  {
    Icon: IoMdHeartEmpty,
    to: "wishlist",
    onClick: "",
    name: "Wishlist ",
  },
  {
    Icon: IoSettingsOutline,
    to: "setting",
    onClick: "",
    name: "Settings ",
  },
  {
    Icon: FiLogOut,
    onClick: () => (webState.showLogotModal = true),
    name: "Logout",
  },
];

const Navbar = () => {
  const [searchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [getCollectionData, setGetCollectionData] = useState([]);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const snap = useSnapshot(webState);
  const storeType = snap.storeInfo?.store_type;
  const categories = snap.categoriesData;
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = useCallback(() => {
    setIsFixed(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const searchProduct = useCallback(
    async (query) => {
      try {
        const response = await getSearch(query || searchTerm, 1, 20);
        if (response?.status === 200) {
          setSuggestions(response?.data?.data);
          webState.selectCartProduct = response?.data?.data;
          webState.searchPagination = response?.data?.meta?.pagination;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    if (searchTerm?.length >= 2) {
      const timer = setTimeout(() => {
        searchProduct(searchTerm);
        webState.selectCartProduct = suggestions;
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, searchProduct]);

  const collectionList = useCallback(async () => {
    try {
      const res = await getCollection();
      if (res?.status === 200) {
        setGetCollectionData(res?.data?.data);
        webState.collectionsData = res.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    collectionList();
  }, [param.id, collectionList]);

  useEffect(() => {
    if (!snap?.loggedinUserData && !getStoreHeader()) {
      navigate("/");
    }
  }, [snap.loggedinUserData, navigate]);

  const userLoginHandler = useCallback(() => {
    webState.previousRoute = window.location.pathname;
    setSideMenuOpen(false);
    // navigate("storelogin");
    // webState.showLoginModal = true;
    webState.showFlipModal = true;
  }, [navigate]);

  const logo = useMemo(() => snap.brandInfo?.logo_dark?.url, [snap.brandInfo]);

  const userData = useMemo(
    () => JSON.parse(sessionStorage?.getItem("userdata")),
    [sessionStorage?.getItem("userdata")]
  );

  const logoSize = useMemo(
    () => webState?.storeInfo?.logo_size,
    [webState.storeInfo]
  );

  const [activeCategoryMenu, setActiveCategoryMenu] = useState(false);
  const [activeCollectionMenu, setActiveCollectionMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navRef = useRef(null);

  const handleMenuToggle = (type) => {
    if (type === "collection") {
      setActiveCollectionMenu(!activeCollectionMenu);
      setActiveCategoryMenu(false);
      setActiveSubmenu(null);
    } else {
      setActiveCategoryMenu(!activeCategoryMenu);
      setActiveCollectionMenu(false);
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setActiveCategoryMenu(null);
      setActiveCollectionMenu(null);
      setActiveSubmenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRedirect = (path) => {
    window.scrollTo(0, 0);
    // setTimeout(() => navigate(path), 0);
    navigate(path);
    setActiveCategoryMenu(false);
    setActiveCollectionMenu(false);
  };

  const handleClick = () => {
    if (sideMenuOpen) {
      document.body.style.overflowY = "";
    } else {
      document.body.style.overflowY = "hidden";
    }
    setSideMenuOpen(true);
  };

  // console.log(snap.cartItems);

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    setCartQuantity(snap.cartItems?.length);
  }, [snap.cartItems]);

  const getCartData = useCallback(async () => {
    webState.skeletonLoading = true;
    try {
      const res = await getHandlerWithToken("cart/me");
      if (res?.status === 200) {
        webState.cartItems = res?.data?.data?.Variants;
        webState.cartData = res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
    webState.skeletonLoading = false;
  }, [snap.refreshCartItems]);

  useEffect(() => {
    if (snap.loggedinUserData) {
      getCartData();
      // console.log("getting data");
    }
  }, [snap.loggedinUserData, snap.refreshCartItems]);

  return (
    <Disclosure
      as="nav"
      className={`w-full bg-navBgColor shadow-sm transition-transform duration-500 ${
        isFixed ? "fixed top-0 z-50" : "relative"
      }  `}
    >
      <Container>
        <div className="w-full flex items-center justify-between px-2 lg:px-0 sticky top-10 z-10 bg-navBgColor">
          <div className=" flex items-center justify-start min-h-[80px]">
            {snap.brandInfo !== null && logo && (
              <img
                style={{ height: logoSize + "px" || "80px" }}
                className={`object-contain cursor-pointer max-h-[100px]`}
                src={logo}
                width={"auto"}
                height={"auto"}
                alt="Logo"
                loading="lazy"
                onClick={() => navigate("/")}
              />
            )}
          </div>

          {/* <ul className="gap-10 space-x-4 hidden md:flex" ref={navRef}>
            <NavBarDropDownMenu
              title="Categories"
              items={categories}
              activeMenu={activeCategoryMenu}
              onToggleMenu={() => handleMenuToggle("category")}
              onSubmenuToggle={handleSubmenuToggle}
              activeSubmenu={activeSubmenu}
              handleRedirect={handleRedirect}
            />
            <NavBarDropDownMenu
              title="Collections"
              items={getCollectionData}
              activeMenu={activeCollectionMenu}
              onToggleMenu={() => handleMenuToggle("collection")}
              onSubmenuToggle={handleSubmenuToggle}
              activeSubmenu={activeSubmenu}
              handleRedirect={handleRedirect}
            />
          </ul> */}

          <ul className="hidden lg:flex items-center gap-10" ref={navRef}>
            {/* <FaHome className="cursor-pointer" onClick={goToHome} />
            {newArrivals && (
              <div
                onClick={() => collectionHandler(newArrivals?.id)}
                className="text-navTextColor cursor-pointer text-sm px-3 tracking-wide capitalize font-semibold text-center"
              >
                {newArrivals?.name}
              </div>
            )} */}
            {categories?.length > 5 ? (
              <NavBarDropDownMenu
                title="Categories"
                items={categories}
                activeMenu={activeCategoryMenu}
                onToggleMenu={() => handleMenuToggle("category")}
                onSubmenuToggle={handleSubmenuToggle}
                activeSubmenu={activeSubmenu}
                handleRedirect={handleRedirect}
              />
            ) : (
              <>
                {categories?.map((data) => {
                  return (
                    <Link
                      to={`/category/${data?.id}`}
                      className="text-navTextColor font-medium"
                      key={data?.id}
                    >
                      {data?.name}
                    </Link>
                  );
                })}
              </>
            )}

            <NavBarDropDownMenu
              title="Collections"
              items={getCollectionData}
              activeMenu={activeCollectionMenu}
              onToggleMenu={() => handleMenuToggle("collection")}
              onSubmenuToggle={handleSubmenuToggle}
              activeSubmenu={activeSubmenu}
              handleRedirect={handleRedirect}
            />
            <li className="text-navTextColor font-medium cursor-pointer"><Link to={"/blogs"}>Blogs</Link></li>
          </ul>

          <div className=" flex items-center justify-end  gap-2.5 ">
            <div className="flex gap-1 relative">
              <Search
                className="h-6 w-6 cursor-pointer text-navTextColor "
                onClick={() => (webState.fullScreenSearch = true)}
              />
            </div>

            {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
              storeType
            ) && (
              <div
                className="cursor-pointer relative "
                onClick={() => navigate("cart")}
              >
                <ShoppingCart className="h-5 w-6 cursor-pointer hover:scale-110 transition-all duration-300 text-navTextColor " />
                {snap.cartItems?.length > 0 ? (
                  <div className="absolute rounded-full bg-red-600 w-4 h-4 top-[-4px] ms-3 text-white flex items-center justify-center">
                    <span className=" text-[9px] flex items-center justify-center mt-0.5">
                      {cartQuantity}
                    </span>
                  </div>
                ) : null}
              </div>
            )}

            {!snap?.loggedinUserData && (
              <div className="hidden lg:flex gap-1 items-center">
                <User
                  className="h-6 w-6 cursor-pointer text-navTextColor"
                  onClick={userLoginHandler}
                />
              </div>
            )}

            <div className="flex items-start lg:hidden">
              <RxHamburgerMenu
                className="w-6 h-6 text-navTextColor"
                // onClick={() => (webState.mobileSideBar = true)}
                onClick={handleClick}
              />
            </div>

            {!snap?.loggedinUserData ? (
              <div className=" flex items-center"></div>
            ) : (
              <>
                <UserInfoData>
                  <Menu as="div" className="relative hidden lg:block ">
                    <div>
                      <MenuButton className="flex text-sm outline-none">
                        <User className="h-6 w-6 cursor-pointer text-navTextColor" />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to={"/setting"}
                              className={classNames(
                                active ? "bg-gray-100 " : "",
                                " p-2 text-sm flex items-center gap-2"
                              )}
                            >
                              <AiOutlineUser className="h-5 w-5 rounded-full " />
                              <span className="text-base capitalize  ">
                                {userData?.name}
                              </span>
                            </Link>
                          )}
                        </MenuItem>

                        {webDropDownMenuData?.map((item, i) => {
                          return (
                            <MenuItem key={i}>
                              {({ active }) => {
                                return (
                                  <button
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 w-full flex items-center justify-start "
                                        : null,
                                      "p-2 text-base text-gray-700 w-full flex items-center justify-start"
                                    )}
                                    onClick={() => {
                                      if (item?.onClick) {
                                        item?.onClick();
                                      } else {
                                        navigate(`${item?.to}`);
                                      }
                                    }}
                                  >
                                    {item?.Icon && (
                                      <item.Icon className="mr-2 h-5 w-5" />
                                    )}
                                    {item?.name}
                                  </button>
                                );
                              }}
                            </MenuItem>
                          );
                        })}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </UserInfoData>
              </>
            )}

            <SideNav
              setSideMenuOpen={setSideMenuOpen}
              userLoginHandler={userLoginHandler}
              getCollectionData={getCollectionData}
              categories={categories}
              handleRedirect={handleRedirect}
              sideMenuOpen={sideMenuOpen}
            />
          </div>
        </div>
      </Container>
    </Disclosure>
  );
};

export default Navbar;

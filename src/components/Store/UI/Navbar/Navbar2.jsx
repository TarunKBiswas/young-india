/* eslint-disable react-hooks/exhaustive-deps */

import { FiLogOut } from "react-icons/fi";
import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { TfiBell } from "react-icons/tfi";
import { webState } from "../../../../data/webStates";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { getSearch } from "../../../../utils/Store/Products";
import { getCollection } from "../../../../utils/Store/collection";
import { getStoreHeader } from "../../../../utils/Store/Constant";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Container from "../Wrappers/Container.Wrapper";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
// import { FaHome } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import UserInfoData from "../UserInfoData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const webDropDownMenuData = [
  {
    Icon: TfiBell,
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

const Navbar2 = () => {
  const [searchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [getCollectionData, setGetCollectionData] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const snap = useSnapshot(webState);
  const storeType = snap.storeInfo?.store_type;

  const [isFixed, setIsFixed] = useState(false);

  // Memoize handleScroll to avoid recreating it on every render
  const handleScroll = useCallback(() => {
    setIsFixed(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Memoize searchProduct function to avoid recreating it on every render
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

  // Memoize collectionList function to avoid recreating it on every render
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
    if (!snap?.resellerToken && !getStoreHeader()) {
      navigate("/");
    }
  }, [snap.resellerToken, navigate]);

  const userLoginHandler = useCallback(() => {
    webState.previousRoute = window.location.pathname;
    navigate("storelogin");
  }, [navigate]);

  const collectionHandler = useCallback(
    (id) => {
      navigate(`collection/${id}`);
    },
    [navigate]
  );

  // Memoize logo and userData to avoid unnecessary recalculations
  const logo = useMemo(() => snap.brandInfo?.logo_light?.url, [snap.brandInfo]);
  const logoSize = useMemo(
    () => webState?.storeInfo?.logo_size,
    [webState.storeInfo]
  );

  // const goToHome = () => {
  //   navigate("/");
  // };

  return (
    <Disclosure
      as="nav"
      className={`w-full bg-navBgColor shadow-sm transition-transform duration-500  ${
        isFixed ? "fixed top-0 z-50" : "relative"
      }  `}
    >
      <Container>
        <div className="w-full flex items-center justify-between px-2 lg:px-0 sticky top-10 z-10 bg-navBgColor  ">
          <div className=" flex items-center justify-start min-h-[80px]">
            {snap.brandInfo !== null ? (
              <img
                style={{ height: logoSize + "px" || "80px" }}
                className={`object-contain cursor-pointer max-h-[100px]`}
                src={logo}
                width={"auto"}
                height={"auto"}
                alt="Logo"
                onClick={() => navigate("/")}
              />
            ) : null}
          </div>

          {/* menus */}
          <div className="w-full hidden lg:flex items-center justify-center ">
            <div className="w-full flex items-center justify-center gap-4">
              {/* <FaHome className="cursor-pointer" onClick={goToHome} /> */}
              {getCollectionData?.map?.((data) => {
                return (
                  <div
                    key={data?.id}
                    onClick={() => collectionHandler(data?.id)}
                    className=" text-navTextColor cursor-pointer text-sm px-3 tracking-wide capitalize font-semibold text-center"
                  >
                    {data?.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" flex items-center justify-end  gap-2.5 ">
            <div className="flex gap-1 relative">
              <IoSearchOutline
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
                <BsHandbag className="h-5 w-6 cursor-pointer hover:scale-110 transition-all duration-300 text-navTextColor " />
                {snap.cartProducts?.length > 0 ? (
                  <div className="absolute rounded-full bg-red-600 w-4 h-4 top-[-4px] ms-3 text-white flex items-center justify-center">
                    <span className=" text-[9px] flex items-center justify-center mt-0.5">
                      {snap.cartProducts?.length}
                    </span>
                  </div>
                ) : null}
              </div>
            )}

            {snap?.loggedinUserData === null && (
              <div className="hidden lg:flex gap-1 items-center">
                <CiUser
                  className="h-7 w-7 cursor-pointer text-navTextColor"
                  onClick={userLoginHandler}
                />
              </div>
            )}

            <div className="flex items-start lg:hidden">
              <RxHamburgerMenu
                className="w-6 h-6 text-navTextColor"
                onClick={() => (webState.mobileSideBar = true)}
              />
            </div>

            {snap?.loggedinUserData === null ? (
              <div className=" flex items-center"></div>
            ) : (
              <>
                <UserInfoData>
                  <Menu as="div" className="relative hidden lg:block ">
                    <div>
                      <MenuButton className="flex text-sm outline-none">
                        <CiUser className="h-6 w-6 cursor-pointer text-navTextColor" />
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
                                {snap.loggedinUserData?.name}
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
          </div>
        </div>
      </Container>
    </Disclosure>
  );
};

export default Navbar2;

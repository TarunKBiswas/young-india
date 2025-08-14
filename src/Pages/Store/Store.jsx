/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Store/UI/Navbar/Navbar";
import { getBrandDetail, getCategories } from "../../utils/Store/Homepage";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSnapshot } from "valtio";
import { webState } from "../../data/webStates";
// import Loading from "../../components/Store/UI/Loading";
import Logout from "../../components/Store/UI/Modals/Logout";
import Register from "../../components/Store/UI/Modals/Register";
import LoginModal from "../../components/Store/UI/Modals/LoginModal";
import EnquireNowModal from "../../components/Store/UI/Modals/EnquireNowModal";
import EditCartProducts from "../../components/Store/UI/Modals/EditCartProducts";
import DeletAddressModal from "../../components/Store/UI/Modals/DeletAddressModal";
import CartInfoModal from "../../components/Store/UI/Modals/CartInfoModal";
import OtpVerifyModal from "../../components/Store/UI/Modals/OtpVerifyModal";
import ServerPaymentModal from "../../components/Store/UI/Modals/ServerPaymentModal";
import EditAddressModal from "../../components/Store/UI/Modals/UpdateAddressModal";
import PremiumPlans from "../../components/Store/UI/Modals/PremiumPlans";
import ReturnRequestModal from "../../components/Store/UI/Modals/ReturnRequestModal";
import ItemRemoveModal from "../../components/Store/UI/Modals/ItemRemoveModal";
import SearchModal from "../../components/Store/Search/SearchModal";
import SideBar from "../../components/Store/UI/Modals/SideBar";
import JoinCommunityModal from "../../components/Store/UI/Modals/JoinCommunityModal";
import WhatsappContainer from "../../components/Store/UI/WhatsappContainer";
import { useInView } from "react-intersection-observer";
import { state } from "../../data/state";
import { getStoreData } from "../../utils/Store/Setting";
import { getGroups } from "../../utils/Groups";
import { landingPageEvent } from "../../lib/FbPixelEvent";
import { IP } from "../../utils/Store/Constant";
import { io } from "socket.io-client";
import Head from "../../components/Store/Layout/Head";
import Footer from "../../components/Store/Layout/Footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/Store/UI/Cards/ErrorFallBack";
import CheckoutModal from "../../components/Store/Checkout/CheckoutModal";
import FlipCard from "../../components/Store/UI/flipcard/FlipCard";
import { getHandlerWithToken } from "../../utils/Store/ApiCalls";
import AddReviewModal from "../../components/Store/ProductDetail/AddReviewModal";
import Loading from "../../components/Store/UI/Loading";

const Store = () => {
  const [storeSettings, setStoreSettings] = useState({
    colors: "#222222",
    textColor: "#ffffff",
    navBgColor: "#ffffff",
    navTextColor: "#222222",
    promoBgColor: "#ffffff",
    promoTextColor: "#000000",
  });

  const [showNavbar, setShowNavbar] = useState(false);
  const [groups, setGroups] = useState([]);
  const socketRef = useRef(null);
  const dataFetchedRef = useRef(false);

  const snap = useSnapshot(webState);
  const navigate = useNavigate();
  const { inView, ref } = useInView({ threshold: 0 });

  const fetchAllData = useCallback(async () => {
    if (dataFetchedRef.current) return;
    try {
      const [storeSettingRes, brandDetailsRes, catResponse, groupRes] =
        await Promise.all([
          getStoreData(),
          getBrandDetail(),
          getCategories(),
          getGroups(),
        ]);

      if (storeSettingRes?.status === 200) {
        const data = storeSettingRes?.data?.data;
        // console.log(data);

        if (data?.is_maintenance_mode) {
          navigate("/maintenance");
          return;
        }

        setStoreSettings({
          colors: data?.bg_color,
          textColor: data?.text_color,
          navBgColor: data?.nav_bg_color,
          navTextColor: data?.nav_text_color,
          promoBgColor: data?.promo_bg_color,
          promoTextColor: data?.promo_text_color,
        });
        webState.storeInfo = data;
      }

      if (brandDetailsRes?.status === 200) {
        webState.brandInfo = brandDetailsRes?.data?.data;
        setShowNavbar(true);
      }

      if (catResponse?.status === 200) {
        webState.categoriesData = catResponse?.data?.data;
      }

      if (groupRes?.status === 200) {
        webState.whatsappCommunityData = groupRes?.data?.data;
        setGroups(groupRes?.data?.data);
      }

      dataFetchedRef.current = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const getCartData = useCallback(async () => {
    try {
      const res = await getHandlerWithToken("cart/me");
      if (res?.status === 200) {
        webState.cartItems = res?.data?.data?.Variants;
        webState.cartData = res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (webState.loggedinUserData) {
      getCartData();
      webState.refreshCartItems = false;
    }
  }, [snap.loggedinUserData, snap.refreshCartItems]);

  useEffect(() => {
    let userdata = sessionStorage.getItem("userdata");
    if (userdata) {
      sessionStorage.setItem("userdata", userdata);
      webState.loggedinUserData = JSON.parse(userdata);
    }
  }, [sessionStorage.getItem("userdata")]);

  useEffect(() => {
    const subdomain = window.location.host.split(".")[0];
    socketRef.current = io(IP, {
      query: { subdomain },
      transports: ["websocket"],
      reconnectionAttempts: 3,
    });

    const handleLiveUsersUpdate = (data) => {
      if (data.subdomain === subdomain) {
        state.liveUsersCount = data.liveUsersCount;
      }
    };

    socketRef.current.on("liveUsersUpdate", handleLiveUsersUpdate);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("liveUsersUpdate", handleLiveUsersUpdate);
        socketRef.current.disconnect();
      }
    };
  }, []);

  useLayoutEffect(() => {
    fetchAllData();
    landingPageEvent();
    state.store_IP = window.location.host;
  }, [fetchAllData]);

  useLayoutEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (link && webState.brandInfo?.favicon?.url) {
      link.href = webState.brandInfo.favicon.url;
    }
    document.title =
      webState.brandInfo?.name || webState.brandInfo?.tagline || "";
  }, [webState.brandInfo?.favicon]);

  useEffect(() => {
    if (groups?.length > 0) {
      const timer = setTimeout(() => {
        webState.joinCommunityModal = true;
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [groups]);

  useEffect(() => {
    webState.isFooterIntersecting = inView;
  }, [inView]);

  useEffect(() => {
    if (snap.globalData?.data?.facebook_pixel) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.textContent = snap.globalData?.data?.facebook_pixel;
      document.head.appendChild(script);
    }
  }, [snap.globalData]);

  const renderModal = (condition, Component) => {
    return condition ? (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    ) : null;
  };

  const [showFooter, setShowFooter] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShowFooter(true);
    }, [1000]);
  }, []);

  return (
    <main
      style={{
        "--primary-color": storeSettings.colors,
        "--text-color": storeSettings.textColor,
        "--nav-bg-color": storeSettings.navBgColor,
        "--nav-text-color": storeSettings.navTextColor,
        "--promo-bg-color": storeSettings.promoBgColor,
        "--promo-text-color": storeSettings.promoTextColor,
      }}
    >
      {/* Basic modals */}
      {renderModal(snap.showLogotModal, Logout)}
      {renderModal(snap.showLoginModal, LoginModal)}
      {renderModal(snap.showRegisterModal, Register)}
      {renderModal(snap.showFlipModal, FlipCard)}
      {renderModal(snap.showEnquireNowModal, EnquireNowModal)}

      {/* Cart related modals */}
      {renderModal(snap.showEditCartProduct, EditCartProducts)}
      {renderModal(snap.cartInfoModal, CartInfoModal)}
      {renderModal(snap.showCheckoutModal, CheckoutModal)}

      {/* Address related modals */}
      {renderModal(snap.showEditAddressModal, EditAddressModal)}
      {renderModal(snap.showDeleteAddressModal, DeletAddressModal)}

      {/* Authentication modals */}
      {renderModal(snap.showOTPModal, OtpVerifyModal)}
      {renderModal(snap.serverFeeModal, ServerPaymentModal)}

      {/* Feature modals */}
      {renderModal(snap.premiumPlans, PremiumPlans)}
      {renderModal(snap.returnRequestModal, ReturnRequestModal)}
      {renderModal(snap.itemRemove, ItemRemoveModal)}

      {/* Search and navigation */}
      {renderModal(snap.fullScreenSearch, SearchModal)}
      {renderModal(snap.mobileSideBar, SideBar)}

      {/* Others */}
      {renderModal(snap.joinCommunityModal, JoinCommunityModal)}
      {renderModal(snap.showAddReviewModal, AddReviewModal)}

      <Head />
      {showNavbar && <Navbar />}

      {renderModal(snap.showLogotModal, Logout)}
      {renderModal(
        snap.joinCommunityModal,
        lazy(() =>
          import("../../components/Store/UI/Modals/JoinCommunityModal")
        )
      )}

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>

      {showFooter && <Footer footRef={ref} />}

      <Suspense fallback={null}>
        <WhatsappContainer />
      </Suspense>
    </main>
  );
};

export default Store;

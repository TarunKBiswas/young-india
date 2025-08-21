import Login from "./Pages/Login";
import { useSnapshot } from "valtio";
import { state } from "./data/state";
import Error500 from "./Pages/Error500";
import Error404 from "./Pages/Error404";
import { Toaster } from "react-hot-toast";
import { webState } from "./data/webStates.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { lazy, useCallback, useLayoutEffect } from "react";
import "aos/dist/aos.css";

// Admin
import MainContainer from "./Pages/MainContainer";
const Leads = lazy(() => import("./components/Admin/Leads/Leads"));
const Users = lazy(() => import("./components/Admin/Users/Users"));
const Plans = lazy(() => import("./components/Admin/Plans/Plans"));
const Orders = lazy(() => import("./components/Admin/Orders/Orders"));
const Settings = lazy(() => import("./components/Admin/Settings.jsx"));
const Media = lazy(() => import("./components/Admin/Media/Media.jsx"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard.jsx"));
const Social = lazy(() => import("./components/Admin/Social/Social.jsx"));
const Wallet = lazy(() => import("./components/Admin/Wallet/WalletListing"));
const AddProduct = lazy(() => import("./components/Admin/Product/AddProduct"));
const CreateLeads = lazy(() => import("./components/Admin/Leads/CreateLeads"));
const CreateOrder = lazy(() => import("./components/Admin/Orders/CreateOrder"));

const EditProduct = lazy(() =>
  import("./components/Admin/Product/EditProduct")
);

const OrderDetails = lazy(() =>
  import("./components/Admin/Orders/OrderDetails")
);

const GroupList = lazy(() =>
  import("./components/Admin/Social/Groups/GroupList")
);

const CategoryList = lazy(() =>
  import("./components/Admin/Category/CategoryList")
);

const ActivityLogs = lazy(() =>
  import("./components/Admin/Activity/ActivityLogs")
);

const Collection = lazy(() =>
  import("./components/Admin/collection/Collection.jsx")
);

const ProductListing = lazy(() =>
  import("./components/Admin/Product/ProductListing")
);

const CategoryDetails = lazy(() =>
  import("./components/Admin/Category/CategoryDetails")
);

const UserDetails = lazy(() =>
  import("./components/Admin/Users/Customers/CustomerDetails")
);

const TransactionListing = lazy(() =>
  import("./components/Admin/Transactions/TransactionListing")
);

const SubscriptionListing = lazy(() =>
  import("./components/Admin/Subscriptions/SubscriptionListing")
);

const SingleStaticDetails = lazy(() =>
  import("./components/Admin/collection/staticCollection/SingleStaticDetails")
);

// Store
const Store = lazy(() => import("./Pages/Store/Store"));
import XPage from "./components/Store/UI/XPage.jsx";
import { getGlobadData } from "./utils/settings.js";
import Loading from "./components/Store/UI/Loading.jsx";
const Review = lazy(() => import("./components/Admin/Reviews/Review.jsx"));
const Product = lazy(() => import("./components/Store/Product/Product.jsx"));
const Coupons = lazy(() => import("./components/Admin/Coupons/Coupons.jsx"));
import Setting from "./components/Store/Setting/Settings.jsx";
import ResetPasswordPage from "./Pages/ResetPasswordPage.jsx";
const Cart = lazy(() => import("./components/Store/Cart/Cart"));
import ScrollToTop from "./components/Store/UI/ScrollToTop.jsx";
const UnderMaintanance = lazy(() =>
  import("./Pages/Store/UnderMaintanance.jsx")
);
const Search = lazy(() => import("./components/Store/Search/Search"));
const Home = lazy(() => import("./components/Store/MainPage/Home.jsx"));
import SubCategories from "./components/Store/MainPage/SubCategories.jsx";
import ForgetOtpModal from "./components/Admin/Modals/ForgetOtpModal.jsx";
import SuspenseLoader from "./components/Store/Suspense/SuspenseLoader.jsx";
import Course from "./components/Admin/Course/Course.jsx";
import CourseDetails from "./components/Admin/Course/CourseDetail/CourseDetail.jsx";
import Academy from "./components/Admin/Course/academy/Academy.jsx";
import Supplier from "./components/Admin/supplier/Supplier.jsx";
import SupplierDetail from "./components/Admin/supplier/SupplierDetail.jsx";
import BlogsListing from "./components/Store/Blog/BlogsListing.jsx";
import BlogPage from "./components/Store/Blog/BlogPage.jsx";
import CreateBlog from "./components/Store/Blog/CreateBlog.jsx";
const PaymentSuccess = lazy(() => import("./Pages/Store/PaymentSuccess.jsx"));
const Wishlist = lazy(() => import("./components/Store/Wishlist.jsx/Wishlist"));

const Profile = lazy(() =>
  import("./components/Store/Setting/Profile/Profile")
);

const WebOrders = lazy(() =>
  import("./components/Store/Setting/Orders/Orders")
);

const WebWallet = lazy(() =>
  import("./components/Store/Setting/Wallet/Wallet")
);

const WebTutorial = lazy(() =>
  import("./components/Store/Setting/Tutorial/Tutorial")
);

const RegisterForm = lazy(() =>
  import("./components/Store/UI/Forms/RegisterForm.jsx")
);

const WebAddresses = lazy(() =>
  import("./components/Store/Setting/Addresses/Addresses")
);

const CategoryProducts = lazy(() =>
  import("./components/Store/MainPage/CategoryProducts")
);

const PremiumPlans = lazy(() =>
  import("./components/Store/Setting/PremiumPlans/PremiumPlans")
);

const CollectionProduct = lazy(() =>
  import("./components/Store/Collection/CollectionProduct")
);

const WebTransaction = lazy(() =>
  import("./components/Store/Setting/Transactions/Transaction")
);

const StoreProductDetails = lazy(() =>
  import("./components/Store/ProductDetail/StoreProductDetails")
);

const Return = lazy(() =>
  import("./components/Store/Setting/ReturnRequest/Return.jsx")
);

function App() {
  const snap = useSnapshot(state);
  const domainName = window?.location?.hostname?.split(".")[0];

  const getGlobalDetails = useCallback(async () => {
    try {
      if (webState.globalData) {
        return;
      } else {
        const res = await getGlobadData();
        if (res?.status === 200) {
          webState.globalData = res?.data;
          webState.storeType = res?.data?.store_type;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(webState?.globalData);

  useLayoutEffect(() => {
    getGlobalDetails();
  }, [getGlobalDetails]);

  const renderDashboardRoutes = () => (
    <Route path="/" element={<MainContainer />}>
      <Route exact path="" element={<Dashboard />} />
      <Route path="orders" element={<Orders />} />
      <Route path="orders/:id" element={<OrderDetails />} />
      <Route path="orders/add-order" element={<CreateOrder />} />
      <Route path="products" element={<ProductListing />} />
      <Route path="products/add" element={<AddProduct />} />
      <Route path="products/edit/:id" element={<EditProduct />} />
      <Route path="categories" element={<CategoryList />} />
      <Route path="categories/:id" element={<CategoryDetails />} />
      <Route path="leads" element={<Leads />} />
      <Route path="leads/add" element={<CreateLeads />} />
      <Route path="users" element={<Users />} />
      <Route path="users/customers/:id" element={<UserDetails />} />
      <Route path="collection" element={<Collection />} />
      <Route path="static-collection/:id" element={<SingleStaticDetails />} />
      <Route path="activity" element={<ActivityLogs />} />
      {/* <Route path="blogs" element={<Blogs />} /> */}
      <Route path="banners" element={<Media />} />
      <Route path="reviews" element={<Review />} />
      <Route path="course" element={<Course />} />
      <Route path="/course-detail/:id" element={<CourseDetails />} />
      <Route path="/academy/:id" element={<Academy />} />
      <Route path="supplier" element={<Supplier />} />
      <Route path="/supplier-detail" element={<SupplierDetail />} />
      <Route path="coupons" element={<Coupons />} />
      <Route path="transactions" element={<TransactionListing />} />
      <Route path="plans" element={<Plans />} />
      <Route path="subscriptions" element={<SubscriptionListing />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="campaign&Group" element={<Social />} />
      <Route path="groups" element={<GroupList />} />
      <Route path="settings" element={<Settings />} />
       <Route path="/blogs" element={<BlogsListing />} />
      <Route path="/blog/:title/:id" element={<BlogPage />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/blog/:id/edit" element={<CreateBlog />} />
    </Route>
  );

  const renderStoreRoutes = () => (
    <Route path="/" element={<Store />}>
      <Route path="register" element={<RegisterForm />} />
      <Route path="" element={<Home />} />
      {/* <Route path="blog/:id" element={<Blog />} /> */}
      <Route path="search/:query" element={<Search />} />
      <Route path="product/:id" element={<StoreProductDetails />} />
      <Route path="/blogs" element={<BlogsListing />} />
      <Route path="/blog/:title/:id" element={<BlogPage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="category/:id" element={<CategoryProducts />} />
      <Route path="sub-category/:id" element={<SubCategories />} />
      <Route path="collection/:id" element={<CollectionProduct />} />
      <Route path="allProducts" element={<Product />} />
      <Route exact path="setting" element={<Setting />}>
        <Route path="" element={<Profile />} />
        <Route path="plans" element={<PremiumPlans />} />
        <Route path="wallet" element={<WebWallet />} />
        <Route path="order" element={<WebOrders />} />
        <Route path="transaction" element={<WebTransaction />} />
        <Route path="tutorial" element={<WebTutorial />} />
        <Route path="address" element={<WebAddresses />} />
        <Route path="return" element={<Return />} />
      </Route>
      <Route path="plans" element={<PremiumPlans />} />
      <Route path="wallet" element={<WebWallet />} />
      <Route path="order" element={<WebOrders />} />
      <Route path="transaction" element={<WebTransaction />} />
      <Route path="tutorial" element={<WebTutorial />} />
      <Route path="address" element={<WebAddresses />} />
      <Route path="return" element={<Return />} />
      <Route
        path="about_us"
        element={<XPage title="About Us" field="about_us" />}
      />
      <Route
        path="contact_us"
        element={<XPage title="Contact Us" field="contact_us" />}
      />
      <Route
        path="terms_and_conditions"
        element={
          <XPage title="Terms And Conditions" field="terms_and_conditions" />
        }
      />
      <Route
        path="privacy_policy"
        element={<XPage title="Privacy Policy" field="privacy_policy" />}
      />
      <Route
        path="refund_and_cancellation"
        element={
          <XPage
            title="Refund And Cancellation"
            field="refund_and_cancellation"
          />
        }
      />
      <Route
        path="ship_and_delivery"
        element={<XPage title="Ship And Delivery" field="ship_and_delivery" />}
      />
      {/* <Route path="mission&vision" element={<XMission />} />
      <Route path="faq" element={<XFaq />} /> */}
    </Route>
  );

  return (
    // <ErrorBoundary fallback={<ErrorFallback />}>
    <SuspenseLoader fallback={<Loading />}>
      {snap.isLoading && <Loading />}
      {snap?.showForgetOtpModal && <ForgetOtpModal />}
      <ScrollToTop />
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {domainName !== "dashboard"
          ? renderStoreRoutes()
          : renderDashboardRoutes()}
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/maintenance" element={<UnderMaintanance />} />
        <Route path="*" element={<Error404 />} />
        <Route path="under-maintenance" element={<Error500 />} />
      </Routes>

      <ToastContainer />
      <Toaster />
    </SuspenseLoader>
    // </ErrorBoundary>
  );
}

export default App;

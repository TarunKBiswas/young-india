import { Route } from "react-router-dom";
import Store from "../../Pages/Store/Store";
import Auth from "../../components/Store/UI/Auth";
import MessageLogin from "../../components/Store/UI/Forms/MessageLogin";
import OTPVerify from "../../components/Store/UI/Forms/OTPVerify";
import Home from "../../components/Store/MainPage/Home";
import Search from "../../components/Store/Search/Search";
import StoreProductDetails from "../../components/Store/ProductDetail/StoreProductDetails";
import Cart from "../../components/Store/Cart/Cart";
import Wishlist from "../../components/Store/Wishlist.jsx/Wishlist";
import CategoryProducts from "../../components/Store/MainPage/CategoryProducts";
import CollectionProduct from "../../components/Store/Collection/CollectionProduct";
import Product from "./components/Store/Product/Product.jsx";
import Setting from "../../components/Store/Setting/Settings.jsx";
import Profile from "../../components/Store/Setting/Profile/Profile.jsx";
import PremiumPlans from "../../components/Store/UI/Modals/PremiumPlans.jsx";
import WebWallet from "../../components/Store/Setting/Wallet/Wallet.jsx";
import WebOrders from "../../components/Store/Setting/Orders/Orders.jsx";
import WebTransaction from "../../components/Store/Setting/Transactions/Transaction.jsx";
import WebTutorial from "../../components/Store/Setting/Tutorial/Tutorial.jsx";
import WebAddresses from "../../components/Store/Setting/Addresses/Addresses.jsx";
import Return from "../../components/Store/Setting/ReturnRequest/Return.jsx";
import XPage from "../../components/Store/UI/XPage.jsx";
import RegisterForm from "../../components/Store/UI/Forms/RegisterForm.jsx";

export const renderStoreRoutes = () => (
  <Route path="/" element={<Store />}>
    <Route path="/storelogin" element={<Auth />}>
      <Route path="" element={<MessageLogin />} />
      <Route path="verify" element={<OTPVerify />} />
    </Route>
    <Route path="register" element={<RegisterForm />} />
    <Route path="" element={<Home />} />
    <Route path="search/:query" element={<Search />} />
    <Route path="product/:id" element={<StoreProductDetails />} />
    <Route path="cart" element={<Cart />} />
    <Route path="wishlist" element={<Wishlist />} />
    <Route path="category/:id" element={<CategoryProducts />} />
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
  </Route>
);

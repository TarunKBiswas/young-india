import { Route } from "react-router-dom";
import MainContainer from "../Pages/MainContainer";
import Dashboard from "../components/Admin/Dashboard";
import Orders from "../components/Admin/Orders/Orders";
import OrderDetails from "../components/Admin/Orders/OrderDetails";
import CreateOrder from "../components/Admin/Orders/CreateOrder";
import ProductListing from "../components/Admin/Product/ProductListing";
import AddProduct from "../components/Admin/Product/AddProduct";
import EditProduct from "../components/Admin/Product/EditProduct";
import CategoryList from "../components/Admin/Category/CategoryList";
import CategoryDetails from "../components/Admin/Category/CategoryDetails";
import Leads from "../components/Admin/Leads/Leads";
import CreateLeads from "../components/Admin/Leads/CreateLeads";
import Users from "../components/Admin/Users/Users";
import UserDetails from "../components/Admin/Users/Customers/CustomerDetails";
import Collection from "../components/Admin/collection/Collection";
import SingleStaticDetails from "../components/Admin/collection/staticCollection/SingleStaticDetails";
import ActivityLogs from "../components/Admin/Activity/ActivityLogs";
import Media from "../components/Admin/Media/Media";
import Review from "./components/Admin/Reviews/Review.jsx";
import Coupons from "../components/Admin/Coupons/Coupons.jsx";
import TransactionListing from "../components/Admin/Transactions/TransactionListing.jsx";
import Plans from "../components/Admin/Plans/Plans.jsx";
import SubscriptionListing from "../components/Admin/Subscriptions/SubscriptionListing.jsx";
import Wallet from "../components/Admin/Wallet/WalletListing.jsx";
import Social from "../components/Admin/Social/Social.jsx";
import GroupList from "../components/Admin/Social/Groups/GroupList.jsx";
import Settings from "../components/Admin/Settings.jsx";

export const renderDashboardRoutes = () => (
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
    <Route path="banners" element={<Media />} />
    <Route path="reviews" element={<Review />} />
    <Route path="coupons" element={<Coupons />} />
    <Route path="transactions" element={<TransactionListing />} />
    <Route path="plans" element={<Plans />} />
    <Route path="subscriptions" element={<SubscriptionListing />} />
    <Route path="wallet" element={<Wallet />} />
    <Route path="campaign&Group" element={<Social />} />
    <Route path="groups" element={<GroupList />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);

import {
  // MdArticle,
  MdOutlineLocalOffer,
  MdOutlineProductionQuantityLimits,
  MdOutlineRateReview,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { BiCollection } from "react-icons/bi";
import {
  AiOutlineTransaction,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";
import { BsActivity, BsBell, BsCardImage, BsWallet } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import {
  ArrowRightLeft,
  Logs,
  MapPinHouse,
  TicketPercent,
  Wallet,
} from "lucide-react";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

export const sidebarMenu = [
  {
    id: 1,
    name: "Home",
    icon: AiOutlineHome,
    route: "",
  },
  {
    id: 2,
    name: "Orders",
    icon: MdOutlineSpaceDashboard,
    route: "orders",
  },
  {
    id: 3,
    name: "Product",
    icon: MdOutlineProductionQuantityLimits,
    route: "products",
  },
  {
    id: 4,
    name: "Category",
    icon: IoMdOptions,
    route: "categories",
  },
  {
    id: 5,
    name: "Leads",
    icon: FaWpforms,
    route: "leads",
  },
  {
    id: 6,
    name: "Users",
    icon: FiUsers,
    route: "users",
  },
  {
    id: 7,
    name: "Collections",
    icon: BiCollection,
    route: "collection",
  },
  // {
  // id: 8,
  //   name: "Blogs",
  //   icon: MdArticle,
  //   route: "blogs",
  // },
  {
    id: 9,
    name: "Activity",
    icon: BsActivity,
    route: "activity",
  },
  {
    id: 10,
    name: "Banners",
    icon: BsCardImage,
    route: "banners",
  },
  {
    id: 11,
    name: "Reviews",
    icon: MdOutlineRateReview,
    route: "reviews",
  },
  {
    id: 12,
    name: "Courses",
    icon: IoBookOutline,
    route: "course",
  },
  {
    id: 13,
    name: "Coupons",
    icon: RiCoupon2Line,
    route: "coupons",
  },
  {
    id: 14,
    name: "Supplier",
    icon: HiMiniArrowsUpDown,
    route: "supplier",
  },
  {
    id: 15,
    name: "Transactions",
    icon: AiOutlineTransaction,
    route: "transactions",
  },
  {
    id: 16,
    name: "Plans",
    icon: MdOutlineLocalOffer,
    route: "plans",
  },
  {
    id: 17,
    name: "Subscribers",
    icon: BiCollection,
    route: "subscriptions",
  },
  {
    id: 18,
    name: "Wallet",
    icon: BsWallet,
    route: "wallet",
  },
  {
    id: 19,
    name: "Campaign",
    icon: BsBell,
    route: "campaign&Group",
  },
  {
    id: 20,
    name: "Settings",
    icon: AiOutlineSetting,
    route: "settings",
  },
];

export const userAccountData = [
  {
    icon: AiOutlineUser,
    name: "Profile Info",
    link: "setting",
  },
  {
    icon: TicketPercent,
    name: "Premium Plans",
    link: "plans",
  },
  {
    icon: Wallet,
    name: "Wallet",
    link: "wallet",
  },
  {
    icon: Logs,
    name: "Orders",
    link: "order",
  },
  {
    icon: ArrowRightLeft,
    name: "Transaction",
    link: "transaction",
  },
  {
    icon: MapPinHouse,
    name: "Addresses",
    link: "address",
  },
];

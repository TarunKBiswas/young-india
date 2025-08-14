import { BsFillBagFill, BsFillCartFill } from "react-icons/bs";
import {
  FaDatabase,
  FaHandshake,
  FaShare,
  // FaUserFriends,
  FaUsers,
} from "react-icons/fa";
// import { TbTruckReturn } from "react-icons/tb";
import { LuRadioTower } from "react-icons/lu";
import {
  // MdOutlineLocalOffer,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";

export const dashboardStatsCard = (data, liveData) => {
  return [
    {
      statTitle: "Visitors",
      StatIcon: LuRadioTower,
      statValue: liveData || 0,
      bgColor: "bg-purple-100",
      iconStyle: "text-purple-600",
      to: "",
      live: true,
    },
    {
      statTitle: "Enquiries",
      StatIcon: FaHandshake,
      statValue: data?.leads || 0,
      bgColor: "bg-red-100",
      iconStyle: "fill-red-600",
      to: "leads",
    },
    {
      statTitle: "Total Orders",
      StatIcon: BsFillBagFill,
      statValue: data?.orders || 0,
      bgColor: "bg-blue-100",
      iconStyle: "fill-blue-500",
      to: "orders",
    },
    {
      statTitle: "Live Products",
      StatIcon: BsFillCartFill,
      statValue: data?.products || 0,
      bgColor: "bg-purple-100",
      iconStyle: "text-purple-600",
      to: "products",
    },
    {
      statTitle: "Out of Stock",
      StatIcon: MdOutlineProductionQuantityLimits,
      statValue: data?.out_of_stock || 0,
      bgColor: "bg-purple-100",
      iconStyle: "text-purple-600",
      to: "products",
    },
    // {
    //   statTitle: "Returns",
    //   StatIcon: TbTruckReturn,
    //   statValue: data?.return_orders || 0,
    //   bgColor: "bg-blue-100",
    //   iconStyle: "fill-blue-500",
    //   to: "orders",
    // },
    // {
    //   statTitle: "RTO",
    //   StatIcon: TbTruckReturn,
    //   statValue: data?.rto_orders || 0,
    //   bgColor: "bg-blue-100",
    //   iconStyle: "fill-blue-500",
    //   to: "orders",
    // },
    {
      statTitle: "Users",
      StatIcon: FaUsers,
      statValue: data?.users || 0,
      bgColor: "bg-red-100",
      iconStyle: "fill-red-600",
      to: "users",
    },
    // {
    //   statTitle: "Subscribers",
    //   StatIcon: FaUserFriends,
    //   statValue: data?.subscriptions || 0,
    //   bgColor: "bg-red-100",
    //   iconStyle: "fill-red-600",
    //   to: "subscriptions",
    // },

    // {
    //   statTitle: "Plans",
    //   StatIcon: MdOutlineLocalOffer,
    //   statValue: data?.plans || 10,
    //   bgColor: "bg-orange-100",
    //   iconStyle: "fill-orange-600",
    //   to: "plans",
    // },
    {
      statTitle: "Shares",
      StatIcon: FaShare,
      statValue: data?.shares || 10,
      bgColor: "bg-orange-100",
      iconStyle: "fill-orange-600",
      to: "",
    },
    {
      statTitle: "Revenue",
      StatIcon: FaDatabase,
      statValue: "₹ " + data?.revenue || 0,
      bgColor: "bg-orange-100",
      iconStyle: "fill-orange-600",
      to: "",
    },
  ];
};

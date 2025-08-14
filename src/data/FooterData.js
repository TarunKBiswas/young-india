
import {
  BsFacebook,
  BsInstagram,
  BsTelegram,
} from "react-icons/bs";

export const data = {
  featured: [
    { name: "Trending", href: "#" },
    { name: "Best Seller", href: "#" },
    { name: "New Arrival", href: "#" },
    { name: "Top Rated", href: "#" },
  ],
  about: [
    { name: "About Us", href: "/about_us" },
    { name: "Contact Us", href: "/contact_us" },
    { name: "Ship and Delivery", href: "/ship_and_delivery" },
  ],
  info: [
    { name: "Privacy Policies", href: "/privacy_policy" },
    { name: "Terms & Conditions", href: "/terms_and_conditions" },
    { name: "Refund & Cancellation", href: "/refund_and_cancellation" },
  ],
};

export const socialLinks = (data) => {
  return [
    {
      name: "Facebook",
      icon: BsFacebook,
      href: data?.facebook_page_url || null,
    },
    {
      name: "Instagram",
      icon: BsInstagram,
      href: data?.instagram_page_url || null,
    },
    {
      name: "Telegram",
      icon: BsTelegram,
      href: data?.telegram_page_url || null,
    },
    // {
    //   name: "Map",
    //   icon: HiLocationMarker,
    //   href: data?.store_map_location || null,
    // },
  ];
};

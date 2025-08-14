/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import OutletWrapper from "../../../Pages/OutletWrapper";
import DigitalMarketingCard from "../UI/DigitalMarketingCard";
import StatsSection from "../Course/Stats/StatsSection";
import CourseBanner from "../Course/CourseBanner";
import Testimonials from "../Course/Testimonial";
import BannerData from "../UI/BannerData";
import Category from "./Category";

const Supplier = () => {
  const supplierData = [
    {
      id: 1,
      title: "Super Ocxation - Premium Clothing Supplier",
      subtitle: "Trendy Apparel | Bulk Orders | Fast Delivery",
      instructor: {
        name: "Lakshit Sethiya",
        image_url:
          "https://i.ytimg.com/vi/d9Rk0_Rz9pI/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCf_U-4X8qTBWzXsxhuFF1Fc4y2sQ",
      },
      rating: {
        stars: 4.9,
        reviews: 396,
      },
      category: "Clothing",
      business_name: "Ocxation Garments",
      whatsapp_number: "+91 9876543210",
      cta_button: {
        text: "Contact Now",
        link: "#",
      },
    },
    {
      id: 2,
      title: "Super Ocxation - Exclusive Watches Supplier",
      subtitle: "Luxury & Casual Watches | Best Prices | Bulk Discounts",
      instructor: {
        name: "John Doe",
        image_url:
          "https://i.ytimg.com/vi/CLWDAjwDr-E/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLAGQKAIYSfB1r3XmK_EQYbbwYD8dQ",
      },
      rating: {
        stars: 4.7,
        reviews: 220,
      },
      category: "Watches",
      business_name: "TimeX Creations",
      whatsapp_number: "+91 9988776655",
      cta_button: {
        text: "Order Now",
        link: "#",
      },
    },
    {
      id: 3,
      title: "Super Ocxation - Electronics Supplier",
      subtitle: "Latest Gadgets | High Quality | Wholesale Pricing",
      instructor: {
        name: "Sarah Johnson",
        image_url:
          "https://i.ytimg.com/vi/d9Rk0_Rz9pI/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCf_U-4X8qTBWzXsxhuFF1Fc4y2sQ",
      },
      rating: {
        stars: 4.8,
        reviews: 412,
      },
      category: "Electronics",
      business_name: "GadgetOcxation",
      whatsapp_number: "+91 7766554433",
      cta_button: {
        text: "Explore More",
        link: "#",
      },
    },
    {
      id: 4,
      title: "Super Ocxation - Footwear Supplier",
      subtitle: "Fashion Footwear | All Sizes | Affordable Prices",
      instructor: {
        name: "Emily White",
        image_url:
          "https://course.socialseller.in/storage/course/1727095776.jpg",
      },
      rating: {
        stars: 4.6,
        reviews: 150,
      },
      category: "Footwear",
      business_name: "StepOcxation",
      whatsapp_number: "+91 6655443322",
      cta_button: {
        text: "Get in Touch",
        link: "#",
      },
    },
    {
      id: 5,
      title: "Super Ocxation - Home Appliances Supplier",
      subtitle: "Modern Home Appliances | Best Quality | Great Deals",
      instructor: {
        name: "Mark Robinson",
        image_url:
          "https://course.socialseller.in/storage/course/1727095896.png",
      },
      rating: {
        stars: 4.9,
        reviews: 500,
      },
      category: "Home Appliances",
      business_name: "HomeTech Supplies",
      whatsapp_number: "+91 5544332211",
      cta_button: {
        text: "Check Now",
        link: "#",
      },
    },
    {
      id: 6,
      title: "Super Ocxation - Jewelry Supplier",
      subtitle: "Fine Jewelry | Custom Designs | Best Offers",
      instructor: {
        name: "Jessica Lee",
        image_url:
          "https://i.ytimg.com/vi/d9Rk0_Rz9pI/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCf_U-4X8qTBWzXsxhuFF1Fc4y2sQ",
      },
      rating: {
        stars: 4.7,
        reviews: 280,
      },
      category: "Jewelry",
      business_name: "Ocxation Jewels",
      whatsapp_number: "+91 4433221100",
      cta_button: {
        text: "Shop Now",
        link: "#",
      },
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      <BannerData
        thumbnail={
          "https://i.ytimg.com/vi/XgQ3R0OJYoc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBmhMuPQ-lCi-1Q0UlzXAEoSaTLWQ"
        }
        title1={"Connect with best product Supplier to"}
        title2={"grow your bussiness"}
      />
      <OutletWrapper className={"px-2 lg:px-20 xl:px-24 w-full"}>
        <Category />
        <div className="w-full flex items-center justify-between my-6 ">
          <span className="text-3xl font-semibold">Our Popular Courses</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full ">
          {supplierData?.map((c, i) => {
            return (
              <div
                className="w-full h-full cursor-pointer truncate"
                key={i}
                onClick={() => navigate("/supplier-detail")}
              >
                <DigitalMarketingCard data={c} title={"Connect Now"} />
              </div>
            );
          })}
        </div>
      </OutletWrapper>
    </div>
  );
};

export default Supplier;

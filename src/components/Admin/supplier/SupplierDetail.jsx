import React from "react";
import OutletWrapper from "../../../Pages/OutletWrapper";
import SupplierInfo from "./SupplierInfo";
import {
  FaShippingFast,
  FaExchangeAlt,
  FaTruck,
  FaCashRegister,
  FaTag,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SupplierDetail = () => {
  const navigate = useNavigate();
  const data = [
    {
      title: "COD",
      icon: <FaCashRegister className="text-xl text-blue-600" />,
    },
    {
      title: "Free Shipping",
      icon: <FaShippingFast className="text-xl text-green-600" />,
    },
    {
      title: "Advance COD",
      icon: <FaCashRegister className="text-xl text-orange-600" />,
    },
    {
      title: "International Shipping",
      icon: <FaTruck className="text-xl text-teal-600" />,
    },
    {
      title: "Return",
      icon: <FaExchangeAlt className="text-xl text-red-600" />,
    },
    {
      title: "Exchange",
      icon: <FaExchangeAlt className="text-xl text-yellow-600" />,
    },
  ];

  const categoryImages = [
    {
      img: "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=500&auto=format&fit=crop&q=60",
    },
    {
      img: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=500&auto=format&fit=crop&q=60",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?w=500&auto=format&fit=crop&q=60",
    },
    {
      img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60",
    },
    {
      img: "https://media.istockphoto.com/id/1837382224/photo/young-black-man-at-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=fVCkUbUk9x8ALEodSjqa-e25gX5vt26Bf1QIJ0fkSkI=",
    },
    {
      img: "https://media.istockphoto.com/id/1941454161/photo/woman-hands-putting-warm-neutral-sweater-into-cardboard-box-seasonal-storage-method-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=MEUAGTugHsyBKPdIualSs0WmcqFUwS7tTMgyH9jkqJs=",
    },
    {
      img: "https://media.istockphoto.com/id/1345934516/photo/natural-organic-cotton-t-shirts-and-cotton-plant-flowers-on-white-table-eco-clothes-fashion.jpg?s=612x612&w=0&k=20&c=EMLo2G_aBcJ9g2rVPinW01iNnscqgyD_wWz4-SnlR8A=",
    },
    {
      img: "https://media.istockphoto.com/id/621975996/photo/beautiful-woman-in-the-city.jpg?s=612x612&w=0&k=20&c=d1owNOvDTvJyHLIME31vFmvqmPOqownpXTY-zFsj7NY=",
    },
    {
      img: "https://media.istockphoto.com/id/1847769742/photo/xxl-size-clothing-label-tag.jpg?s=612x612&w=0&k=20&c=qYYcp2idXfh3_JIB5nKXWqVdkvv620jyoioZmaUnyvg=",
    },
  ];

  return (
    <>
      {/* Page Header and SEO Meta */}

      {/* Main Content Wrapper */}

      <div className="bg-[#f5f5f5] flex items-center justify-center w-full p-3">
        <OutletWrapper className="w-full">
          <FaArrowLeft
            onClick={() => navigate("/supplier")}
            className="hover:scale-125 transition-all duration-500 cursor-pointer text-xl"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Supplier Details
          </h1>
          <SupplierInfo />
        </OutletWrapper>
      </div>

      {/* Features Section */}
      <div className="w-full mt-16 flex items-start justify-center">
        <OutletWrapper className="w-full flex items-start justify-center gap-10 px-4">
          {/* Sidebar */}
          <div className="w-1/5 hidden md:flex">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {data.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-gray-700 text-sm">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Category Images */}
          <div className="w-full md:w-4/5">
            <div className="grid grid-cols-3 w-full gap-3">
              {categoryImages.map((image, index) => (
                <div key={index} className="w-full h-64">
                  <img
                    src={image.img}
                    alt={`Category ${index + 1}`}
                    className="w-full h-full object-cover rounded-md transition-transform duration-500 hover:scale-105"
                    loading="lazy" // Lazy loading images
                  />
                </div>
              ))}
            </div>
          </div>
        </OutletWrapper>
      </div>
    </>
  );
};

export default SupplierDetail;

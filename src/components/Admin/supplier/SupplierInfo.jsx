/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
// import { HiOutlineStar } from "react-icons/hi2";
// import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ContactInfo = ({ label, value, href, Icon }) => (
  <div className="flex items-center gap-2.5 text-gray-700">
    <Icon className="text-blue-800" />
    {href ? (
      <a href={href} className="text-blue-800 hover:underline">
        {value}
      </a>
    ) : (
      <span>{value}</span>
    )}
  </div>
);

const SupplierInfo = () => {
  const navigate = useNavigate();
  const [isServicesVisible, setServicesVisible] = useState(false);

  const supplierInfo = {
    business_name: "Fashion Trendz",
    category: "Clothing Supplier",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    whatsapp_number: "+1234567890",
    rating: 4.5,
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
    },
    services: ["Wholesale Clothing", "Custom Apparel", "Bulk Orders"],
    video_url: "https://www.example.com/promo-video",
    app: "FashionApp",
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-11 py-10">
      {/* Video Section */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 relative group">
        <div className="w-full aspect-video mb-2 rounded-lg shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <iframe
            src="https://www.youtube.com/embed/Cse7g--PoXU?si=5hzlClekd7hdun-4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
        {/* <div className="absolute top-0 left-0 w-full h-full  group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            className="text-white font-semibold py-2 px-4 bg-blue-600 rounded-lg opacity-90 hover:opacity-100 transition"
            onClick={() => window.open(supplierInfo.video_url, "_blank")}
          >
            Watch Promo Video
          </button>
        </div> */}
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-gray-900">
            {supplierInfo.name}
          </h1>
          <p className="text-lg text-gray-600">{supplierInfo.category}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <ContactInfo
            label="Email"
            value={supplierInfo.email}
            href={`mailto:${supplierInfo.email}`}
            Icon={FaEnvelope}
          />
          <ContactInfo
            label="Phone"
            value={supplierInfo.phone}
            href={`tel:${supplierInfo.phone}`}
            Icon={FaPhoneAlt}
          />
          <ContactInfo
            label="Email"
            value={`${supplierInfo.location.city}, ${supplierInfo.location.state}, ${supplierInfo.location.country}`}
            href={`mailto:${supplierInfo.email}`}
            Icon={FaLocationDot}
          />
          <ContactInfo
            label="Email"
            value={`${supplierInfo.rating} / 5`}
            href={`mailto:${supplierInfo.email}`}
            Icon={GoStarFill}
          />
        </div>

        {/* Toggle Services Section */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setServicesVisible(!isServicesVisible)}
          >
            <h3 className="text-xl font-semibold text-gray-800">Services</h3>
            <span className="text-blue-500">
              {isServicesVisible ? "Hide" : "Show"} Services
            </span>
          </div>
          {isServicesVisible && (
            <ul className="mt-2 space-y-2 text-gray-600">
              {supplierInfo.services.map((service, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Section */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="text-white font-semibold bg-[#4ac959] hover:bg-[#22aa31] py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center w-full gap-2">
            <BsWhatsapp />
            <button onClick={() => navigate("/academy")} className="text-white">
              Connect on Whatsapp
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-gray-600">
              Join <span className="font-semibold">17,214</span> future
              ecommerce experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;

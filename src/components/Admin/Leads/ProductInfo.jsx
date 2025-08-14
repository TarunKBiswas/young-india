/* eslint-disable */
import React from "react";
import { IP } from "../../../utils/const_API.js";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product, quantity }) => {
  const navigate = useNavigate();
  const navigateHadler = (id) => {
    navigate(`/products/${id}`);
  };

  let prod = product?.thumbnail?.url?.includes("https://")
    ? product?.thumbnail?.url
    : product?.thumbnail?.url;

  let name = product?.name || product?.name;

  return (
    <div
      className="w-full flex items-center justify-start gap-2 cursor-pointer"
      // onClick={() => navigateHadler(product?.id)}
    >
      <div className="w-12 h-12 rounded-full ">
        <img className="rounded-full object-cover h-full w-full" src={prod} width="auto" height="auto" alt="Product Image" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-sm overflow-ellipsis">{name?.slice(0, 25)}</span>
        <span className="text-sm">
          {"Quantity : "} {quantity}
        </span>
      </div>
    </div>
  );
};
export default ProductInfo;

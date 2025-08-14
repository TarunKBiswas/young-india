/* eslint-disable react/prop-types */

import { useState } from "react";
// import Rating from "../Icon/Rating";
import { useNavigate } from "react-router-dom";
import { webState } from "../../../../data/webStates";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, onClick }) => {
  // console.log(product);
  // console.log(product);

  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const productDetailHandler = (id) => {
    webState.fullScreenSearch = false;
    navigate(`/product/${id}`);
  };

  const item = product;

  const name = item?.name;

  // console.log(item);

  const thumbnail =
    item?.thumbnail?.url ||
    item?.variants?.gallery?.formats?.thumbnail?.url ||
    item?.img;

  const rating = item?.rating || "0";
  // console.log(rating);

  //   const price = item?.variants?.at(0)?.price || "Not Available";
  // const strikePrice = item?.variants?.at(0)?.strike_price || "Not Available";

  const price =
    item?.variants?.length > 0
      ? Math.min(...item.variants.map((v) => v.price))
      : "Not Available";

  const strikePrice =
    item?.variants?.length > 0
      ? Math.min(...item.variants.map((v) => v.strike_price))
      : "Not Available";

  const thumbnailUrl = thumbnail;

  return (
    <div
      className="w-full group border relative rounded-md overflow-hidden cursor-pointer flex flex-col justify-around shadow-sm"
      key={item?.id}
      onClick={() => productDetailHandler(item?.id)}
      onMouseEnter={() => setIsHover(!isHover)}
      onMouseLeave={() => setIsHover(!isHover)}
    >
      <div className="w-full overflow-hidden " onClick={onClick}>
        <img
          src={thumbnailUrl}
          width={"auto"}
          height={"auto"}
          alt="image"
          className="object-cover object-top rounded-md rounded-b-none group-hover:scale-105 transition-all duration-700  min-h-[250px] lg:min-h-[370px] lg:max-h-[370px] w-full"
        />
      </div>
      <div className="my-2 flex flex-col w-full gap-1 px-2 items-center lg:min-h-[76px] justify-between">
        <span className="lg:hidden text-sm lg:text-base w-full flex items-center justify-start text-gray-700 capitalize font-medium">
          {name?.substring(0, 22)} <span>{name?.length > 21 && "..."}</span>
        </span>
        <span className="hidden  text-sm lg:text-base w-full lg:flex items-center justify-start text-gray-700 capitalize font-medium">
          {name?.substring(0, 36)} <span>{name?.length > 35 && "..."}</span>
        </span>
        <div className="mt-1 text-sm w-full flex lg:flex-row items-center justify-start font-medium gap-2">
          <div className="flex gap-2">
            <span className="text-zinc-700 text-sm font-semibold ">
              ₹{price}
            </span>
            <span className="line-through text-zinc-400 text-sm font-medium">
              ₹{Number(strikePrice)}
            </span>
          </div>
          {}
          <span className="flex"> | </span>
          <div className="flex items-center justify-center gap-1">
            <span className="text-zinc-700 text-sm font-medium">{rating}</span>
            {/* <Rating className={"w-4 h-4"} /> */}
            <FaStar className="fill-[#F5D426] w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

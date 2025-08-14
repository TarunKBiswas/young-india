/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { webState } from "../../../../data/webStates";

const StoriesCard = ({ product, onClick }) => {
  const navigate = useNavigate();

  const productDetailHandler = (id) => {
    webState.stories = false;
    navigate(`/product/${id}`);
  };

  const item = product;
  const name = item?.name;
  const thumbnail = item?.thumbnail?.url;
  const price = item?.variants.at(0)?.price;
  const strikePrice = item?.products?.variants?.at(0)?.strike_price;

  return (
    <Link
      to={`/product/${item?.id}`}
      className=" relative cursor-pointer bg-white rounded-lg flex flex-col items-start justify-around max-w-[400px]"
      key={item?.id}
      onClick={() => productDetailHandler(item?.id)}
    >
      <div
        className="w-full overflow-hidden lg:aspect-none h-full "
        onClick={onClick}
      >
        <img
          width={"auto"}
          height={"auto"}
          alt="image"
          src={thumbnail}
          className="object-cover rounded-t-lg h-36 w-full  lg:aspect-16/9 lg:mb-3"
        />
      </div>
      <div className="my-2 flex flex-col w-full gap-1 px-2">
        <h3 className="text-xs w-full flex items-center justify-center md:text-sm text-black capitalize font-semibold">
          {name?.length > 30 ? `${name?.substring(0, 25)}...` : name}
        </h3>
        <p className="mt-1 text-sm w-full flex items-center justify-center font-medium gap-2">
          <span className="text-zinc-700 text-sm font-medium ">₹{price}</span>
          <span> | </span>
          <div className="flex items-center justify-center gap-1">
            <span className="line-through text-gray-500/70 text-xs w-full flex items-center justify-center md:text-sm text-black capitalize font-semibold">
              ₹{Number(strikePrice)?.toFixed(2)}
            </span>
          </div>
        </p>
      </div>
    </Link>
  );
};

export default StoriesCard;

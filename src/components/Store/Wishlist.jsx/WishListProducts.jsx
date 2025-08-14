import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import Delete from "../UI/Icon/Delete";

/* eslint-disable react/prop-types */
const WishListProducts = ({ product }) => {
  const navigate = useNavigate();
  const snap = useSnapshot(webState);

  const productDetailHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const togglerProductHandler = (product) => {
    const item = snap.wishListProducts.find(
      (item) => item.productId === product
    );
    if (item) {
      let newItems = snap.wishListProducts.filter(
        (item) => item.productId !== product
      );
      webState.wishListProducts = newItems;
      return;
    }
    webState.wishListProducts = [...snap.wishListProducts, product];
  };

  const item = product;
  const name = item?.productName;
  const thumbnail = item?.thumbnail;
  const price = item?.price || item?.prodPrice;
  const strikePrice = item?.selectedVariant?.strike_price;

  return (
    <div
      className="group relative bg-white flex flex-col items-start max-w-[300px] border rounded "
      key={item?.id}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none lg:h-80 xl:h-72">
        <img
          src={thumbnail}
          className="object-contain relative "
          width={"auto"}
          height={"auto"}
          alt="image"
        />
      </div>
      <div className="my-2 w-full flex justify-between px-2">
        <div
          onClick={() => productDetailHandler(item?.productId)}
          className="cursor-pointer"
        >
          <div className="text-sm text-themecolor capitalize ">
            <span className="absolute text-sm inset-0"></span>
            {name?.length > 30 ? `${name?.substring(0, 40)}...` : name}
          </div>
          <p className="mt-1 text-sm  font-medium flex items-center gap-2">
            <span className="text-themecolor text-xs">
              ₹{Number(price)?.toFixed(2)}
            </span>
            <span className="line-through text-black/70 text-xs ">
              ₹{Number(strikePrice)?.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="bottom-0 flex items-center">
          <span className="top-2 left-[88%] z-40 w-full ">
            <Delete
              className="h-5 w-4 text-red-600 cursor-pointer hover:scale-90 transition-all duration-200"
              onClick={() => togglerProductHandler(item?.productId)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default WishListProducts;

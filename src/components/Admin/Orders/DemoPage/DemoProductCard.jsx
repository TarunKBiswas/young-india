/* eslint-disable react/prop-types */

import { state } from "../../../../data/state";

/* eslint-disable no-unused-vars */
const DemoProductCard = ({ data }) => {
  let image =
    data?.thumbnail?.url || data?.attributes?.thumbnail?.data?.attributes?.url;
  let name = data?.name || data?.attributes?.name;
  let desc = data?.desc || data?.attributes?.desc;

  const addToCartHandler = (data) => {
    state.demoProductData = data;
    state.showDemoAddToCartModal = true;
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-3">
      <div className="w-full flex items-center justify-center">
        <img
          className=" object-contain  h-[200px]"
          src={image}
          alt="image"
          width={"auto"}
          height={"auto"}
        />
      </div>

      <div className="pt-3">
        <h5 className="text-lg font-semibold text-black capitalize">
          {name?.slice(0, 20)}
        </h5>
        <div className="flex flex-col">
          <span className="text-sm">{desc?.slice(0, 30)}</span>
          <div className="w-full flex items-center justify-end pt-2">
            <button
              className="w-full px-2 py-1 text-white  border border-gray-300 rounded bg-[#222222]"
              onClick={() => addToCartHandler(data)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoProductCard;

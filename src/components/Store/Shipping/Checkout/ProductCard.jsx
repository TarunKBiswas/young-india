/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types

const ProductCard = ({ data, action }) => {
  const thumbnailUrl = data?.thumbnail;

  return (
    <div className="flex flex-col w-full mt-2" onClick={action}>
      <div className="flex w-full bg-white rounded-lg gap-3">
        <div className="w-1/6 relative">
          <img
            className="object-cover object-center w-[70px] rounded-md h-[50px] lg:h-[70px]"
            src={thumbnailUrl}
            width={"auto"}
            height={"auto"}
            alt="image"
          />
          <div className="absolute rounded-full bg-themecolor w-5 h-5 top-[-6px] right-[-5px] text-white flex items-center justify-center">
            <span className=" text-[9px] flex items-center justify-center mt-0.5">
              {data?.quantity}
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <span className="text-gray-900 font-medium text-base lg:text-md">
            {data?.productName?.slice(0, 20)}
          </span>

          <div className="">
            <div className="w-full text-sm">
              <span>{"₹ " + Number(data?.prodPrice)?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

/* eslint-disable react/prop-types */
const VariantBox = ({ item, variantDetails, variantHandler }) => {
  return (
    <div key={item.id} className="flex flex-col items-center cursor-pointer">
      <div
        className={`flex  py-2 px-3 flex-col justify-center rounded-md items-center ${
          variantDetails?.id === item.id
            ? "  text-textcolor border bg-themecolor"
            : "bg-white border border-opacity-20"
        }`}
        onClick={() => variantHandler(item, item?.id, item?.premiumPrice)}
      >
        {item?.name !== null ? (
          <span className="text-center capitalize text-xs font-normal leading-normal">
            {item?.name?.slice(0, 20)}
          </span>
        ) : null}
      </div>
      <div className="text-red-600 text-xs text-center flex items-center justify-center font-medium pt-2 leading-none tracking-tight">
        {item?.quantity === 0
          ? "Out of stock"
          : `${item?.quantity < 10 ? ` ${item?.quantity} left` : ""}`}
      </div>
    </div>
  );
};

export default VariantBox;

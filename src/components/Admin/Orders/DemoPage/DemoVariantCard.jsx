/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const DemoVariantCard = ({ data, selectedVariant, setSelectedVariant }) => {
  return selectedVariant === data?.id ? (
    <div
      className={
        "bg-[#222222] text-white max-h-[8 0px] w-full p-2  border rounded-lg cursor-pointer "
      }
      onClick={() => setSelectedVariant(data?.id)}
    >
      <h5 className="mb-0.5 text-sm font-medium tracking-tight ">
        {data?.name}
      </h5>
      <p className="text-xs font-normal text-gray-300">
        Quantity: {data?.quantity}
      </p>
      <p className="text-xs font-normal  text-gray-300">Price: {data?.price}</p>
    </div>
  ) : (
    <div
      className={
        "bg-white text-black max-h-[8 0px] w-full p-2  border rounded-lg cursor-pointer "
      }
      onClick={() => setSelectedVariant(data?.id)}
    >
      <h5 className="mb-0.5 text-sm font-medium tracking-tight ">
        {data?.name}
      </h5>
      <p className="text-xs font-normal text-gray-500">
        Quantity: {data?.quantity}
      </p>
      <p className="text-xs font-normal  text-gray-500">Price: {data?.price}</p>
    </div>
  );
};

export default DemoVariantCard;

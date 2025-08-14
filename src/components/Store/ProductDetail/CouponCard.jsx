/* eslint-disable react/prop-types */
const CouponCard = ({ data, action }) => {
  // console.log(data);

  return (
    <div className="px-3 h-24 py-2 border-dashed border-yellow-400 border-2 bg-yellow-50 text-black/70 text-center rounded-lg relative flex flex-col items-center justify-between gap-2 flex-1 ">
      <h3 className="text-xs font-medium capitalize">{data?.message}</h3>

      <div
        className="flex flex-col gap-2 items-center justify-center"
        onClick={() => action(data)}
      >
        <span className="border text-gray-900 px-2 font-medium text-sm rounded cursor-pointer">
          {data?.coupon_code}
        </span>
      </div>

      <div className="w-10 h-10 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6 border-dashed border-yellow-400 border-r-2"></div>
      <div className="w-10 h-10 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6 border-dashed border-yellow-400 border-l-2"></div>
    </div>
  );
};

export default CouponCard;

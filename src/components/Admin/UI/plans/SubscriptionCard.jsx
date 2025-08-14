/* eslint-disable react/prop-types */
const SubscriptionCard = ({
  plan,
  price,
  isPopular,
  isYearly,
  paymentHanlder,
  monthlyType,
  yearlyType,
}) => {
  // const finalPrice = isYearly ? (price / 12).toFixed(0) : price;

  const finalPriceWithGst = price + Math.round(price * 0.18);

  return (
    <div
      // className={`w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 `}
      className={`w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden`}
    >
      {/* {isPopular && (
        <div className="bg-blue-500 text-white text-center py-2 px-4 text-sm font-semibold">
          MOST POPULAR
        </div>
      )} */}
      <div className="px-6 py-8">
        <h2 className={`text-3xl font-bold mb-2 text-gray-800`}>{plan}</h2>
        <div className="text-5xl font-bold text-gray-900 mb-6">
          ₹{price}
          {/* <span className="text-xl font-normal text-gray-600">/mo</span> */}
          <span className="text-xl font-normal text-gray-600">
             <small> + 18% GST</small>
          </span>
        </div>

        <div
          className={`w-full cursor-pointer text-center py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-300 ${
            isPopular
              ? "bg-blue-500 hover:bg-blue-600"
              // : "bg-gray-600 hover:bg-gray-700"
              : "bg-blue-50 hover:bg-blue-100 !text-blue-500"
          }`}
          onClick={() => paymentHanlder(isYearly ? yearlyType : monthlyType)}
        >
          {/* Choose Plan */}
          Pay ₹{isYearly ? finalPriceWithGst : finalPriceWithGst - 1}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;

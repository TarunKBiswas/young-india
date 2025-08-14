/* eslint-disable react/prop-types */

const Wallet = ({ data }) => {
  const resellengPriceHandler = () => {
    let resellengMRP = 0;
    data?.forEach((object) => {
      if (object?.resellengPrice) {
        resellengMRP += object?.resellengPrice * object?.quantity;
      }
    });
    return resellengMRP;
  };

  const totalPriceForReselleing = () => {
    let reselleng = 0;
    data?.forEach((object) => {
      if (object?.resellengPrice) {
        reselleng += object?.price * object?.quantity;
      }
    });
    return reselleng;
  };

  const totalPriceHandler = () => {
    let totalPrice = 0;
    data.forEach((object) => {
      totalPrice += object?.price * object?.quantity;
    });
    return totalPrice;
  };
  return (
    <div>
      <div className="flex flex-col items-center mt-4 ">
        <span className="text-lg font-medium">Pricing Details</span>

        <div className="w-full flex items-center justify-center flex-col min-w-[300px] mx-auto mt-4 gap-2">
          <div className="w-full flex items-center justify-between text-base leading-6 font-normal">
            <span className="text-black"> Total Margin </span>
            <span className="text-themecolor">
              ₹ {resellengPriceHandler() - totalPriceForReselleing()}
            </span>
          </div>
          <div className="w-full flex items-center justify-between mt-1.5 text-base leading-6 font-medium">
            <span>SubTotal</span>

            <span>₹ {totalPriceHandler()}</span>
          </div>
          {/* <div className="w-full flex items-center justify-between text-base leading-6 font-medium">
            <span>Delivery Charges</span>
            <span>₹ 49</span>
          </div> */}

          <hr className="w-full text-themecolor" />
          <div className="w-full flex items-center justify-between text-base leading-6 font-medium text-themecolor">
            <span>Total</span>
            <span>₹ {totalPriceHandler()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

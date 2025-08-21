/* eslint-disable react/prop-types */
const PaymentSlip = ({ data }) => {
  const orderPrice = data?.variant?.price;
  const shippingValue = data?.variant?.product?.shipping_value;
  // const totalPrice = parseInt(orderPrice) + parseInt(shippingValue);

  // console.log(data);
  const paidAmount = data?.order?.price;

  return (
    <>
      <div className="border border-[#222222]/20 flex flex-col gap-2 p-2.5">
        <span className="text-sm uppercase text-[#222222]/60">
          Payment SummAry
        </span>

        <div className="w-full flex items-center justify-center flex-col  mt-1 gap-2.5">
          <div className="w-full flex items-center justify-between">
            <span className="text-[#333333] text-xs  font-normal">
              Product Amount{" "}
            </span>
            <span className="text-[#333333] text-xs font-normal">
              ₹ {!data?.selectedWeightId ? orderPrice : data?.selectedWeight?.price}
            </span>
          </div>
          <div className="w-full flex items-center justify-between ">
            <span className="text-[#333333] text-xs  font-normal">
              Shipping Charges
            </span>
            <span className="text-[#333333] text-xs  font-normal">
              ₹ {shippingValue}
            </span>
          </div>
          <div className="w-full flex items-center justify-between ">
            <span className="text-[#333333] text-xs  font-normal">
              Discounted Price
            </span>
            <span className="text-[#333333] text-xs  font-normal">
              ₹ {paidAmount || 0}
            </span>
          </div>

          <hr className="w-full text-[#333333]" />
          <div className="w-full flex items-center justify-between ">
            <span className="text-themecolor text-xs  font-medium">
              Amount Paid
            </span>
            <span className="text-themecolor text-xs  font-medium">
              ₹ {paidAmount}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSlip;

import { useSnapshot } from "valtio";
import Container from "../UI/Wrappers/Container.Wrapper";
import { webState } from "../../../data/webStates";
// import { useEffect } from "react";

const CartPayment = () => {
  const snap = useSnapshot(webState);
  const value = snap.cartData?.Variants;

  // ✅ Calculate total price conditionally
  const totalPrice =
    value?.reduce((accumulator, product) => {
      const quantity = product.CartVariant?.quantity || 0;

      // Check if product has a selectedWeightId
      if (product.CartVariant?.selectedWeightId && product.CartVariant?.selectedWeight) {
        return (
          accumulator +
          parseFloat(product.CartVariant.selectedWeight.price || 0) * quantity
        );
      }

      // Fallback: use base product price
      return accumulator + parseFloat(product.price || 0) * quantity;
    }, 0) || 0;

  // ✅ Coupon / discounts
  const totalDiscountedPrice =
    value?.reduce((total, product) => total + (product.discountedPrice || 0), 0) || 0;

  // ✅ Shipping calculation
  const data = value?.map((data) => data?.product).filter(Boolean);

  const calculatePrices = (data) => {
    return data?.reduce(
      (acc, object) => {
        const { shipping_value_type, shipping_value } = object;
        const parsedShippingPrice = parseFloat(shipping_value || 0);
        if (shipping_value_type === "SHIPPING_PERCENTAGE") {
          acc.deliveryPrice += (totalPrice * parsedShippingPrice) / 100;
        } else {
          acc.deliveryPrice += parsedShippingPrice;
        }
        return acc;
      },
      { deliveryPrice: 0, originalTotalPrice: 0 }
    );
  };

  // ✅ COD advance calculation
  const calculateCodAdvance = (totalPrice, codPrepaidType, codPrepaid) => {
    return codPrepaidType === "PERCENTAGE"
      ? (totalPrice * codPrepaid) / 100
      : codPrepaid;
  };

  const codAdvancePrice = +calculateCodAdvance(
    totalPrice,
    snap?.globalData?.data?.cod_prepaid_type,
    snap?.globalData?.data?.cod_prepaid
  );

  webState.codAdvancePrice = codAdvancePrice;

  const { deliveryPrice } = calculatePrices(data);

  return (
    <Container>
      <div className="flex flex-col items-center ">
        <div className="w-full flex items-center justify-center flex-col mx-auto gap-3">
          <div className="w-full flex items-center justify-between text-neutral-800 text-opacity-70 font-normal leading-normal">
            <span className="text-base lg:text-sm">Product Amount</span>
            <span className="text-base xl:text-sm">
              ₹ {totalPrice?.toFixed(2)}
            </span>
          </div>

          <div className="w-full flex items-center justify-between text-neutral-800 text-opacity-70 font-normal leading-normal">
            <span className="text-base lg:text-sm">Delivery Charge</span>
            <span className="text-base lg:text-sm">
              {deliveryPrice ? "₹ " + deliveryPrice.toFixed(2) : "Free"}
            </span>
          </div>

          {snap?.selectPayment === "COD" &&
          snap.globalData?.data?.cod_prepaid !== "0" ? (
            <div className="w-full flex items-center justify-between text-neutral-800 text-opacity-70 font-normal leading-normal">
              <span className="text-base lg:text-sm">COD Advance</span>
              <span className="text-base lg:text-sm">
                ₹ {codAdvancePrice?.toFixed(2)}
              </span>
            </div>
          ) : null}

          {totalDiscountedPrice > 0 && (
            <div className="w-full flex items-center justify-between text-green-600 leading-normal">
              <span className="text-base lg:text-sm">Coupon Discount</span>
              <span className="text-base lg:text-sm">
                - ₹ {totalDiscountedPrice?.toFixed(2)}
              </span>
            </div>
          )}

          <hr className="w-full text-themecolor" />
          <div className="w-full flex items-center justify-between font-bold leading-normal text-black">
            <span>Total</span>
            <span>
              ₹ {(totalPrice + deliveryPrice - totalDiscountedPrice)?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};


export default CartPayment;

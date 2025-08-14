/* eslint-disable react/prop-types */
import { webState } from "../../../data/webStates";
import { useSnapshot } from "valtio";
import Container from "../UI/Wrappers/Container.Wrapper";

const Payment = () => {
  const snap = useSnapshot(webState);
  const data =
    snap.purhcaseType === "buynow" ? [snap.buyNowProduct] : snap.cartItems;

  const calculatePrices = (data) => {
    return data?.reduce(
      (acc, object) => {
        const {
          shipping_type,
          shippingPrice,
          prodPrice,
          quantity,
          resellengPrice,
          discountedPrice,
        } = object;

        const parsedProdPrice = parseFloat(prodPrice);
        const parsedShippingPrice = parseFloat(shippingPrice);
        const parsedDiscountedPrice = parseFloat(discountedPrice) || 0;

        acc.originalTotalPrice += parsedProdPrice * quantity;

        if (shipping_type === "SHIPPING_PERCENTAGE") {
          acc.deliveryPrice +=
            (parsedProdPrice * quantity * parsedShippingPrice) / 100;
        } else {
          acc.deliveryPrice += parsedShippingPrice;
        }

        if (resellengPrice) {
          acc.resellingMRP += resellengPrice * quantity;
          acc.totalResellingPrice += parsedProdPrice * quantity;
        }

        const itemTotalPrice =
          parsedProdPrice * quantity - parsedDiscountedPrice;
        acc.totalPrice += itemTotalPrice;

        acc.totalDiscount += parsedDiscountedPrice;

        return acc;
      },
      {
        deliveryPrice: 0,
        resellingMRP: 0,
        totalResellingPrice: 0,
        totalPrice: 0,
        totalDiscount: 0,
        originalTotalPrice: 0,
      }
    );
  };

  const {
    deliveryPrice,
    resellingMRP,
    totalResellingPrice,
    totalPrice,
    totalDiscount,
    originalTotalPrice,
  } = calculatePrices(data);
  webState.totalPrice = totalPrice;

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

  // console.log(codAdvancePrice);

  webState.codAdvancePrice = codAdvancePrice;

  return (
    <Container>
      <div className="flex flex-col items-center ">
        <div className="w-full flex items-center justify-center flex-col mx-auto gap-3">
          <div className="w-full flex items-center justify-between text-neutral-800 text-opacity-70 font-normal leading-normal">
            <span className="text-base lg:text-sm">Product Amount</span>
            <span className="text-base xl:text-sm">
              ₹ {originalTotalPrice?.toFixed(2)}
            </span>
          </div>

          {resellingMRP ? (
            <div className="w-full flex items-center justify-between text-neutral-800 text-opacity-70 font-normal leading-normal">
              <span className="text-base lg:text-sm">Reselling Margin</span>
              <span className="text-base lg:text-sm">
                ₹ {(resellingMRP - totalResellingPrice).toFixed(2)}
              </span>
            </div>
          ) : null}

          <div className="w-full flex items-center justify-between text-neutral-800 text-opacity-70 font-normal leading-normal">
            <span className="text-base lg:text-sm">Devliery Charge</span>
            <span className="text-base lg:text-sm">
              {deliveryPrice ? "₹ " + deliveryPrice.toFixed(2) : "Free"}
            </span>
          </div>

          {data[0]?.cod &&
          snap?.selectPayment === "COD" &&
          snap.globalData?.data?.cod_prepaid !== "0" ? (
            <div className="w-full flex items-center justify-between text-neutral-800 text-opacity-70 font-normal leading-normal">
              <span className="text-base lg:text-sm">COD Advance</span>
              <span className="text-base lg:text-sm">
                ₹
                {snap?.globalData?.data?.cod_prepaid
                  ? codAdvancePrice?.toFixed(2)
                  : "Free"}
              </span>
            </div>
          ) : null}

          {totalDiscount > 0 && (
            <div className="w-full flex items-center justify-between text-green-600 leading-normal">
              <span className="text-base lg:text-sm">Coupon Discount</span>
              <span className="text-base lg:text-sm">
                {" "}
                - ₹ {totalDiscount?.toFixed(2)}
              </span>
            </div>
          )}

          <hr className="w-full text-themecolor" />
          <div className="w-full flex items-center justify-between font-bold leading-normal text-black">
            <span>Total</span>
            <span>₹ {(totalPrice + deliveryPrice)?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Payment;

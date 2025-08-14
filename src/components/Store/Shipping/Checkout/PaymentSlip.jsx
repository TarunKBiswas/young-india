import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Payment from "../../Checkout/Payment";

const PaymentSlip = () => {
  const [showProduct, setShowProduct] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const snap = useSnapshot(webState);

  const showProductCard = () => {
    setShowProduct(!showProduct);
    setIsRotated(!isRotated);
  };

  const handleMenuClose = () => {
    setIsRotated(false);
  };
  return (
    <>
      {snap?.cartProducts.length > 0 && (
        <p
          className="text-lg text-darkText font-medium cursor-pointer mt-4 mb-2.5 flex items-center md:hidden"
          onClick={showProductCard}
        >
          Show Product
          <IoIosArrowDown
            className={`w-7 h-5 flex items-center justify-center websiteNavBar ${
              isRotated ? "rotate-180" : null
            }`}
          />
        </p>
      )}
      {showProduct && (
        <div
          className={`w-full lg:hidden ${
            snap?.cartProducts.length > 2 ? " lg:max-w-[65%] h-[600px]" : " "
          }  overflow-scroll scrollbar-hide flex flex-col gap-1 md:gap-2 mb-4  `}
        >
          {snap?.cartProducts?.map((item, i) => {
            return <ProductCard data={item} key={i} action={handleMenuClose} />;
          })}
        </div>
      )}
      <hr className=" md:hidden" />
      <div
        className={`hidden lg:flex w-full ${
          snap?.cartProducts.length > 2
            ? " w-full max-h-[425px] overflow-scroll scrollbar-hide"
            : " "
        }   flex flex-col gap-1 px-4`}
      >
        <hr className="mb-2" />

        {snap?.cartProducts?.map((item, i) => {
          return <ProductCard data={item} key={i} index={i} />;
        })}
        <hr className="mt-3" />
      </div>

      <Payment data={snap?.cartProducts} />
    </>
  );
};

export default PaymentSlip;

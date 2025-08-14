/* eslint-disable react-hooks/exhaustive-deps */
// import { useSnapshot } from "valtio";
import CartProductCard from "./CartProductCard";
import { webState } from "../../../data/webStates";
import { useCallback, useMemo } from "react";
import Lottie from "react-lottie-player";
import empty_cart from "../../../assets/animations/empty_cart2.json";
import Container from "../UI/Wrappers/Container.Wrapper";
// import Title from "../UI/Wrappers/Title.Wrapper";
import { CheckOutButton } from "../UI/Buttons";
// import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import { initiateCheckoutEvent } from "../../../lib/FbPixelEvent";
// import ProductCard from "../UI/Cards/ProductCard";
import { useSnapshot } from "valtio";
import CartPayment from "./CartPayment";

// const CartProductCardSkeleton = () => {
//   return (
//     <div className="flex w-full gap-4 bg-white shadow-sm rounded-lg overflow-hidden">
//       <div className="w-1/3 lg:w-1/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
//       <div className="w-full p-2 flex flex-col justify-between gap-2">
//         <div className="w-full flex flex-col gap-1">
//           <div className="flex justify-between">
//             <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse mb-3 w-1/3"></div>
//             <div className="flex gap-3">
//               <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
//               <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
//             </div>
//           </div>
//           <div className="flex flex-col w-full gap-3 justify-between mb-1">
//             <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/4"></div>
//             <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/4"></div>
//             <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/4"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Cart = () => {
  const snap = useSnapshot(webState);
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true); // New state for managing loading

  // const isLoading = !snap.cartProducts;

  const checkoutHandler = useCallback(() => {
    initiateCheckoutEvent();
    webState.purhcaseType = "addtocart";
    webState.showCheckoutModal = true;
  }, []);

  const navigatHandler = () => {
    navigate("/");
  };

  const emptyCartContent = useMemo(
    () => (
      <div className="w-full flex flex-col items-center justify-center">
        <Lottie
          loop
          animationData={empty_cart}
          play
          style={{ width: 600, height: 400 }}
        />
        <div className="w-full flex gap-1 flex-col text-center">
          <span className="mt-6 text-2xl font-bold text-gray-600 capitalize">
            {"Hey, it feels so light!"}
          </span>
          <span className="text-sm text-gray-400 capitalize">
            {"There is nothing in your bag, let's add some items"}
          </span>
        </div>

        <div
          className={`px-7 lg:px-10 py-2 bg-themecolor flex-col rounded-md justify-center cursor-pointer items-center gap-2.5 inline-flex mt-5  border`}
          onClick={navigatHandler}
        >
          <div className="justify-start items-center gap-1.5 flex">
            <span className="text-textcolor font-medium text-base  leading-7 tracking-normal">
              Continue Shopping
            </span>
          </div>
        </div>
      </div>
    ),
    [navigate]
  );

  return (
    <Container>
      <div className="w-full flex flex-col items-center mt-8 xl:mt-20 mb-40">
        <div className="w-full flex flex-col md:flex-row items-start gap-4">
          {snap.cartItems?.length > 0 ? (
            <div
              className={`w-full ${
                snap.cartItems?.length > 2 ? "lg:max-w-[65%]  " : null
              }   flex flex-col gap-4 px-0.5`}
            >
              {snap.cartItems?.map((item, i) => {
                return <CartProductCard data={item} key={i} />;
              })}
            </div>
          ) : (
            emptyCartContent
          )}

          {/* payment method */}
          {snap.cartItems?.length > 0 ? (
            <div className="w-full lg:max-w-[30%] mx-auto px-3 lg:px-0 h-[400px] lg:h-[600px] mt-10 xl:mt-0">
              {/* <Payment data={snap.cartItems} /> */}
              <CartPayment />
              <div className="flex items-center justify-center  mt-2">
                <CheckOutButton
                  text={"Proceed to Check-out"}
                  action={checkoutHandler}
                  style={" mt-3 flex items-center justify-center w-full"}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default Cart;

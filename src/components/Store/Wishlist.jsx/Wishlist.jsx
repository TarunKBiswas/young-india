/* eslint-disable react/jsx-key */
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import Lottie from "react-lottie-player";
import empty_cart from "../../../assets/animations/empty_cart2.json";
import WishListProducts from "./WishListProducts";
import Container from "../UI/Wrappers/Container.Wrapper";
import { HeadingName } from "../UI/Buttons";
import { useEffect } from "react";

const Wishlist = () => {
  const snap = useSnapshot(webState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={"px-2 min-h-[70vh]"}>
      <div className="w-full flex flex-col items-center justify-center p-2 max-w-[1440px] mx-auto ">
        <HeadingName title={"Your Wishlist"} className={"mt-4"} />

        <div className="w-full h-full ">
          {snap.wishListProducts?.length > 0 ? (
            <div className="my-4 grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5 ">
              {snap.wishListProducts?.map((item, i) => {
                return (
                  <div key={i}>
                    <WishListProducts product={item} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center my-16">
              <Lottie
                loop
                animationData={empty_cart}
                play
                style={{ width: 500, height: 400 }}
              />
              <span className="mt-6 text-xl font-medium">
                Wishlist is empty
              </span>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Wishlist;

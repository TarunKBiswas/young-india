/* eslint-disable react/prop-types */
import { ActionButtons, SecoundaryButton } from "../UI/Buttons";
import { IoLogoWhatsapp } from "react-icons/io5";
import QuantitySelector from "./QuantitySelector";
import { ShoppingBag, ShoppingCart } from "lucide-react";

const Buttons = ({
  productDetail,
  quantity,
  storeType,
  variantDetails,
  selectedVariant,
  prodPrice,
  resellengPrice,
  showResellerInput,
  handleEnquireClick,
  redireToWhatsapp,
  info,
  Enquiry,
  handleProductAction,
  setQuantity,
  bulkPData,
  // dec,
  // wishlistHandler,
  // wishlisted,
  // addToCartHandler,
  // buyNowHandler,
  // addQuantityHandler,
  // handleShareClick,
  // Share,
  // WhatsApp,
}) => {
  return (
    <>
      <div className="flex justify-between items-end">
        <div
          className={`w-full flex min-w-max ${
            storeType === "WHATSAPP" && "hidden"
          }`}
        >
          {bulkPData?.length > 0 ? (
            <div className="mt-3 flex flex-col">
              <label className="text-neutral-800 text-sm lg:text-base font-semibold leading-tight">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md w-32 mt-1 px-2 py-2 text-center !ring-0"
                min="1"
                step="1"
                pattern="[0-9]*"
                placeholder="Qty"
              />
            </div>
          ) : (
            <QuantitySelector setQuantity={setQuantity} />
          )}
        </div>

        {/* {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
          storeType
        ) && (
          <>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md border-gray-200 text-sm cursor-pointer border text-black"
              onClick={() => handleShareClick(info?.id)}
            >
              Share <span>{Share && <Share />}</span>
            </button>
          </>
        )} */}

        {/* {productDetail?.enquiry_enabled && (
          <div className="w-full cursor-pointer">
            {storeType === "WHATSAPP" ? (
              // <ActionButtons
              //   action={() => redireToWhatsapp(info)}
              //   Icon={IoLogoWhatsapp}
              //   title={"Whatsapp Now"}
              // />
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md border-gray-200 text-sm cursor-pointer border text-black"
                onClick={() => redireToWhatsapp(info)}
              >
                Share <span>{Share && <Share />}</span>
              </button>
            ) : (

              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md border-gray-200 text-sm cursor-pointer border text-black"
                onClick={() => redireToWhatsapp(info)}
              >
                Share <span>{Share && <Share />}</span>
              </button>

              // <ActionButtons
              //   action={() => handleEnquireClick(info?.id)}
              //   Icon={Enquiry}
              //   title={"Whatsapp Now"}
              // />
            )}
          </div>
        )} */}
        {productDetail?.enquiry_enabled &&
          ["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
            storeType
          ) && (
            <button
              className="has-tooltip flex items-center text-black text-3xl"
              onClick={() => handleEnquireClick(info?.id)}
            >
              <span className="tooltip right-0 -top-6 min-h-min rounded shadow-lg p-1 min-w-max text-xs bg-themecolor text-white">
                Enquire Now
              </span>
              <span>{Enquiry && <Enquiry />}</span>
            </button>
          )}
      </div>

      {/* <div
        className={`w-full ${
          storeType === "WHATSAPP" && "hidden"
        } grid grid-cols-2 gap-3 mt-4`}
      >
        <div className="w-full">
          <QuantityButton
            quantity={quantity}
            addQuantityHandler={addQuantityHandler}
            dec={dec}
          />
        </div>

        {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
          storeType
        ) && (
          <div className="w-full">
            <button
              className="flex items-center justify-center gap-2 w-full h-[60px] lg:h-[47px] px-6 rounded-md bg-white font-normal text-base cursor-pointer border border-gray-200 text-black"
              onClick={() =>
                wishlistHandler(
                  productDetail?.id,
                  productDetail?.name,
                  productDetail?.thumbnail?.url,
                  variantDetails?.price,
                  selectedVariant
                )
              }
            >
              {wishlisted ? (
                <BsFillHeartFill className=" h-6 w-6 fill-themecolor flex items-center" />
              ) : (
                <CiHeart className=" h-6 w-6 flex items-center " />
              )}
              <span className="font-normal">Wishlist</span>
            </button>
          </div>
        )}
      </div> */}

      {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
        storeType
      ) && (
        // <div className="w-full hidden lg:flex gap-3 mt-2">
        //   <div className="w-1/2">
        //     <div
        //       className={` flex items-center justify-center gap-2 w-full h-[60px] lg:h-[47px] px-6 rounded-md border-gray-200 bg-white font-normal text-base cursor-pointer border text-black`}
        //       onClick={() =>
        //         addToCartHandler(
        //           productDetail?.id,
        //           productDetail?.name,
        //           productDetail?.thumbnail?.url,
        //           quantity,
        //           variantDetails?.name,
        //           prodPrice,
        //           productDetail?.shipping_value,
        //           productDetail?.shipping_value_type,
        //           resellengPrice,
        //           selectedVariant,
        //           productDetail?.cod_enabled,
        //           productDetail?.coupons,
        //           showResellerInput
        //         )
        //       }
        //       id={variantDetails}
        //     >
        //       <BsHandbag className={`w-4 h-4 lg:h-5 lg:w-5 text-neutral-800`} />
        //       <span className="text-center text-neutral-800 text-base font-normal leading-relaxed">
        //         Add To Cart
        //       </span>
        //     </div>
        //   </div>
        //   <div className="w-1/2">
        //     <SecoundaryButton
        //       action={() =>
        //         buyNowHandler(
        //           productDetail?.id,
        //           productDetail?.name,
        //           productDetail?.thumbnail?.url,
        //           quantity,
        //           variantDetails?.name,
        //           prodPrice,
        //           productDetail?.shipping_value,
        //           productDetail?.shipping_value_type,
        //           resellengPrice,
        //           selectedVariant,
        //           productDetail?.cod_enabled,
        //           productDetail?.coupons,
        //           showResellerInput
        //         )
        //       }
        //       id={variantDetails}
        //       Icon={Bag}
        //       title={"Buy Now"}
        //     />
        //   </div>
        // </div>
        <div className="w-full hidden lg:flex gap-3 mt-4">
          <div className="w-1/2">
            <div
              className={` flex items-center justify-center gap-2 w-full h-[60px] lg:h-[47px] px-6 rounded-md border-gray-200 bg-white font-normal text-base cursor-pointer border text-black`}
              onClick={() =>
                handleProductAction(
                  "addtocart",
                  // productDetail,
                  productDetail?.id,
                  productDetail?.name,
                  productDetail?.thumbnail?.url,
                  quantity,
                  variantDetails?.name,
                  prodPrice,
                  productDetail?.shipping_value,
                  productDetail?.shipping_value_type,
                  resellengPrice,
                  selectedVariant,
                  productDetail?.cod_enabled,
                  productDetail?.coupons,
                  showResellerInput
                )
              }
              id={variantDetails}
            >
              <ShoppingCart className={`w-6 h-6 text-neutral-800`} />
              <span className="text-center text-neutral-800 text-base font-normal leading-relaxed">
                Add To Cart
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <SecoundaryButton
              action={() =>
                handleProductAction(
                  "buynow",
                  productDetail?.id,
                  productDetail?.name,
                  productDetail?.thumbnail?.url,
                  quantity,
                  variantDetails?.name,
                  prodPrice,
                  productDetail?.shipping_value,
                  productDetail?.shipping_value_type,
                  resellengPrice,
                  selectedVariant,
                  productDetail?.cod_enabled,
                  productDetail?.coupons,
                  showResellerInput
                )
              }
              id={variantDetails}
              Icon={ShoppingBag}
              title={"Buy Now"}
            />
          </div>
        </div>
      )}

      {/* catgalogue and share button */}
      <div className="w-full hidden lg:flex items-center justify-between gap-3 mt-6 lg:mt-2">
        {productDetail?.enquiry_enabled &&
          ["B2B", "WHATSAPP"].includes(storeType) && (
            <div className="w-full cursor-pointer">
              {storeType === "WHATSAPP" ? (
                <ActionButtons
                  action={() => redireToWhatsapp(info)}
                  Icon={IoLogoWhatsapp}
                  title={"Whatsapp Now"}
                  className={
                    "bg-gradient-to-r from-green-600 to-green-500/50 bg-green-600 text-white "
                  }
                />
              ) : (
                <ActionButtons
                  action={() => handleEnquireClick(info?.id)}
                  Icon={Enquiry}
                  title={"Enquire Now"}
                />
              )}
            </div>
          )}

        {/* {["B2B", "WHATSAPP"].includes(
          storeType
        ) && (
          <div className={"w-full cursor-pointer"}>
            <ActionButtons
              action={() => handleShareClick(info?.id)}
              Icon={Share}
              title={"Share"}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default Buttons;

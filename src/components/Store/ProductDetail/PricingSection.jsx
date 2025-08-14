import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { ResellerPriceBadge } from "../UI/Badges";
import { FaStar, FaStarHalfAlt, FaHeart } from "react-icons/fa";
import { Heart, Share2 } from "lucide-react";
// import { FaHeart, FaRegHeart } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const PricingSection = ({
  data,
  prodPrice,
  strikePrice,
  finalDifference,
  premiumPrice,
  premiumPlanHandler,
  price,
  wishlisted,
  wishlistHandler,
  variantDetails,
  selectedVariant,
  storeType,
  handleShareClick,
  info,
  rating,
}) => {
  const snap = useSnapshot(webState);
  // console.log(rating);

  const averageRating =
    rating?.length > 0
      ? rating?.reduce((acc, rating) => acc + +rating?.rating, 0) /
        rating?.length
      : 0;

  // console.log(data);

  return (
    <>
      {data?.tags?.map((tag) => (
        <div key={tag.id} className="w-full flex gap-2">
          <span className="">#{tag.name}</span>
        </div>
      ))}

      <div className="flex items-start justify-between gap-3">
        <div className=" text-neutral-800 lg:mt-0 text-xl lg:text-3xl font-semibold leading-normal capitalize">
          {data?.name}
        </div>
        <div className="flex gap-3 items-center">
          {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"]?.includes(
            storeType
          ) && (
            <button
              className="p-2 h-8 w-8 rounded-full relative bg-gray-100 shadow-md flex items-center justify-center has-tooltip"
              onClick={() =>
                wishlistHandler(
                  data?.id,
                  data?.name,
                  data?.thumbnail?.url,
                  variantDetails?.price,
                  selectedVariant
                )
              }
            >
              {wishlisted ? (
                <FaHeart className=" h-5 w-5 fill-red-500" />
              ) : (
                <Heart className=" h-5 w-5" />
              )}
            </button>
          )}

          {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
            storeType
          ) && (
            <button
              className="p-2 h-8 w-8 rounded-full relative bg-gray-100 shadow-md flex items-center justify-center has-tooltip"
              onClick={() => handleShareClick(info?.id)}
            >
              <Share2 />
            </button>
          )}
        </div>
      </div>
      
      {window.location.href?.includes("shyree") ? (
        <div className="flex justify-start items-center gap-1.5 ">
          {Array.from({ length: 5 }).map((_, i) => {
            const rating = averageRating || data?.rating || 0; // Default to 0 if rating is null/undefined
            if (i < Math.floor(rating)) {
              return <FaStar className="fill-[#F5D426] w-4 h-4" key={i} />;
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
              return (
                <FaStarHalfAlt className="fill-[#F5D426] w-4 h-4" key={i} />
              );
            } else {
              return <FaStar className="fill-gray-200 w-4 h-4" key={i} />;
            }
          })}
          <span className="text-xs pt-1">({rating?.length} ratings)</span>
        </div>
      ) : (
        <div className="flex justify-start items-center gap-1.5 ">
          {Array.from({ length: 5 }).map((_, i) => {
            const rating = data?.rating || 0; // Default to 0 if rating is null/undefined
            if (i < Math.floor(rating)) {
              return <FaStar className="fill-[#F5D426] w-4 h-4" key={i} />;
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
              return (
                <FaStarHalfAlt className="fill-[#F5D426] w-4 h-4" key={i} />
              );
            } else {
              return <FaStar className="fill-gray-200 w-4 h-4" key={i} />;
            }
          })}
        </div>
      )}

      {data?.show_price && (
        <>
          <div className="flex flex-col w-full mt-2">
            <div className="flex items-center justify-start gap-1.5 lg:gap-3 w-full">
              <div className="text-primaryColor text-lg lg:text-xl font-bold leading-normal animate__backInUp">
                ₹ {prodPrice}
              </div>
              {strikePrice && (
                <div className="text-neutral-400 text-sm lg:text-base font-bold line-through leading-normal">
                  ₹{" "}
                  {!strikePrice ? data?.variants[0]?.strike_price : strikePrice}
                </div>
              )}
              {strikePrice && (
                <div className="bg-themecolor px-2 py-1 rounded  text-textcolor text-xs font-medium leading-tight">
                  {finalDifference}% off
                </div>
              )}
            </div>
            <small className="text-xs font-semibold text-gray-500">
              Inclusive of All Taxes{" "}
            </small>
          </div>

          {premiumPrice &&
          snap?.userData?.data?.isPremium &&
          snap?.premiumPlansData > 0 ? (
            <ResellerPriceBadge
              action={premiumPlanHandler}
              description={"Premium reseller Price"}
              price={premiumPrice ? premiumPrice : price}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default PricingSection;

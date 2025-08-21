/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useMemo, useState, useEffect } from "react";
import BulkPricingSection from "./BulkPricingSection";
import PricingSection from "./PricingSection";
import ResellingSection from "./ResellingSection";
import Coupons from "./Coupons";
import Buttons from "./Buttons";
import Guarrenties from "./Guarrenties";
import Guarantees from "./Guarantees";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { FailureAlert, SuccessAlert } from "../../Toast";
import { ActionButtons, SecoundaryButton } from "../UI/Buttons";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io5";
import Enquiry from "../UI/Icon/Enquiry";
import Bag from "../UI/Icon/Bag";
import { shareProduct } from "../../../utils/Store/Products";
import VariantBox from "./VariantBox";
// import WhatsApp from "../UI/Icon/Whatsapp";
// import Share from "../UI/Icon/Share";
// import ProductDetailContainer from "../UI/Wrappers/ProductDetailContainer";
// import Guarantees from "./Guarantees";
import { postHandlerWithToken } from "../../../utils/Store/ApiCalls";
// import { getCartData } from "../../../utils/Store/Constant";
// import ProductColorSelect from "./ProductColorSelect";
import {
  addToCartEvent,
  // addToCartEvent,
  // addToCartEvent,
  initiateCheckoutEvent,
} from "../../../lib/FbPixelEvent";

const Details = ({ rating, productDetail }) => {
  // console.log(rating);
  // console.log(productDetail);
  const [showBulkPrice, setShowBulkPrice] = useState(false);
  const [bulkPData, setBulkPData] = useState(
    productDetail?.variants[0]?.bulk_pricings
  );
  const [selectedFlavour, setselectedFlavour] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  // const variantName = selectedVariant?.primary_attribute?.value
  // || selectedVariant?.name
  // || productDetail?.variants?.[0]?.name;

  const [showResellerInput, setShowReselerInput] = useState(false);
  const [resellengPrice, setResellingPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [variantDetails, setVariantDetails] = useState(null);
  const [wishlisted, setWishlisted] = useState();
  const [price, setPrice] = useState(productDetail?.variants[0]?.price);
  const snap = useSnapshot(webState);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [prodPrice, setProdPrice] = useState(null);
  const [strikePrice, setStrikePrice] = useState(
    productDetail?.variants[0]?.strike_price
  );
  const [premiumPrice, setPremiumPrice] = useState(null);
  const [showBulkPriceChart, setShowBulkPriceChart] = useState(true);

  const info = webState.singleProductInfo;
  const userInfo = snap?.userData?.data;
  const storeType = snap.storeInfo?.store_type;

  const variantHandler = useCallback(
    (data) => {
      setBulkPData(data?.bulk_pricings);
      setShowBulkPrice(true);
      setVariantDetails(data);
      setSelectedVariant(data);
      setPrice(
        userInfo?.isPremium && data?.premium_price
          ? data?.premium_price
          : data?.price
      );
      setProdPrice(
        userInfo?.isPremium && data?.premium_price
          ? data?.premium_price
          : data?.price
      );
      setStrikePrice(data?.strike_price);
      setPremiumPrice(data?.premium_price);
    },
    [userInfo]
  );
  useEffect(() => {
    if (!productDetail?.variants?.length) return;

    // Pick a default variant: prefer one with primary_attribute, else fallback
    const defaultVariant =
      productDetail.variants.find((v) => v.primary_attribute) ||
      productDetail.variants[0];

    setVariantDetails(defaultVariant);
    setSelectedVariant(defaultVariant);

    const firstFlavour = defaultVariant.primary_attribute?.value || null;
    const firstSize = defaultVariant.secondary_attribute?.value?.[0] || null;

    setselectedFlavour(firstFlavour);
    setSelectedSize(firstSize);

    // If there's a size & flavour, use size pricing; else fallback to variant price
    if (firstFlavour && firstSize) {
      handleSizeSelection(firstSize, firstFlavour);
    } else {
      // fallback for variants with no attributes
      setPrice(
        userInfo?.isPremium && defaultVariant?.premium_price
          ? defaultVariant.premium_price
          : defaultVariant.price
      );
      setProdPrice(
        userInfo?.isPremium && defaultVariant?.premium_price
          ? defaultVariant.premium_price
          : defaultVariant.price
      );
      setStrikePrice(defaultVariant.strike_price);
      setPremiumPrice(defaultVariant.premium_price);
    }

    // show bulk pricing if exists
    setBulkPData(defaultVariant?.bulk_pricings);
    setShowBulkPrice(!!defaultVariant?.bulk_pricings?.length);
  }, [userInfo, productDetail]);

  // useEffect(() => {
  //   if (!productDetail?.variants?.length) return;

  //   const defaultVariant =
  //     productDetail.variants.find((v) => v.primary_attribute) ||
  //     productDetail.variants[0];

  //   const firstFlavour = defaultVariant.primary_attribute?.value;
  //   const firstSize = defaultVariant.secondary_attribute?.value?.[0];

  //   if (firstFlavour && firstSize) {
  //     setselectedFlavour(firstFlavour);
  //     setSelectedSize(firstSize);

  //     // ✅ this ensures price comes from weights_pricing on first load
  //     handleSizeSelection(firstSize, firstFlavour);
  //   }
  // }, [userInfo, productDetail]);

  // useEffect(() => {
  // variantHandler(productDetail?.variants[0]);
  // }, [userInfo, productDetail, variantHandler]);

  const updateProdPriceByQuantity = useCallback(() => {
    if (bulkPData?.length > 0) {
      const bulkPricing = bulkPData.find(
        (item) => quantity >= item.from && quantity <= item.to
      );
      if (bulkPricing) {
        const newPrice = userInfo?.isPremium
          ? bulkPricing.premium_price
          : bulkPricing.price;
        setProdPrice(newPrice);
      } else {
        const defaultPrice = userInfo?.isPremium
          ? variantDetails?.premium_price
          : variantDetails?.price;
        setProdPrice(defaultPrice);
      }
    }
  }, [quantity, bulkPData, userInfo, variantDetails]);

  useEffect(() => {
    updateProdPriceByQuantity();
  }, [quantity, bulkPData, updateProdPriceByQuantity]);

  useEffect(() => {
    snap?.wishListProducts?.forEach((m) => {
      if (m?.productId === productDetail?.productId) {
        setWishlisted(true);
      }
    });
  }, [snap, productDetail]);

  const wishlistHandler = useCallback(
    (productId, productName, thumbnail, price, selectedVariant) => {
      const isProductInWishlist = webState?.wishListProducts?.some(
        (product) => product.productId === productId
      );
      if (isProductInWishlist) {
        webState.wishListProducts = webState.wishListProducts.filter(
          (product) => product.productId !== productId
        );
        setWishlisted(false);
      } else {
        const data = {
          productId,
          productName,
          thumbnail,
          price,
          selectedVariant,
        };

        webState.wishListProducts.push(data);
        setWishlisted(true);
      }
    },
    [wishlisted]
  );

  useEffect(() => {
    setWishlisted(null);
  }, [productDetail]);

  useEffect(() => {
    // if (bulkPData[0]?.from >= selectedProdPrice <= bulkPData[0]?.to) {
    if (bulkPData[0]?.from >= quantity && quantity <= bulkPData[0]?.to) {
      setProdPrice(bulkPData[0].price);
    }
  }, []);

  const handleSizeSelection = (size, flavour) => {
    const variant = productDetail?.variants?.find(
      (v) => v.primary_attribute?.value === flavour
    );

    if (!variant) return;

    // Try to match weight pricing
    const selectedWeightPricing = variant.weights_pricing?.find(
      (w) => w.weight === size
    );

    if (selectedWeightPricing) {
      setProdPrice(
        userInfo?.isPremium && selectedWeightPricing?.premium_price
          ? selectedWeightPricing.premium_price
          : selectedWeightPricing.price
      );
      setStrikePrice(selectedWeightPricing.strike_price);
      setPremiumPrice(selectedWeightPricing.premium_price);
      const updatedVariant = {
        ...variant,
        selectedWeight: selectedWeightPricing,
      };

      setVariantDetails(updatedVariant);
      setSelectedVariant(updatedVariant);
    } else {
      // fallback to base variant
      setProdPrice(
        userInfo?.isPremium && variant?.premium_price
          ? variant.premium_price
          : variant.price
      );
      setStrikePrice(variant.strike_price);
      setPremiumPrice(variant.premium_price);
      setVariantDetails(variant);
      setSelectedVariant(variant);
    }

    setSelectedSize(size);
  };
  // console.log("Selected Variant", selectedVariant);
  // console.log("selectedFlavour", selectedFlavour);
  // console.log("SelctedWeights", selectedVariant?.selectedWeight);

  const handleProductAction = useCallback(
    async (
      actionType, // "addtocart" or "buynow"
      productId,
      productName,
      thumbnail,
      quantity,
      variName,
      prodPrice,
      shippingPrice,
      shipping,
      resellengPrice,
      selectedVariant,
      cod,
      coupon
    ) => {
      if (
        selectedVariant?.quantity > 0 ||
        selectedVariant?.primary_attribute !== null
      ) {
        const data = {
          productId,
          productName,
          thumbnail,
          quantity,
          variName,
          prodPrice: Number(prodPrice),
          shippingPrice: shippingPrice || 0,
          shipping_type: shipping,
          resellengPrice,
          selectedVariant,
          selectedWeight: selectedVariant?.selectedWeight || null, // ✅ include selected weight
          selectedFlavour: selectedFlavour || null,
          cod,
          coupon,
          isResellerOrder: showResellerInput,
        };

        console.log("Buy Now Data:", data);

        if (actionType === "addtocart") {
          // webState.purhcaseType = "addtocart";
          // webState.cartProducts?.push(data);
          // SuccessAlert("Added to cart");

          const cartData = {
            VariantId: selectedVariant?.id,
            quantity: +quantity,
            selectedWeightId: selectedVariant?.selectedWeight?.id || null,
          };

          if (snap.loggedinUserData) {
            if (!webState.loggedinUserData) {
              webState.showFlipModal = true;
              return;
            }

            try {
              const res = await postHandlerWithToken("cart/add", cartData);
              if (res?.status === 200) {
                addToCartEvent();
                // SuccessAlert("Added to cart");
                window.location.reload();
                webState.refreshCartItems = true;
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            webState.showFlipModal = true;
          }
        } else if (actionType === "buynow") {
          initiateCheckoutEvent();
          webState.purhcaseType = "buynow";
          webState.buyNowProduct = data;
          webState.showCheckoutModal = true;
        }
      } else {
        FailureAlert("Product Out Of Stock");
      }
    },
    [showResellerInput, snap.cartProducts, selectedVariant]
  );

  const resellingPriceHandler = useCallback(
    (newPrice) => {
      const price = userInfo?.isPremium
        ? selectedVariant?.premium_price
        : selectedVariant?.price;
      if (newPrice >= price) {
        setResellingPrice(newPrice);
      }
    },
    [userInfo, selectedVariant]
  );

  // const handleShareClick = useCallback(async (id) => {
  //   const res = await shareProduct(id);
  //   if (res?.status === 200) {
  //     navigator.clipboard.writeText(window.location.href);
  //     SuccessAlert("Url Has Been Copied");
  //   }
  // }, []);

  const handleShareClick = useCallback(async (id) => {
    try {
      const res = await shareProduct(id);
      // console.log(res);
      if (res?.status === 200) {
        const url = window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
          SuccessAlert("URL has been copied to clipboard!");
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand("copy");
            SuccessAlert("URL has been copied to clipboard!");
          } catch (err) {
            console.error("Fallback: Unable to copy", err);
            FailureAlert("Failed to copy URL. Please copy manually.");
          }
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error("Error sharing the product:", error);
      FailureAlert("Failed to share the product.");
    }
  }, []);

  const handleEnquireClick = useCallback((productId) => {
    webState.singleProductId = productId;
    webState.showEnquireNowModal = true;
  }, []);

  useEffect(() => {
    const data = variantDetails?.bulk_pricings?.find(
      (item) => item?.from <= quantity && item?.to >= quantity
    );
    if (data && showResellerInput) {
      setProdPrice(userInfo?.isPremium ? data?.premium_price : data?.price);
    }
  }, [quantity, bulkPData, variantDetails, showResellerInput, userInfo]);

  const premiumPlanHandler = useCallback(() => {
    if (snap?.premiumPlansData > 0) {
      webState.premiumPlans = true;
    }
    1;
  }, [snap?.premiumPlansData]);

  const finalDifference = useMemo(() => {
    const percentageDifference =
      ((strikePrice - prodPrice) / strikePrice) * 100;
    return percentageDifference?.toFixed(2);
  }, [strikePrice, prodPrice]);

  const redireToWhatsapp = useCallback((data) => {
    const productName = data?.name;
    const productPrice = data?.variants[0]?.price;
    const link = `https://wa.me/+91${snap?.brandInfo?.whatsapp_number}?text=I am interested in your product ${productName} with a price of ₹ ${productPrice}`;
    window.open(link, "_blank");
  }, []);

  const redireToWhatsAppPhone = useCallback((data) => {
    const productName = data?.name;
    const productPrice = data?.variants[0]?.price;
    const link = `https://wa.me/+91${snap?.brandInfo?.whatsapp_number}?text=I am interested in your product ${productName} with a price of ₹ ${productPrice}`;
    window.open(link, "_blank");
    window.location.href = link;
  }, []);

  return (
    // <Container className="w-full ">
    <div className="w-full px-2 lg:p-0 mt-3 lg:mt-0">
      <div className="w-full flex flex-col gap-2 lg:min-w-2/5 mx-auto lg:mb-0 lg:justify-center">
        {/* Name, Price & Rating */}
        <PricingSection
          data={productDetail}
          prodPrice={prodPrice ?? (productDetail?.variants?.[0]?.price || 0)}
          strikePrice={strikePrice}
          finalDifference={finalDifference}
          premiumPrice={premiumPrice}
          wishlisted={wishlisted}
          variantDetails={variantDetails}
          selectedVariant={selectedVariant}
          wishlistHandler={wishlistHandler}
          premiumPlanHandler={premiumPlanHandler}
          price={price}
          storeType={storeType}
          handleShareClick={handleShareClick}
          info={info}
          rating={rating}
        />
        {/* <ProductDetailContainer> */}
        {/* {productDetail?.variants?.length > 0 ? (
          <>
          </>
        ) : null} */}

        {productDetail?.variants?.some((v) => v.primary_attribute) ? (
          <div className="flex flex-col mt-3">
            <div className="text-neutral-800 text-sm lg:text-base font-semibold leading-tight">
              Flavolur{" "}
              <span className="text-sm">
                {selectedFlavour ? `: (${selectedFlavour})` : ""}
              </span>
            </div>
            <div className="flex gap-3 flex-wrap mt-1">
              {[
                ...new Map(
                  productDetail.variants
                    .filter((v) => v.primary_attribute)
                    .map((v) => [v.primary_attribute?.value, v])
                ).values(),
              ].map((variant) => (
                <div
                  key={variant?.id}
                  onClick={() => {
                    const flavour = variant.primary_attribute.value;
                    const defaultSize = variant.secondary_attribute.value[0];

                    setselectedFlavour(flavour);
                    setSelectedSize(defaultSize);
                    handleSizeSelection(defaultSize, flavour); // ✅ Pass fresh values
                  }}
                  className={`rounded-md border px-4 py-2  cursor-pointer  flex items-center justify-center hover:bg-themecolor hover:text-white  ${
                    selectedFlavour === variant.primary_attribute.value
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  <div
                    className="text-center text-xs font-normal leading-normal "
                    style={{
                      backgroundColor: variant?.primary_attribute?.hex_code,
                    }}
                  >
                    {" "}
                    {variant.primary_attribute.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-3 text-gray-600 text-sm lg:text-xs font-medium leading-tight">
              Variants
            </div>
            <div className=" flex items-start  flex-wrap gap-3 w-full">
              {productDetail?.variants?.map((item) => {
                return (
                  <VariantBox
                    key={item?.id}
                    item={item}
                    variantDetails={variantDetails}
                    variantHandler={variantHandler}
                  />
                );
              })}
            </div>
          </>
        )}

        {selectedFlavour &&
          (() => {
            const filteredVariants = productDetail.variants?.filter(
              (v) => v.primary_attribute?.value === selectedFlavour
            );

            const sizes = filteredVariants
              .map((v) => v.secondary_attribute?.value)
              .flat()
              .filter(Boolean);

            return sizes.length > 0 ? (
              <div className="flex flex-col mt-3">
                <div className="text-neutral-800 text-sm lg:text-base font-semibold leading-tight">
                  Weights{" "}
                  <span className="text-sm">
                    {selectedSize ? `: (${selectedSize})` : ""}
                  </span>
                </div>
                <div className="flex gap-3 flex-wrap mt-1">
                  {sizes.map((size, index) => (
                    <span
                      key={index}
                      onClick={() => handleSizeSelection(size, selectedFlavour)}
                      className={`rounded-md border px-4 border-gray-300 cursor-pointer px-2 py-2 flex items-center justify-center ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      <span className="text-center text-xs font-normal leading-normal">
                        {size}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

        {/* BULK QUANTITY PRICING */}
        {showBulkPrice && bulkPData?.length > 0 && (
          <BulkPricingSection
            bulkPData={bulkPData}
            showBulkPriceChart={showBulkPriceChart}
            setShowBulkPriceChart={setShowBulkPriceChart}
          />
        )}
        {/* Reselling Section */}
        <ResellingSection
          storeType={storeType}
          showResellerInput={showResellerInput}
          setShowReselerInput={setShowReselerInput}
          resellengPrice={resellengPrice}
          resellingPriceHandler={resellingPriceHandler}
          price={price}
          quantity={quantity}
          variantDetails={variantDetails}
          prodPrice={prodPrice}
        />
        {/* Buttons Section */}
        <Buttons
          productDetail={productDetail}
          quantity={quantity}
          setQuantity={setQuantity}
          storeType={storeType}
          variantDetails={variantDetails}
          selectedVariant={selectedVariant}
          prodPrice={prodPrice}
          resellengPrice={resellengPrice}
          showResellerInput={showResellerInput}
          info={info}
          Enquiry={Enquiry}
          handleProductAction={handleProductAction}
          Bag={Bag}
          redireToWhatsapp={redireToWhatsapp}
          handleEnquireClick={handleEnquireClick}
          bulkPData={bulkPData}
        />
        {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
          storeType
        ) && (
          <div className="w-full mt-4 flex lg:hidden">
            <SecoundaryButton
              action={() =>
                handleProductAction(
                  "buynow", // actionType for buy now
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
                  productDetail?.coupons
                )
              }
              id={variantDetails}
              Icon={ShoppingBag} // Assuming Bag is the icon for the button
              title="Buy Now"
            />
          </div>
        )}
        <div className="w-full flex lg:hidden gap-3">
          <div className="w-full">
            {productDetail?.enquiry_enabled &&
              ["B2B", "WHATSAPP"].includes(storeType) && (
                <div className="w-full cursor-pointer">
                  {storeType === "WHATSAPP" ? (
                    <ActionButtons
                      action={() => redireToWhatsAppPhone(info)}
                      Icon={IoLogoWhatsapp}
                      title={"Whatsapp To Buy"}
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
          </div>
        </div>
        {["RESELLER-ECOMMERCE", "ECOMMERCE", "E-COMMERCE"].includes(
          storeType
        ) && (
          <div className="w-full mt-1 flex lg:hidden">
            <div
              className={` flex items-center justify-center gap-2 w-full h-[60px] lg:h-[47px] px-6 rounded-md border-gray-300 bg-white text-base cursor-pointer border text-black`}
              onClick={() =>
                handleProductAction(
                  "addtocart",
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
        )}
        <div className="w-full mt-4 max-h-[400px]">
          {productDetail?.coupons?.length > 0 && (
            <Coupons productDetail={productDetail} />
          )}
        </div>
        <div
          className={` ${
            window.location.host?.includes("astitvadesigns") && "hidden"
          } `}
        >
          <Guarrenties />
        </div>
        <div className="pt-4">
          <Guarantees showText={true} />
        </div>
        {/* </ProductDetailContainer> */}
      </div>
    </div>
    // </Container>
  );
};

export default Details;

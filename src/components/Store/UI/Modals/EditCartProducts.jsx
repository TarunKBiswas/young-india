/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import { useEffect } from "react";
import SimpleModal from "../../../Admin/Modals/SimpleModal";

const EditCartProducts = () => {
  const snap = useSnapshot(webState);
  const data = snap.cartProducts;

  const storeType = snap.storeInfo?.store_type;
  // console.log(storeType);

  const userInfo = snap?.userData?.data;

  const productDetail = data?.find(
    (product) => product?.productId === snap.selectCartProduct
  );

  const [prodPrice, setProdPrice] = useState(
    parseInt(productDetail?.prodPrice)
  );

  const [prodQuantity, setProdQuantity] = useState(productDetail?.quantity);

  const [prodResellingPrice, setProdResellingPrice] = useState(
    productDetail?.resellengPrice
  );

  const [variantDetails, setVariantDetails] = useState(null);

  const closeModalHandler = () => {
    webState.showEditCartProduct = false;
  };

  const incrementQuantity = () => {
    setProdQuantity(prodQuantity + 1);
  };

  const decrementQuantity = () => {
    if (prodQuantity > 1) {
      setProdQuantity(prodQuantity - 1);
    }
  };

  const resellingPriceHandler = (newPrice) => {
    setProdResellingPrice(newPrice);
  };

  const variantHandler = (data) => {
    setVariantDetails(data);
    setProdPrice(data?.prodPrice);
  };

  useEffect(() => {
    variantHandler(productDetail);
  }, [productDetail]);

  useEffect(() => {
    const updateProdPrice = () => {
      let data = variantDetails?.selectedVariant?.bulk_pricings?.find(
        (item) => item?.from <= prodQuantity && item?.to >= prodQuantity
      );

      if (data) {
        setProdPrice(
          userInfo?.isPremium && data?.premiumPrice
            ? data?.premiumPrice
            : data?.price
        );
      } else if (variantDetails?.price) {
        setProdPrice(userInfo.isPremium ? prodPrice : variantDetails?.price);
      } else {
        setProdPrice(
          userInfo?.isPremium
            ? prodPrice
            : variantDetails?.selectedVariant?.price
        );
      }
    };
    updateProdPrice();
  }, [prodQuantity, variantDetails]);

  const saveChanges = () => {
    webState.cartProducts = webState.cartProducts.map((product) => {
      if (product.productId === webState.selectCartProduct) {
        const updatedProduct = {
          ...product,
          quantity: prodQuantity,
          prodPrice,
          resellengPrice: prodResellingPrice,
        };
        return updatedProduct;
      }
      return product;
    });
    closeModalHandler();
  };

  const thumbnailUrl = productDetail?.thumbnail;

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-xl"}>
      <div className="w-full rounded-md flex-col items-center gap-3 px-4 pb-6 h-auto ">
        <div className="flex flex-col items-center md:items-start md:flex-row w-full bg-white gap-2">
          <div className="w-1/3 h-full md:w-[50%] items-center md:items-start overflow-hidden lg:aspect-none">
            <img
              className="object-cover lg:h-[250px] w-full rounded"
              src={thumbnailUrl}
              width={"auto"}
              height={"auto"}
              alt="image"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center md:items-start px-2 gap-2">
            <div className="w-full flex items-center  md:items-start justify-start mt-2">
              <span className=" text-themecolor text-base font-medium capitalize">
                {productDetail?.productName}
              </span>
            </div>
            <div className="flex flex-col justify-center md:items-start mt-2 gap-2 w-full ">
              <div className="flex flex-col items-start justify-around gap-2">
                <span className="text-xs lg:text-sm">
                  Price: ₹
                  {Number(parseInt(productDetail?.prodPrice)).toFixed(2)}
                </span>
                <span className="text-xs lg:text-sm">
                  Variant : {productDetail?.variName}
                </span>
              </div>

              {productDetail?.resellengPrice && (
                <span className="text-sm">
                  Reselling Price: ₹
                  {Number(productDetail?.resellengPrice)?.toFixed(2)}
                </span>
              )}

              {storeType === "RESELLER-ECOMMERCE" && (
                <div className="w-full">
                  <input
                    type="text"
                    className=" w-full focus:ring-0 outline-none text-sm border-gray-200 rounded"
                    placeholder="Reselling Price"
                    value={prodResellingPrice}
                    onChange={(e) => resellingPriceHandler(e.target.value)}
                  />

                  {prodResellingPrice < parseInt(productDetail?.prodPrice) ? (
                    <p className="text-[10px] text-red-500 capitalize">
                      Reselling Price needs to be grater than product price
                    </p>
                  ) : null}
                </div>
              )}

              <div className="flex mt-3 items-center justify-between w-full gap-1">
                <div className="flex items-center border gap-4 border-black px-2 h-8 text-xs lg:px-5 lg:h-10 lg:text-sm">
                  <div
                    onClick={decrementQuantity}
                    className="bg-themecolor text-white font-semibold rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </div>
                  <span className="text-black font-normal">{prodQuantity}</span>
                  <div
                    onClick={incrementQuantity}
                    className="bg-themecolor text-white font-semibold rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </div>
                </div>
                <button
                  onClick={saveChanges}
                  disabled={
                    prodResellingPrice > 0
                      ? prodResellingPrice <=
                          parseInt(productDetail?.prodPrice) &&
                        prodResellingPrice?.length !== 0
                      : false
                  }
                  className={`${
                    prodResellingPrice > 0
                      ? prodResellingPrice <= productDetail?.prodPrice &&
                        prodResellingPrice?.length !== 0
                      : false
                      ? "disabled cursor-not-allowed"
                      : "cursor-pointer"
                  } bg-themecolor text-white px-3 h-8 text-xs lg:px-5 lg:h-10 lg:text-sm rounded`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default EditCartProducts;

/* eslint-disable react/prop-types */
import { useState } from "react";
import SimpleModal from "../../../Admin/Modals/SimpleModal";
import { putHandlerWithToken } from "../../../../utils/Store/ApiCalls";
import { FailureAlert } from "../../../Toast";
import { webState } from "../../../../data/webStates";
// import { useSnapshot } from "valtio";

const EditCartApiModal = ({ setShowEditModal, data }) => {
  console.log(data);
  //   const snap = useSnapshot(webState);

  const [prodQuantity, setProdQuantity] = useState(data?.CartVariant?.quantity);

  const incrementQuantity = () => {
    setProdQuantity(prodQuantity + 1);
  };

  const decrementQuantity = () => {
    if (prodQuantity > 1) {
      setProdQuantity(prodQuantity - 1);
    }
  };

  const clickHandler = async () => {
    const body = {
      quantity: prodQuantity,
      VariantId: data?.CartVariant?.VariantId,
    };
    try {
      const res = await putHandlerWithToken("cart/update", body);

      if (res.status === 200) {
        webState.refreshCartItems = true;
        window.location.reload();
        setShowEditModal(false);
        // SuccessAlert("Product Count Update");
      } else {
        FailureAlert("Product Count Not Update");
      }
    } catch (error) {
      console.log(error);
    } finally {
      webState.refreshCartItems = false;
      setShowEditModal(false);
    }
  };

  return (
    <SimpleModal
      closeModalHandler={() => setShowEditModal(!setShowEditModal)}
      modalSize={"max-w-xl"}
    >
      <div className="w-full rounded-md p-4 flex flex-col items-center md:items-start md:flex-row bg-white gap-4">
        <div className="w-1/3 items-center md:items-start overflow-hidden lg:aspect-none">
          <img
            className="object-cover w-full rounded"
            src={data?.product?.thumbnail?.url}
            width={"auto"}
            height={"auto"}
            alt={data?.product?.name}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center md:items-start gap-2">
          <div className="flex flex-col justify-center md:items-start gap-2 w-full ">
            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-col">
                <span className="text-themecolor text-base lg:text-xl w-full truncate font-medium capitalize">
                  {data?.product?.name}
                </span>
                <span className="text-xs lg:text-base font-semibold">
                  Price: ₹{Number(parseInt(data?.price)).toFixed(2)}
                </span>
              </div>
              <span className="text-xs lg:text-sm">Variant : {data?.name}</span>
            </div>

            {/* {productDetail?.resellengPrice && (
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
              )} */}

            <div className="flex mt-3 items-center justify-between w-full gap-1">
              <div className="flex items-center border gap-4 border-black px-2 h-8 text-xs lg:px-2 lg:h-10 lg:text-sm">
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
            </div>
            <div className="flex w-full justify-end items-center">
              <div
                onClick={clickHandler}
                className="bg-themecolor cursor-pointer text-white px-3 flex items-center justify-center text-xs lg:px-5 lg:h-10 lg:text-sm rounded"
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default EditCartApiModal;

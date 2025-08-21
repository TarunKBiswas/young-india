/* eslint-disable react/prop-types */
import { webState } from "../../../data/webStates";
import { useNavigate } from "react-router-dom";
import Edit from "../UI/Icon/Edit";
import Delete from "../UI/Icon/Delete";
import { deleteHandlerWithToken } from "../../../utils/Store/ApiCalls";
import { useState } from "react";
import DeleteModalLayout from "../../Admin/Modals/DeleteModalLayout";
import { SuccessAlert } from "../../Toast";
import { useSnapshot } from "valtio";
import EditCartApiModal from "../UI/Modals/EditCartApiModal";

const CartProductCard = ({ data }) => {
  const snap = useSnapshot(webState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };
  const openEditModal = () => {
    setShowEditModal(true);
  };
  // const deleteItemHandler = async (id) => {
  //   closeModalHandler();

  //   try {
  //     const res = await deleteHandlerWithToken("cart/remove", id);
  //     if (res?.status === 200) {
  //       SuccessAlert("Item Removed From Cart");
  //       // webState.cartItems = snap.cartItems.filter((item) => item.id !== id);
  //       webState.cartItems = [
  //         ...snap.cartItems.filter((item) => item.id !== id),
  //       ];

  //       webState.refreshCartItems = true;
  //       console.log("Updated Cart Items:", webState.cartItems);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteItemHandler = async (id) => {
    const updatedCart = snap.cartItems.filter((item) => item.id !== id);
    webState.cartItems = [...updatedCart];
    try {
      const res = await deleteHandlerWithToken("cart/remove", id);
      if (res?.status === 200) {
        closeModalHandler();
        SuccessAlert("Item Removed From Cart");
      } else {
        throw new Error("Failed to delete item.");
      }
    } catch (error) {
      console.log(error);
      webState.cartItems = [...snap.cartItems];
    }
  };

  const closeModalHandler = () => {
    setShowDeleteModal(false);
  };

  const productDetailHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const thumbnailUrl = data?.product?.thumbnail?.url;
  // console.log(data);
  return (
    <div className="flex flex-col rounded-lg gap-3 overflow-hidden w-full capitalize px-2.5 lg:px-0 shadow-sm lg:h-[160px] border">
      <div className="flex w-full gap-2 h-full">
        <div
          className="w-1/3 lg:w-1/6 h-full relative"
          onClick={() => productDetailHandler(data?.ProductId)}
        >
          <img
            className="object-cover object-top w-full h-full lg:w-32 cursor-pointer"
            src={data?.productData?.thumbnail?.url}
            width={"auto"}
            height={"auto"}
            alt="image"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <div className="w-full flex items-center justify-between">
              <span className="flex text-neutral-800 text-base lg:text-xl font-semibold w-full">
                {data?.product?.name?.length > 38
                  ? `${data?.product?.name?.substring(0, 38)}...`
                  : data?.product?.name?.substring(0, 20)}
              </span>

              <div className="flex gap-3">
                <Edit
                  className="h-5 w-5 cursor-pointer text-themebg-themecolor/70 hover:scale-90 transition-all duration-200"
                  onClick={() => openEditModal()}
                />
                <Delete
                  className="h-5 w-5 text-themebg-themecolor/70 cursor-pointer hover:scale-90 transition-all duration-200"
                  onClick={() => handleDelete(data?.CartVariant?.VariantId)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-1 w-full justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="text-xs w-full lg:text-sm ">
                <span className="w-full flex text-themebg-themecolor/70 text-sm font-medium leading-normal ">
                  Product Name :
                  <span className="px-2">
                    {data?.productData?.name}
                  </span>
                </span>
              </div>
              <div className="text-xs w-full lg:text-sm ">
                <span className="w-full flex text-themebg-themecolor/70 text-sm font-medium leading-normal ">
                  Variant :
                  <span className="px-2">
                    {data?.name}{" "}
                    {data?.CartVariant?.selectedWeightId && (
                      <span className="">
                        ( {data?.CartVariant?.selectedWeight?.weight} )
                      </span>
                    )}
                  </span>
                </span>
              </div>
              <div className="text-xs w-full lg:text-sm ">
                <span className="w-full flex text-themebg-themecolor/70 text-sm font-medium leading-normal ">
                  Quantity :
                  <span className="px-2">{data?.CartVariant?.quantity}</span>
                </span>
              </div>

              <span className="text-themebg-themecolor/70 text-sm font-medium leading-normal">
                {"Price: ₹ "}
                <span className="text-xs lg:text-sm">
                  { !data?.CartVariant?.selectedWeightId ? Number(data?.price).toFixed(2) :
                    Number(data?.CartVariant?.selectedWeight?.price).toFixed(2)}
                </span>
              </span>

              <span className="text-themebg-themecolor/70 text-base font-semibold leading-normal">
                {"Total Price: ₹ "}
                <span className="text-xs lg:text-sm">
                  { !data?.CartVariant?.selectedWeightId ? Number(data?.price).toFixed(2) * data?.CartVariant?.quantity : Number(data?.CartVariant?.selectedWeight?.price).toFixed(2) * data?.CartVariant?.quantity}
                </span>
              </span>
              {data?.resellengPrice && (
                <span className="text-themebg-themecolor/70 text-sm font-medium leading-normal w-full flex">
                  {"Reselling Price: "}
                  <span className="text-themebg-themecolor/70 text-xs flex items-center mt-0.5 px-1 justify-center lg:text-sm font-medium ">
                    ₹ {Number(data?.resellengPrice)?.toFixed(2)}
                  </span>
                </span>
              )}
            </div>

            {!data?.product?.cod_enabled && (
              <span className="inline-flex items-center max-h-max px-2.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium ">
                COD Not Available
              </span>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModalLayout
          confirmMsg={"Are you Sure?"}
          msg={"You want to remove this item"}
          closeModalHandler={closeModalHandler}
          action={() => deleteItemHandler(selectedId)}
          btnText={"Delete"}
        />
      )}

      {showEditModal && (
        <EditCartApiModal setShowEditModal={setShowEditModal} data={data} />
      )}
    </div>
  );
};

export default CartProductCard;

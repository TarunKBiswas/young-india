/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { webState } from "../../../../data/webStates";
// import { AiOutlineLeft } from "react-icons/ai";
import OrderCardButton from "./OrderCardButton";
import { useState, useEffect } from "react";

const ConfirmModal = ({ open, onClose, onConfirm, message }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-sm mx-auto flex flex-col items-center">
        <p className="mb-6 text-center text-base">{message}</p>
        <div className="flex gap-4 w-full justify-center">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderProductCard = ({
  orders,
  singleInfo,
  setSingleInfo,
  handleCancelOrder,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const singleOrderHandler = (data) => {
    setSingleInfo(!singleInfo);
    webState.singleOrderData = data;
  };

  const openModal = (id) => {
    setSelectedOrderId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
  };

  const confirmCancel = () => {
    if (selectedOrderId) {
      handleCancelOrder(selectedOrderId);
      closeModal();
    }
  };

  return (
    <>
      {orders?.map((data, i) => {
        return (
          <div
            className="flex w-full bg-white border lg:h-[130px] gap-1"
            key={i}
          >
            <div className="w-1/3">
              <img
                width={"auto"}
                height={"auto"}
                alt="image"
                className="w-full h-full object-cover object-center"
                src={data?.variant?.product?.thumbnail?.url}
              />
            </div>

            <div className="w-2/3 lg:w-full p-2 flex flex-col justify-between">
              <div className="w-full flex flex-col gap-1">
                <h1 className="text-sm lg:text-base font-semibold leading-normal text-themecolor w-full max-w-[320px] truncate ">
                  {data?.variant?.product?.name}
                </h1>
                <div className="flex flex-row justify-between max-h-min">
                  <div className="flex flex-col w-full justify-between">
                    <h1 className="text-sm lg:text-base font-normal leading-normal text-themecolor">
                      Price : ₹ {  data?.selectedWeightId === null ? data?.variant?.price : data?.selectedWeight.price}
                    </h1>
                    {data.selectedWeightId === null ? (
                      <span className="text-themecolor text-xs  lg:text-sm font-normal leading-normal  ">
                        Variant : {data?.variant?.name}
                      </span>
                    ) : (
                      <div className="flex gap-4">
                      <span className="text-themecolor text-xs  lg:text-sm font-normal leading-normal  ">
                        Flavour :{" "}
                        {data?.variant.primary_attribute?.value || "No Flavour"}
                      </span>
                      <span className="text-themecolor text-xs  lg:text-sm font-normal leading-normal  ">
                        Weight :{" "}
                        {data?.selectedWeight.weight || "No Weight"}
                      </span>
                      </div>
                    )}
                  </div>
                  <div className="lg:hidden h-8 flex text-center bg-[#EFF6F2] text-[#4B865F] p-2 text-xs font-normal leading-tight">
                    {data?.status}
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div className="hidden lg:flex items-end justify-end h-full ">
                  <div className="flex text-center bg-[#EFF6F2] lg:h-8 text-[#4B865F] p-2 text-xs font-normal leading-tight">
                    {data?.status}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 lg:mt-0">
                  <OrderCardButton
                    func={() => singleOrderHandler(data)}
                    text={"Order Info"}
                    display
                  />

                  <OrderCardButton
                    func={() => singleOrderHandler(data)}
                    text={"Order Info"}
                  />
                  {data.status === "NEW" && handleCancelOrder && (
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded justify-center bg-themecolor/5 border lg:h-8 items-center gap-1.5  cursor-pointer"
                      onClick={() => openModal(data.id)}
                    >
                      <div className="text-center text-xs uppercase leading-tight tracking-wide">
                        Cancel Order
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <ConfirmModal
        open={modalOpen}
        onClose={closeModal}
        onConfirm={confirmCancel}
        message="Are you sure you want to cancel this order?"
      />
    </>
  );
};

export default OrderProductCard;

/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { AiOutlineLeft } from "react-icons/ai";
import PaymentSlip from "./PaymentSlip";
import HelpSupport from "./HelpSupport";
import { OrderButton } from "../../UI/Buttons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FailureAlert, SuccessAlert } from "../../../Toast";
import { useState } from "react";
import { cancelOrder } from "../../../../utils/Store/Setting";
import DeleteModalLayout from "../../../Admin/Modals/DeleteModalLayout";

const Singledata = ({ singleInfo, setSingleInfo }) => {
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const snap = useSnapshot(webState);
  const navigate = useNavigate();

  const data = snap.singleOrderData;
  // console.log(data);

  // console.log(data);

  const returnHandler = (data) => {
    if (data.variant.product.product_return === true) {
      webState.returnRequestModal = true;
      webState.returnRequestData = data;
    } else {
      FailureAlert("Return not available in this product");
    }
  };

  const goToProductHandler = (id) => {
    navigate("/product/" + id);
  };

  const calculateReturnDaysLeft = () => {
    const returnDays = data?.variant?.product?.return_days;
    const orderDate = moment(data?.updatedAt);
    const currentDate = moment();
    const diffInDays = currentDate.diff(orderDate, "days");
    return returnDays - diffInDays;
  };

  const returnDaysLeft = calculateReturnDaysLeft();

  const handleShowCancelOrder = (id) => {
    setSelectedId(id);
    setShowCancelOrder(!showCancelOrder);
  };

  const cancelOrderHandler = async () => {
    try {
      const res = await cancelOrder(selectedId);
      if (res.status === 200) {
        SuccessAlert("Order Cancelled");
        webState.refreshOrderList = true;
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addReviewModal = (id) => {
    console.log(id);
    webState.selectedID = id;
    webState.showAddReviewModal = true;
  };

  return (
    <div className="flex flex-col gap-2 w-full px-2  ">
      <div className="w-full border-b py-1.5 lg:py-3 flex gap-1.5 items-center ">
        <span
          className="text-sm flex items-center gap-0.5 lg:text-base  cursor-pointer"
          onClick={() => setSingleInfo(!singleInfo)}
        >
          <AiOutlineLeft />
          Back to orders
        </span>
      </div>
      <div className="w-full flex items-center justify-between  ">
        <span className="text-xs lg:text-sm text-[#222222]/70">
          ORDER ID
          <span className="text-xs text-themecolor lg:text-sm px-1">
            #{data?.order?.slug}
          </span>
        </span>
        <span className="text-xs lg:text-sm text-[#222222]/70">
          Date :
          <span className=" px-1 text-xs text-themecolor lg:text-sm">
            {moment(data?.createdAt).format("MMM Do YY")}
          </span>
        </span>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-3 w-full h-full ">
        <div className="flex w-full flex-col ">
          <div className="border border-[#222222]/20 mt-3 w-full p-3 flex gap-2.5 lg:gap-4 ">
            <div className="w-1/2 lg:w-[17vw] ">
              <img
                width={"auto"}
                height={"auto"}
                alt="image"
                // src={ data?.variant?.thumbnail?.url}
                src={data?.variant?.product?.thumbnail?.url}
                className="object-contain aspect-16/9"
                onClick={() => goToProductHandler(data?.variant?.ProductId)}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <div className="flex ">
                <div className="flex text-center bg-[#EFF6F2]  text-[#4B865F] p-2 text-xs font-normal leading-tight">
                  {data?.status}
                </div>
              </div>
              <h1 className="text-sm lg:text-base font-normal leading-normal text-themecolor">
                {data?.variant?.product?.name}
              </h1>
              <span className="text-themecolor text-xs lg:text-sm font-normal leading-normal">
                Variant : {data?.variant?.name}
              </span>
              <span className="text-themecolor text-xs lg:text-sm font-normal leading-normal">
                Price : {data?.variant?.price}
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-3 mb-4 cursor-pointer mt-3">
            {data?.status === "DELIVERED" && returnDaysLeft >= 0 ? (
              <OrderButton
                text={`Return Product (${returnDaysLeft} ${
                  returnDaysLeft > 1 ? "Days" : "Day"
                } left)`}
                className={`${
                  data?.status === "DELIVERED" ? "w-full" : "w-1/2"
                }`}
                action={() => returnHandler(data)}
              />
            ) : null}
            {data?.status === "DELIVERED" && (
              <OrderButton
                className={`${
                  data?.status === "DELIVERED" ? "w-full" : "w-full"
                }`}
                text={"Re-Order Product"}
                action={() => goToProductHandler(data?.variant?.ProductId)}
              />
            )}
            {/* {data?.status === "NEW" && "ACCEPTED" && (
              <div className="w-full flex flex-col gap-2 lg:flex-row">
                <button
                  className="w-full py-4 px-3.5 bg-red-600 text-white text-xs capitalize rounded hover:bg-red-600/70 transition duration-150"
                  onClick={() => handleShowCancelOrder(data?.id)}
                >
                  Cancel Order
                </button>
              </div>
            )} */}
            {data?.status === "DELIVERED" && (
              <div className="w-full flex flex-col gap-2 lg:flex-row">
                <button
                  className="w-full py-4 px-3.5 bg-themecolor text-white text-xs capitalize rounded transition duration-150"
                  onClick={() => addReviewModal(data?.variant?.ProductId)}
                >
                  Add Review
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-[35vw] lg:mt-4">
          <PaymentSlip data={data} />
          <HelpSupport data={data} />
        </div>
      </div>

      {showCancelOrder && (
        <DeleteModalLayout
          closeModalHandler={handleShowCancelOrder}
          action={cancelOrderHandler}
          confirmMsg={"Cancel Order?"}
          btnText={"Confirm"}
          msg={"Are you sure you want to Cancle this Order?"}
        />
      )}
    </div>
  );
};

export default Singledata;

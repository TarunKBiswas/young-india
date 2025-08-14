/* eslint-disable react/prop-types */
import { useEffect } from "react";
import ActionPanelButton from "./ActionPanelButton.jsx";
import { state } from "../../../data/state.js";

const ActionPanel = (props) => {
  // console.log(props);
  let status = props?.orderData?.status;

  useEffect(() => {
    state.refreshOrdersDetails = true;
  }, [status]);

  const orderAcceptHandler = (id) => {
    state.selectedOrderID = id;
    state.acceptOrderModal = true;
  };

  const rejectOrderHandler = (id) => {
    state.selectedOrderID = id;
    state.rejectOrderModal = true;
  };

  const shipNowHandler = (data) => {
    state.selectedOrderID = data;
    // state.showShipRocketModal = true;
    state.showShipNowModal = true;
  };

  const markAsDeliveredHandler = (id) => {
    state.selectedOrderID = id;
    state.markAsDeliveredModal = true;
  };

  // const markAsRTOHandler = (id) => {
  //   state.selectedOrderID = id;
  //   state.showRtoModal = true;
  // };

  const payoutHandler = (id) => {
    state.selectedOrderID = id;
    state.payoutModal = true;
  };

  const accepetReturnReqHandler = (id) => {
    state.selectedOrderID = id;
    state.acceptReturnReqModal = true;
  };

  const rejectReturnReqHandler = (id) => {
    state.selectedOrderID = id;
    state.rejecteReturnReqModal = true;
  };

  return (
    <div className="flex justify-end gap-2 w-full mt-2">
      {status === "NEW" ? (
        <>
          <button
            className="py-2.5 px-3.5 text-red-500 border text-xs capitalize rounded hover:bg-red-100 transition duration-150"
            onClick={() => rejectOrderHandler(props.orderData?.id)}
          >
            Reject
          </button>
          <button
            className="py-2.5 px-3.5 bg-[#222222] text-white text-xs capitalize rounded hover:bg-[#222222]/70 transition duration-150"
            onClick={() => orderAcceptHandler(props.orderData?.id)}
          >
            Accept
          </button>
        </>
      ) : null}

      {status === "ACCEPTED" ? (
        <ActionPanelButton
          name={"Ship now"}
          action={() => shipNowHandler(props.orderData)}
        />
      ) : null}

      {status === "DECLINED" ? (
        <ActionPanelButton name={"Order Rejected"} status={status} />
      ) : null}
      {status === "CANCELLED" ? (
        <ActionPanelButton name={"Order Cancelled"} status={status} />
      ) : null}

      {status === "INTRANSIT" ? (
        <>
          <ActionPanelButton
            name={"Mark Delivered"}
            action={() => markAsDeliveredHandler(props.orderData?.id)}
          />
          {/* <button
            className="py-2.5 px-3.5 bg-red-500 text-white text-xs capitalize rounded hover:bg-red-800 transition duration-150"
            onClick={() => markAsRTOHandler(props.orderData?.id)}
          >
            RTO
          </button> */}
        </>
      ) : null}

      {status === "DELIVERED" &&
      props.orderData?.order?.is_reseller_order &&
      props.orderData?.order?.payment_mode === "COD" ? (
        <ActionPanelButton
          name={"Payout"}
          action={() => payoutHandler(props.orderData?.id)}
        />
      ) : null}

      {status === "RETURN_REQUEST" ? (
        <>
          <button
            className="py-2.5 px-3.5 bg-red-500 text-white text-xs capitalize rounded hover:bg-red-800 transition duration-150"
            onClick={() => rejectReturnReqHandler(props.orderData?.id)}
          >
            Reject
          </button>
          <button
            className="py-2.5 px-3.5 bg-[#222222] text-white text-xs capitalize rounded hover:bg-[#222222]/70 transition duration-150"
            onClick={() => accepetReturnReqHandler(props.orderData)}
          >
            Accept
          </button>
        </>
      ) : null}

      {status === "RETURN_ACCEPTED" ? (
        <ActionPanelButton name={"Return Accepted"} />
      ) : null}

      {status === "RETURN_DECLINED" ? (
        <ActionPanelButton name={"Return Declined"} />
      ) : null}

      {status === "RETURN_RECEIVED" ? (
        <ActionPanelButton name={"Return Recived"} />
      ) : null}

      {status === "RETURN_PENDING" ? (
        <ActionPanelButton name={"Return Pending"} />
      ) : null}
    </div>
  );
};

export default ActionPanel;

/* eslint-disable no-unused-vars */
import React from "react";
import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import { rejectOrder } from "../../../utils/Orders.js";
import { FailureAlert, InfoAlert } from "../../Toast.jsx";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const RejectOrderModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedOrderID;

  const rejectOrderHandler = async () => {
    state.rejectOrderModal = false;

    try {
      const res = await rejectOrder(id);

      if (res?.status === 200) {
        InfoAlert("Order Rejected");
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.rejectOrderModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={rejectOrderHandler}
      confirmMsg={"Reject Order"}
      btnText={"Reject"}
      msg={"Are you sure you really want to Reject this order?"}
    />
  );
};

export default RejectOrderModal;

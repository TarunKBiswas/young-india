/* eslint-disable no-unused-vars */
import React from "react";
import { state } from "../../../data/state.js";
import { acceptOrder } from "../../../utils/Orders.js";
import { useSnapshot } from "valtio";
import { SuccessAlert } from "../../Toast.jsx";
import { thankyouModalHandler } from "../../../utils/const_API.js";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const AcceptOrederModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedOrderID;

  const acceptOrderHandler = async () => {
    state.acceptOrderModal = false;

    try {
      let res = await acceptOrder(id);

      if (res?.status === 200) {
        thankyouModalHandler();
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
        state.refreshOrdersDetails = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.acceptOrderModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={acceptOrderHandler}
      confirmMsg={"Accept Order"}
      btnText={"Accept"}
      msg={"Are you sure you want to Accept this order?"}
      type={"accept"}
    />
  );
};

export default AcceptOrederModal;

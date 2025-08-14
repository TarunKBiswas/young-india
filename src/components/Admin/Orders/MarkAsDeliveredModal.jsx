import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import { markAsDelivered } from "../../../utils/Orders.js";
import { thankyouModalHandler } from "../../../utils/const_API.js";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const MarkAsDeliveredModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedOrderID;

  const modalHandler = () => {
    state.markAsDeliveredModal = false;
  };

  const submitHandler = async () => {
    try {
      let res = await markAsDelivered(id);
      if (res.status === 200) {
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
        state.refreshOrdersDetails = true;
        thankyouModalHandler();
        modalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.markAsDeliveredModal = false;
  };

  return (
    <>
      <DeleteModalLayout
        closeModalHandler={closeModalHandler}
        action={submitHandler}
        confirmMsg={"Mark As Delivered"}
        btnText={"Accept"}
        msg={"Are you sure you want to Mark as Delivered?"}
      />
    </>
  );
};

export default MarkAsDeliveredModal;

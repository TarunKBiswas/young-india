import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import { rejectReturnReq } from "../../../utils/Orders";
import DeleteModalLayout from "../Modals/DeleteModalLayout";

const RejectReturnRequestModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedOrderID;

  const rejectReturnReqHandler = async () => {
    closeModalHandler();

    try {
      await rejectReturnReq(id);
      state.refreshOrderStats = true;
      state.refreshOrdersList = true;
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.rejecteReturnReqModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={rejectReturnReqHandler}
      confirmMsg={"Reject Return Request"}
      btnText={"Confirm"}
      msg={"Are you sure you want to Reject Return Request?"}
    />
  );
};

export default RejectReturnRequestModal;

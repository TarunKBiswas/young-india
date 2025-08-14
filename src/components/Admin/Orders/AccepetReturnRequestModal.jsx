/* eslint-disable no-unused-vars */
import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import {
  accepetReturnReq,
  shipRocketReturnAccept,
} from "../../../utils/Orders";
import DeleteModalLayout from "../Modals/DeleteModalLayout";
import { SuccessAlert } from "../../Toast";

const AccepetReturnRequestModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedOrderID;
  console.log(id);

  const returnReqHandler = async () => {
    const data = {
      orderVariantId: id?.shipRocketOrderItem?.OrderVariantId,
      shipping_address:
        id?.shipRocketOrderItem?.shipRocketOrder?.pickup_location,
    };

    console.log(data);

    closeModalHandler();
    try {
      const res = await accepetReturnReq(id?.id);
      // console.log(res);
      if (res.status === 200) {
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
        let res2 = await shipRocketReturnAccept(data);
        // console.log(res2);
        if (res2?.status === 200) {
          SuccessAlert("Return request Accepted");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.acceptReturnReqModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={returnReqHandler}
      confirmMsg={"Return Request"}
      btnText={"Accept"}
      msg={"Are you sure you want to Accept Return Request?"}
    />
  );
};

export default AccepetReturnRequestModal;

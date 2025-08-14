import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import { thankyouModalHandler } from "../../../utils/const_API";
import { returnToOrigin } from "../../../utils/Orders";
import DeleteModalLayout from "../Modals/DeleteModalLayout";

const RtoModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedOrderID;

  const modalHandler = () => {
    state.showRtoModal = false;
  };

  const RtoHandler = async () => {
    modalHandler();

    try {
      let res = await returnToOrigin(id);
      if (res.status === 200) {
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DeleteModalLayout
      closeModalHandler={modalHandler}
      action={RtoHandler}
      confirmMsg={"Returned to origin"}
      btnText={"Confirm"}
      msg={"Are you sure you want to Returned to origin?"}
    />
  );
};

export default RtoModal;

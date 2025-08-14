import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import { deleteAddress } from "../../../../utils/Store/Address";
import { SuccessAlert } from "../../../Toast";
import DeleteModalLayout from "../../../Admin/Modals/DeleteModalLayout";

const DeletAddressModal = () => {
  const snap = useSnapshot(webState);
  const id = snap.selectedID;

  const closeModalHandler = () => {
    webState.showDeleteAddressModal = false;
  };

  const deleteAddressHandler = async () => {
    try {
      let res = await deleteAddress(id);

      if (res === true) {
        webState.showDeleteAddressModal = false;
        SuccessAlert("Address deleted successfully");
        webState.refreshAddressList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteAddressHandler}
      confirmMsg={"Delete Address?"}
      btnText={"Delete"}
      msg={"Are you sure you want to delete this Address?"}
    />
  );
};

export default DeletAddressModal;

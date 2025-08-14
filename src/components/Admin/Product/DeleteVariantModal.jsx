import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import DeleteModalLayout from "../Modals/DeleteModalLayout";
import { deleteVariant } from "../../../utils/Store/Products";
import { FailureAlert, SuccessAlert } from "../../Toast";

const DeleteVariantModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedVariantID;

  const closeModalHandler = () => {
    state.deleteVariantModal = false;
  };

  const deleteVariantHandler = async () => {
    state.showDeleteProductModal = false;
    try {
      const res = await deleteVariant(id);
      if (res === true) {
        state.refreshEditProductComponent = true;
        closeModalHandler();
        SuccessAlert("Variant deleted successfully");
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteVariantHandler}
      confirmMsg={"Delete Variant"}
      btnText={"Delete"}
      msg={"Are you sure you want to delete this variant"}
    />
  );
};

export default DeleteVariantModal;

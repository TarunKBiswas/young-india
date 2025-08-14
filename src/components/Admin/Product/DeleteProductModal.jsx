import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import { FailureAlert, SuccessAlert } from "../../Toast.jsx";
import { deleteProduct } from "../../../utils/productsAPI.js";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const DeleteProductModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedProdID;

  const deleteProductHandler = async () => {
    state.showDeleteProductModal = false;
    try {
      const res = await deleteProduct(id);

      if (res === true) {
        state.refreshProductList = true;
        SuccessAlert("product deleted successfully");
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  const closeModalHandler = () => {
    state.showDeleteProductModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteProductHandler}
      confirmMsg={"Delete Product"}
      btnText={"Delete"}
      msg={
        "Are you sure you want to delete this product? All record related to this product will be deleted as well. This action cannot be undone."
      }
    />
  );
};

export default DeleteProductModal;

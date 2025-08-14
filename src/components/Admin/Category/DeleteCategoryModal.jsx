/* eslint-disable no-unused-vars */
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import { FailureAlert, SuccessAlert } from "../../Toast.jsx";
import { deleteCategory } from "../../../utils/categoryAPI.js";
import { thankyouModalHandler } from "../../../utils/const_API.js";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const DeleteCategoryModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedCatID;

  const deleteHandler = async () => {
    state.showDeleteCategoryModal = false;
    try {
      const res = await deleteCategory(id);
      if (res === true) {
        state.refreshCategoryList = true;
        SuccessAlert(" Category deleted successfully");
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing Went Wrong");
    }
  };

  const closeModalHandler = async () => {
    state.showDeleteCategoryModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteHandler}
      confirmMsg={"Delete Category"}
      btnText={"Delete"}
      msg={
        "Are you sure you want to delete this category? All record related to this category will be deleted as well. This action cannot be undone."
      }
    />
  );
};

export default DeleteCategoryModal;

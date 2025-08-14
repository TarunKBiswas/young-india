/* eslint-disable no-unused-vars */
import React from "react";
import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import { FailureAlert, SuccessAlert } from "../../Toast.jsx";
import { deleteSubCat } from "../../../utils/categoryAPI.js";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const DeleteSubCategoryModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedSubCatID;

  const deleteHandler = async () => {
    try {
      const res = await deleteSubCat(id);
      if (res === true) {
        state.showDeleteSubCategoryModal = false;
        SuccessAlert("Item Deleted");
        state.refreshSubCategoryList = true;
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  const closeModalHandler = () => {
    state.showDeleteSubCategoryModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteHandler}
      confirmMsg={"Delete sub-category"}
      btnText={"Delete"}
      msg={
        "Are you sure you want to delete this subcategory? All record related to this subcategory will be deleted as well. This action cannot be undone."
      }
    />
  );
};

export default DeleteSubCategoryModal;

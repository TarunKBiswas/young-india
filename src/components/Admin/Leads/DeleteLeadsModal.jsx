import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import { deleteLeads } from "../../../utils/Leads.js";
import { FailureAlert, SuccessAlert } from "../../Toast.jsx";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const DeleteLeadsModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedLeadID;

  const deleteHandler = async () => {
    state.showDeleteLeadModal = false;

    try {
      let res = await deleteLeads(id);
      if (res === true) {
        state.refreshLeadsList = true;
        SuccessAlert("Lead Deleted");
      }
    } catch (error) {
      console.log(error);

      FailureAlert("Somthing went wrong");
    }
  };

  const closeModalHandler = () => {
    state.showDeleteLeadModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteHandler}
      confirmMsg={"Are you sure?"}
      btnText={"Delete"}
      msg={
        " All record related to this lead will be deleted as well. This action cannot be undone."
      }
    />
  );
};

export default DeleteLeadsModal;

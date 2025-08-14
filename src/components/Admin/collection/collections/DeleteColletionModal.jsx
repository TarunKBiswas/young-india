import { state } from "../../../../data/state.js";
import { useSnapshot } from "valtio";
import { deleteCollection } from "../../../../utils/collectionsAPI.js";
import { SuccessAlert } from "../../../Toast.jsx";
import DeleteModalLayout from "../../Modals/DeleteModalLayout.jsx";

const DeleteColletionModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedColID;

  const deleteCollectionHandler = async () => {
    closeModalHandler();

    try {
      const res = await deleteCollection(id);
      if (res === true) {
        state.refreshCollectionTable = true;
        SuccessAlert("Collection Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showDeleteCollectionModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteCollectionHandler}
      confirmMsg={"Delete collection"}
      btnText={"Delete"}
      msg={
        "Are you sure you want to delete this collection? All record related to this collection will be deleted as well. This action cannot be undone."
      }
    />
  );
};

export default DeleteColletionModal;

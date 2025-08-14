import { useSnapshot } from "valtio";
import { state } from "../../../../data/state";
import { deleteStory } from "../../../../utils/stories";
import DeleteModalLayout from "../../Modals/DeleteModalLayout";
import { SuccessAlert } from "../../../Toast";

const DeleteStoryModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedStoryID;

  const deleteHandler = async () => {
    closeModalHandler();

    try {
      let res = await deleteStory(id);
      if (res === true) {
        state.refreshStoryList = true;
        SuccessAlert("Story Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showDeleteStoryModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteHandler}
      confirmMsg={"Delete This Story?"}
      btnText={"Delete"}
      msg={"Are you sure you want to delete this Story?"}
    />
  );
};

export default DeleteStoryModal;

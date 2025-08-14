import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import { deleteReview } from "../../../utils/Reiews";
import { SuccessAlert } from "../../Toast";
import DeleteModalLayout from "../Modals/DeleteModalLayout";

const DeleteReviewModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedDeleteReviewID;

  const deleteHandler = async () => {
    closeModalHandler();
    let res = await deleteReview(id);
    if (res === true) {
      state.refreshReviewList = true;
      state.showDeleteReviewModal = false;
      SuccessAlert("Review Deleted");
    }
  };

  const closeModalHandler = () => {
    state.showDeleteReviewModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteHandler}
      confirmMsg={"Delete Review?"}
      btnText={"Delete"}
      msg={"Are you sure you want to delete this review?"}
    />
  );
};

export default DeleteReviewModal;

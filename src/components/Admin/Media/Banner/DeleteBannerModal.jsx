import { state } from "../../../../data/state.js";
import { deleteBanner } from "../../../../utils/Banners.js";
import { useSnapshot } from "valtio";
import { FailureAlert, SuccessAlert } from "../../../Toast.jsx";
import DeleteModalLayout from "../../Modals/DeleteModalLayout.jsx";

const DeleteBannerModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedBannerID;

  const deleteBannerHandler = async () => {
    state.showDeleteBannerModal = false;

    try {
      let res = await deleteBanner(id);
      if (res === true) {
        state.refreshBannersList = true;
        SuccessAlert("Banner Deleted");
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  const closeModalHandler = () => {
    state.showDeleteBannerModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteBannerHandler}
      confirmMsg={"Delete Banner"}
      btnText={"Delete"}
      msg={"Are you sure you want to delete this banner?"}
    />
  );
};

export default DeleteBannerModal;

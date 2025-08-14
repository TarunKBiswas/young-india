import { state } from "../../../../data/state.js";
import { useSnapshot } from "valtio";
import { deleteCampaign } from "../../../../utils/campaigns.js";
import { thankyouModalHandler } from "../../../../utils/const_API.js";
import DeleteModalLayout from "../../Modals/DeleteModalLayout.jsx";

const DeleteCampaignModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedCampaignID;

  const deleteCampaignHandler = async () => {
    try {
      let res = await deleteCampaign(id);
      if (res?.status === 200) {
        state.showDeleteCampaignModal = false;
        state.refreshCampaignList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showDeleteCampaignModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteCampaignHandler}
      confirmMsg={"Delete Campaign"}
      btnText={"Delete"}
      msg={
        "Are you sure you want to delete this Campaign? This action cannot be undone."
      }
    />
  );
};

export default DeleteCampaignModal;

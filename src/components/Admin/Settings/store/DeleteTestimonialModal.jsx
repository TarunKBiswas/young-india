import { useSnapshot } from "valtio";
import DeleteModalLayout from "../../Modals/DeleteModalLayout";
import { state } from "../../../../data/state";
import { deleteTestimonial } from "../../../../utils/testimonials";
import { thankyouModalHandler } from "../../../../utils/const_API";
import { FailureAlert } from "../../../Toast";

const DeleteTestimonialModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedTestimonialID;

  const deleteHandler = async () => {
    closeModalHandler();

    try {
      let res = await deleteTestimonial(id);
      if (res === true) {
        state.refreshTestimonialList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  const closeModalHandler = () => {
    state.showDeleteTestimonials = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteHandler}
      confirmMsg={"Delete Testimonial"}
      btnText={"Delete"}
      msg={"Are you sure you want to delete this testimonial?"}
    />
  );
};

export default DeleteTestimonialModal;

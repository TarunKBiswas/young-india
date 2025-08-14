import { useSnapshot } from "valtio";
import DeleteModalLayout from "../Modals/DeleteModalLayout";
import { state } from "../../../data/state";
import { deleteCoupons } from "../../../utils/Coupons";
import { thankyouModalHandler } from "../../../utils/const_API";

const DeleteCouponModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedCouponID;

  const deleteCouponHandler = async () => {
    state.showDeleteCouponModal = false;
    try {
      const res = await deleteCoupons(id);
      if (res === true) {
        state.refreshCouponList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showDeleteCouponModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={deleteCouponHandler}
      confirmMsg={"Delete Coupon?"}
      btnText={"Delete"}
      msg={"Are you sure you want to delete this coupon?"}
    />
  );
};

export default DeleteCouponModal;

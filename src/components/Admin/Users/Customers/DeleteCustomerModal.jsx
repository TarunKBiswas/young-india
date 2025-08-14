import { useSnapshot } from "valtio";
import { state } from "../../../../data/state";
import { deleteUser } from "../../../../utils/usersAPI";
import { FailureAlert, SuccessAlert } from "../../../Toast";
import DeleteModalLayout from "../../Modals/DeleteModalLayout";

const DeleteUserModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedUserID;

  const userDeleteHandler = async () => {
    try {
      const res = await deleteUser(id);

      if (res === true) {
        state.showDeleteUserModal = false;
        state.refreshUsersTable = true;
        state.refreshStaffList = true;
        SuccessAlert("User Deleted");
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  const closeModalHandler = () => {
    state.showDeleteUserModal = false;
  };

  return (
    <DeleteModalLayout
      closeModalHandler={closeModalHandler}
      action={userDeleteHandler}
      confirmMsg={"Delete User"}
      btnText={"Delete"}
      msg={
        "Are you sure you want to delete this User? All record related to this product will be deleted as well. This action cannot be undone."
      }
    />
  );
};

export default DeleteUserModal;

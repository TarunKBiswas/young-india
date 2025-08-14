import { useState } from "react";
import { state } from "../../../../data/state";
import FormModal from "../../Modals/FormModal";
import { getSingleUserAddress } from "../../../../utils/addresses";
import { useEffect } from "react";
import DataDropDown from "../../UI/DataDropDown";
import { getUsers } from "../../../../utils/usersAPI";

const SelectUserModal = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [address, setAddress] = useState([]);

  const getUsersList = async () => {
    try {
      const res = await getUsers();
      if (res?.status === 200) {
        setAllUsers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const getAddress = async (selectedUser) => {
    try {
      let res = await getSingleUserAddress(selectedUser);

      if (res?.status === 200) {
        setAddress(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedUser !== null) {
      getAddress(selectedUser?.id);
    }
  }, [selectedUser]);

  const selectAddreddHandler = (e) => {
    state.addressID = e.target.value;
  };

  const selectUserHandler = () => {
    state.demoUserData = selectedUser;
    state.showSelectUserModal = false;
  };

  return (
    <FormModal
      // closeModalHandler={modalHandler}
      title={"Select User And Address"}
    >
      <div className="theme-form theme-form-2 mega-form mt-4">
        <div className="mb-4 row align-items-center">
          <label className="form-label-title col-sm-3 mb-0">Name :-</label>
          <div className="col-sm-9">
            <DataDropDown
              data={allUsers}
              selected={selectedUser}
              setSelected={setSelectedUser}
            />
          </div>
        </div>
        <div className="mb-4 row align-items-center">
          <label className="form-label-title col-sm-3 mb-0">Address :-</label>
          <div className="col-sm-9">
            <select
              className="js-example-basic-single w-100"
              name="state"
              onChange={(e) => selectAddreddHandler(e)}
            >
              <option disabled selected>
                Select Address
              </option>
              {address?.addresses?.map((add) => {
                return (
                  <option value={add?.id} key={add?.id}>
                    {add.addressLine1.slice(0, 80)}
                  </option>
                );
              })}
            </select>
            {/* <span>jhvfu</span> */}
          </div>
        </div>

        <div className="w-full flex items-center justify-end">
          <button className="submitButton" onClick={selectUserHandler}>
            Submit
          </button>
        </div>
      </div>
    </FormModal>
  );
};

export default SelectUserModal;

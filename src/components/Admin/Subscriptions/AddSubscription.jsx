import { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { getAllPlans } from "../../../utils/plans.js";
import { getUsers } from "../../../utils/usersAPI.js";
import { createSubscriber } from "../../../utils/Subscription.js";
import { thankyouModalHandler } from "../../../utils/const_API.js";
import DataDropDown from "../UI/DataDropDown.jsx";
import SimpleModal from "../Modals/SimpleModal.jsx";

const AddSubscription = () => {
  const [data, setData] = useState({ plan_id: null });
  const [users, setUsers] = useState([]);
  const [plan, setPlans] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getPlans = async () => {
    try {
      let res = await getAllPlans();
      if (res?.status === 200) {
        setPlans(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      let res = await getUsers();
      if (res?.status === 200) {
        setUsers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
    getUser();
  }, []);

  const subscriptionHandler = async () => {
    let fdata = { ...data, StoreUserId: selectedUser?.id };

    try {
      let res = await createSubscriber(fdata);
      if (res?.status === 200) {
        state.refreshSubscriptionList = true;
        state.showAddSubscriptionModal = false;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subscriptionModalHandler = () => {
    state.showAddSubscriptionModal = false;
  };

  return (
    <SimpleModal closeModalHandler={subscriptionModalHandler}>
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="w-full flex flex-col">
          <label className="text-sm col-sm-3">
            User<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <DataDropDown
              data={users}
              selected={selectedUser}
              setSelected={setSelectedUser}
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label className="text-sm ">
            Plan<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <select
              className="w-full formInput"
              onChange={(e) => setData({ ...data, plan_id: e.target.value })}
            >
              <option value="" disabled selected>
                Select Plan
              </option>
              {plan?.map((plan) => (
                <>
                  <option value={plan?.id}>{plan?.name}</option>
                </>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button className="submitButton" onClick={subscriptionHandler}>
            Submit
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default AddSubscription;

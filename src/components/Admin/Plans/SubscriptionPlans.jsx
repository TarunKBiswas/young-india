import { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { getAllPlans } from "../../../utils/plans.js";
import { useSnapshot } from "valtio";
import CreateButton from "../UI/Buttons/CreateButton.jsx";
import PlanCard from "./PlanCard.jsx";

const SubscriptionPlans = () => {
  const [plansData, setPlansData] = useState([]);
  const snap = useSnapshot(state);

  const getPlans = async () => {
    try {
      let res = await getAllPlans();

      if (res?.status === 200) {
        setPlansData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
    state.refreshPlanList = false;
  }, [snap.refreshPlanList]);

  const planDetailModalHandler = (id) => {
    state.showPlanDetailsModal = true;
    state.selectedPlanID = id;
  };

  const planModalHandler = () => {
    state.addNewPlanModal = true;
  };

  return (
    <div className=" px-2 mt-[-55px] w-full">
      <div className="w-full flex items-center justify-end pb-4 lg:mt-0">
        <CreateButton action={planModalHandler} title={"Add New Plan"} />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {plansData?.map((plan, i) => {
          return (
            <PlanCard
              plan={plan}
              key={i}
              planDetailModalHandler={planDetailModalHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;

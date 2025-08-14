/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { state } from "../../../data/state.js";
import { DeleteButton } from "../UI/Buttons/Delete&CancelButton.jsx";
import { deletePlans, getSinglePlan } from "../../../utils/plans.js";
import { useSnapshot } from "valtio";
import { MdCancel } from "react-icons/md";
import { InfoAlert } from "../../Toast.jsx";
import FormModal from "../Modals/FormModal.jsx";

const PlanDetails = () => {
  const [planDetail, setPlanDetail] = useState(null);
  const snap = useSnapshot(state);
  const id = snap.selectedPlanID;

  const getDetails = async () => {
    try {
      let res = await getSinglePlan(id);

      if (res?.status === 200) {
        setPlanDetail(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const closeModalHandler = () => {
    state.showPlanDetailsModal = false;
  };

  const deleteHandler = async (id) => {
    state.showPlanDetailsModal = false;

    try {
      let res = await deletePlans(id);
      if (res === true) {
        InfoAlert("Plan Deleted");
        state.refreshPlanList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormModal
        title={planDetail?.name || "Plan Name"}
        closeModalHandler={closeModalHandler}
      >
        <div className="w-full flex flex-col lg:flex-row items-start gap-2">
          <div className="flex flex-col w-full ">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-500 ">
                Price
                <span className="text-green-600 font-semibold pl-2">
                  {"₹ "}
                  {planDetail?.price}
                </span>
              </span>
              <span className="text-gray-500 ">
                <span className="text-green-600 font-semibold pr-2">
                  {planDetail?.validity}
                </span>
                Validity
              </span>
              <span className="text-gray-500">
                <span className="pr-1">Status</span>
                <span className="bg-gray-100 py-1 px-1 text-green-600  font-semibold uppercase text-[10px] rounded-lg ">
                  {planDetail?.isActive ? "Active" : "Deactivated"}
                </span>
              </span>
              <span className="flex gap-2 items-center text-xs">
                Premium Price
                {planDetail?.premium_pricing ? (
                  <BsCheckCircleFill className="fill-green-600" />
                ) : (
                  <MdCancel className="fill-red-600" />
                )}
              </span>
              <span className="flex gap-2 items-center text-xs">
                Prepaid Allowed
                {planDetail?.prepaid_allowed ? (
                  <BsCheckCircleFill className="fill-green-600" />
                ) : (
                  <MdCancel className="fill-red-600" />
                )}
              </span>
              <span className="flex gap-2 items-center text-xs">
                COD Allowed
                {planDetail?.cod_allowed ? (
                  <BsCheckCircleFill className="fill-green-600" />
                ) : (
                  <MdCancel className="fill-red-600" />
                )}
              </span>
            </div>
            <span className="text-xs mt-2">{planDetail?.description}</span>
          </div>
          <div className="flex items-start lg:flex-col gap-2">
            {/* <CancelButton title={"Cancel"} func={closeModalHandler} /> */}
            <DeleteButton
              title={"Delete"}
              func={() => deleteHandler(planDetail?.id)}
            />
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default PlanDetails;

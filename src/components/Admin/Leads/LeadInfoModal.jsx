/* eslint-disable react-hooks/exhaustive-deps */
import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import { useEffect, useState } from "react";
import { getSingleLead, updateLeadStatus } from "../../../utils/Leads";
import moment from "moment";
import ProductInfo from "./ProductInfo";
import { SuccessAlert } from "../../Toast";
import ModalUserInfo from "./ModalUserInfo";
import SimpleModal from "../Modals/SimpleModal";

const LeadInfoModal = () => {
  const [leadData, setLeadData] = useState(null);
  const [data, setData] = useState({
    consumer_note: leadData?.attributes?.staff_note,
    staff_note: null,
  });

  const snap = useSnapshot(state);
  const id = snap.selectedLeadID;

  const closeModalHandler = () => {
    state.showLeadInfoModal = false;
  };

  const getLeadData = async () => {
    try {
      let res = await getSingleLead(id);

      setLeadData(res?.data?.data);
      setData({ consumer_note: res?.data?.data?.consumer_note });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (leadData === null) {
      getLeadData();
    }
  }, []);

  const leadUpdateHandler = async () => {
    try {
      let res = await updateLeadStatus(id, data);
      if (res?.status === 200) {
        closeModalHandler();
        SuccessAlert("Lead Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-2xl"}>
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="w-full flex items-center justify-between">
          <div className="w-full ">
            <ModalUserInfo user={leadData} />
          </div>
          <div className="w-full flex flex-col gap-2 items-end">
            {moment(leadData?.createdAt).format("DD MMM hh:mm")}
            <p className="px-2 py-0.5 bg-[#222222] rounded">
              <span className="text-xs text-gray-200">{leadData?.source}</span>
            </p>
          </div>
        </div>
        <hr />
        <div className="w-full flex items-center justify-between">
          <div>
            <ProductInfo
              product={leadData?.product}
              quantity={leadData?.quantity}
            />
          </div>
          <p className="px-2 py-0.5 bg-[#222222] rounded">
            <span className="text-xs text-gray-200">{leadData?.status}</span>
          </p>
        </div>
        <hr />

        <div className="w-full flex gap-4 items-center justify-between">
          <div className="w-full flex flex-col">
            <label htmlFor="">Customer Note</label>
            <textarea
              rows="4"
              disabled
              className="border-gray-300 focus:ring-0 cursor-not-allowed"
              value={leadData?.consumer_note}
            ></textarea>
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="">Staff Note</label>
            <textarea
              rows="4"
              className="border-gray-300 focus:ring-0"
              defaultValue={leadData?.staff_note}
              onChange={(e) => setData({ ...data, staff_note: e.target.value })}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-end">
          <button className="submitButton" onClick={leadUpdateHandler}>
            Submit
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default LeadInfoModal;

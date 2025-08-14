/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { updateStoreFooterData } from "../../../../utils/settings";
import { SuccessAlert } from "../../../Toast";

const StoreFooterData = ({ data }) => {
  const [about_us, setAboutus] = useState("");
  const [contact_us, setContactus] = useState("");
  const [privacy_policy, setPrivacy_policy] = useState("");
  const [ship_and_delivery, setShip_and_delivery] = useState("");
  const [terms_and_conditions, setTerms_and_conditions] = useState("");
  const [refund_and_cancellation, setRefund_and_cancellation] = useState("");
  const editor = useRef(null);
  
  const newData = {
    about_us: about_us || data?.about_us,
    contact_us: contact_us || data?.contact_us,
    privacy_policy: privacy_policy || data?.privacy_policy,
    ship_and_delivery: ship_and_delivery || data?.ship_and_delivery,
    terms_and_conditions: terms_and_conditions || data?.terms_and_conditions,
    refund_and_cancellation:
      refund_and_cancellation || data?.refund_and_cancellation,
  };

  const updateHandler = async () => {
    // console.log(newData);
    try {
      let res = await updateStoreFooterData(newData);
      if (res?.status === 200) {
        SuccessAlert("Data successfully updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-2 ">
        <div className="w-full flex items-center justify-between pb-4 ">
          <div className="w-full flex justify-end">
            <button
              className={`submitButton py-[11px] rounded absolute mt-2  `}
              onClick={updateHandler}
            >
              Update
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mt-10">
          <div className="w-full flex flex-col ">
            <label className="text-lg font-medium">About Us</label>
            <JoditEditor
              ref={editor}
              value={data?.about_us}
              onChange={(value) => setAboutus(value)}
            />
          </div>

          <div className="w-full flex flex-col ">
            <label className="text-lg font-medium"> Contact Us</label>
            <JoditEditor
              ref={editor}
              value={data?.contact_us}
              onChange={(value) => setContactus(value)}
            />
          </div>

          <div className="w-full flex flex-col ">
            <label className="text-lg font-medium"> Privacy Policy</label>
            <JoditEditor
              ref={editor}
              value={data?.privacy_policy}
              onChange={(value) => setPrivacy_policy(value)}
            />
          </div>

          <div className="w-full flex flex-col ">
            <label className="text-lg font-medium"> Ship & Delivery</label>
            <JoditEditor
              ref={editor}
              value={data?.ship_and_delivery}
              onChange={(value) => setShip_and_delivery(value)}
            />
          </div>

          <div className="w-full flex flex-col ">
            <label className="text-lg font-medium"> Terms & Conditions</label>
            <JoditEditor
              ref={editor}
              value={data?.terms_and_conditions}
              onChange={(value) => setTerms_and_conditions(value)}
            />
          </div>

          <div className="w-full flex flex-col ">
            <label className="text-lg font-medium">
              {" "}
              Refund & Cancellation
            </label>
            <JoditEditor
              ref={editor}
              value={data?.refund_and_cancellation}
              onChange={(value) => setRefund_and_cancellation(value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreFooterData;

import { useState } from "react";
import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import SimpleModal from "../../../Admin/Modals/SimpleModal";
import { CgSpinner } from "react-icons/cg";
import { returnOrder } from "../../../../utils/Store/Setting";
import { FailureAlert, SuccessAlert } from "../../../Toast";

const ReturnRequestModal = () => {
  const snap = useSnapshot(webState);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const closeModalHandler = () => {
    webState.returnRequestModal = false;
  };

  const productOrderReturn = async () => {
    setIsLoading(true);
    try {
      let returnRes = await returnOrder(snap.returnRequestData?.id, note);
      if (returnRes?.status === 200) {
        webState.returnRequestModal = false;
        webState.refreshOrderList = true;
        SuccessAlert(returnRes?.data?.message);
      } else {
        webState.returnRequestModal = false;
        FailureAlert(returnRes?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler}>
      <div className=" w-full bg-white  flex-col sm:gap-1 md:gap-3 px-4 pb-3 inline-flex h-auto">
        <div className="flex flex-col gap-1 ">
          <span className="text-slate-900 text-sm lg:text-md font-medium leading-6 tracking-wide ">
            Briefly mention the issue with the product
          </span>
          <div className="flex flex-col gap-1 items-center">
            <textarea
              cols={7}
              rows={4}
              value={note}
              placeholder="Type Here..."
              onChange={(e) => {
                setNote(e.target.value);
              }}
              required
              className="w-full border border-gray-200 rounded bg-[#F9F9F6] text-xs "
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            productOrderReturn({
              e,
              note: note,
            });
          }}
          type="submit"
          className="w-full mt-4 rounded py-2 bg-themecolor justify-center items-center cursor-pointer text-center text-white text-sm font-normal inline-flex leading-normal"
        >
          {isLoading && <CgSpinner size={20} className="mt-1 animate-spin" />}
          Return Request
        </button>
      </div>
    </SimpleModal>
  );
};

export default ReturnRequestModal;

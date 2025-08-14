import { useState } from "react";
import {
  createPromotionalMessage,
  deletePromotionalMessage,
  getPromotionalMessages,
} from "../../../../utils/PromotionalMessages";
import { state } from "../../../../data/state";
import { useEffect } from "react";
import { SuccessAlert } from "../../../Toast";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable";
import Actions from "../../UI/Actions";
import { useSnapshot } from "valtio";

const Promotion = () => {
  const [promotionalMessages, setPromotionalMessages] = useState([]);
  const [newPromotionalMsg, setNewPromotionalMsg] = useState("");
  const [promotionalWarn, setPromotionalWarn] = useState(false);

  const snap = useSnapshot(state);

  const loadPromotionalMessages = async () => {
    try {
      let res = await getPromotionalMessages();
      setPromotionalMessages(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPromotionalMessages();
    state.refreshPromotionalMsg = false;
  }, [snap.refreshPromotionalMsg]);

  const handlePromotionaMessageAdd = async () => {
    if (newPromotionalMsg?.length > 6) {
      try {
        let res = await createPromotionalMessage({
          title: newPromotionalMsg,
          is_active: true,
        });
        if (res?.status === 200) {
          setPromotionalWarn(false);
          SuccessAlert("Added Promotional message");
          setNewPromotionalMsg("");
          state.refreshPromotionalMsg = true;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setPromotionalWarn(true);
    }
  };

  const handlePromotionalDelete = async (id) => {
    const res = await deletePromotionalMessage(id);
    if (res) {
      SuccessAlert("Deleted promotion successfully.");
      state.refreshPromotionalMsg = true;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full lg:w-1/2 mt-12">
        <label className="w-full text-base font-semibold">
          Store Promotional Messages
        </label>

        <div>
          <div className="flex items-center gap-2">
            <input
              className="w-full border border-gray-200 rounded text-sm focus:ring-0 py-2"
              placeholder="Add Promotional Message here.."
              value={newPromotionalMsg}
              onChange={(e) => setNewPromotionalMsg(e.target.value)}
            />

            <button
              className="submitButton block"
              onClick={handlePromotionaMessageAdd}
            >
              Add
            </button>
          </div>
          {promotionalWarn && (
            <span className=" text-red-500 text-sm">Please add a message.</span>
          )}
        </div>
        {promotionalMessages?.length > 0 && (
          <div className=" mt-10">
            <XTable>
              <THead>
                <TR>
                  <TH>Message</TH>
                  <TH>Action</TH>
                </TR>
              </THead>

              <TBody>
                {promotionalMessages?.map((m) => (
                  <TR key={m?.id}>
                    <TD>{m?.title}</TD>
                    <TD>
                      <Actions
                        deleteHandler={() => handlePromotionalDelete(m?.id)}
                      />
                    </TD>
                  </TR>
                ))}
              </TBody>
            </XTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotion;

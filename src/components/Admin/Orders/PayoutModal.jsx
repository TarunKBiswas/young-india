import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import { payout } from "../../../utils/Orders.js";
import { InfoAlert } from "../../Toast.jsx";
import SimpleModal from "../Modals/SimpleModal.jsx";

const PayoutModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedOrderID;

  const modalHandler = () => {
    state.payoutModal = false;
  };

  const payoutHandler = async () => {
    try {
      let res = await payout(id);
      if (res.status === 200) {
        InfoAlert("Payout done");
        modalHandler();
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal closeModalHandler={modalHandler} title={"Pay out"}>
      <div className="w-full flex flex-col items-center justify-center gap-4 ">
        <div>
          {snap?.orderProductDetails?.map((item, i) => (
            <span className="text-lg font-semibold" key={i}>
              {id === item?.id
                ? Math.abs(item?.selling_price - item?.variant?.price)
                : null}
            </span>
          ))}
        </div>

        <div>
          <button className="cButton" onClick={payoutHandler}>
            Yes
          </button>
          <button className="dButton" onClick={modalHandler}>
            No
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default PayoutModal;

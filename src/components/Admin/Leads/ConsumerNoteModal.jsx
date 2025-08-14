import { useSnapshot } from "valtio";
import SimpleModal from "../Modals/SimpleModal";
import { state } from "../../../data/state";

const ConsumerNoteModal = () => {
  const snap = useSnapshot(state);

  let text = snap.consumerNote;
  const closeModalHandler = () => {
    state.showConsumerNoteModal = false;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler}>
      <span className="w-full flex items-center justify-center mb-2 text-lg font-semibold text-themecolor">
        Note
      </span>
      <div className="w-full flex items-center justify-center mb-2">
        <span className="texts font-medium">{text}</span>
      </div>
    </SimpleModal>
  );
};

export default ConsumerNoteModal;

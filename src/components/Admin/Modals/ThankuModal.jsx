import Lottie from "react-lottie-player";
import thankyou from "../../../assets/animations/anime_thankyou.json";
import { state } from "../../../data/state";
import SimpleModal from "./SimpleModal";

const ThankuModal = () => {
  const closeModalHandler = () => {
    state.serverFeePaidModal = false;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler}>
      <div>
        <div className="w-full flex items-center justify-center ">
          <Lottie
            loop
            animationData={thankyou}
            play
            style={{ width: 100, height: 100 }}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-3 mb-10">
          <span className="capitalize font-medium text-gray-900 text-xl mt-2">
            Thank you for subscription
          </span>
        </div>
      </div>
    </SimpleModal>
  );
};

export default ThankuModal;

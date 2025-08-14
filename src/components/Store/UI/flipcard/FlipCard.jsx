import { useState } from "react";
import SimpleModal from "../../../Admin/Modals/SimpleModal";
import { webState } from "../../../../data/webStates";
import LoginModal from "../Modals/LoginModal";
import Register from "../Modals/Register";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const closeModalHandler = () => {
    webState.showFlipModal = false;
  };

  return (
    <SimpleModal
      modalSize={"w-full max-w-lg"}
      modalColor="bg-transparent"
      closeModalHandler={closeModalHandler}
      className="border-0"
      modalshadow="shadow-none"
      closeIconColor="text-white"
    >
      <div className="flex items-center justify-center pt-5 pb-14">
        <div className="w-96 h-[330px] [perspective:1000px]">
          <div
            className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            <div className="absolute w-full h-full [backface-visibility:hidden] flex bg-white shadow-lg rounded-lg p-6">
              <LoginModal handleFlip={handleFlip} />
            </div>
            <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white shadow-lg rounded-lg p-6">
              <Register />
            </div>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default FlipCard;

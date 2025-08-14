/* eslint-disable no-unused-vars */
import React from "react";
import { state } from "../../../data/state.js";
import { ManualButton } from "../UI/Buttons/ShippingButtons.jsx";
import CloseModalButton from "../UI/Buttons/CloseModalButton.jsx";
import Shipping from "../../../assets/raster/img_shipping.png";
import ShipRocket from "../../../assets/raster/img_shiprocket_logo.jpg";
import { MdLocalShipping } from "react-icons/md";
import Lottie from "react-lottie-player";
import shipping from "../../../assets/animations/anim_shipping.json";
import SimpleModal from "../Modals/SimpleModal.jsx";
import { shipRocketShipping } from "../../../utils/Orders.js";

const ShipNowModal = () => {
  const modalHandler = () => {
    state.showShipNowModal = false;
  };

  const manualShipModalHandler = () => {
    state.showShipNowModal = false;
    state.showManualShipModal = true;
  };

  const shipRocketModalHandler = async () => {
    state.showShipNowModal = false;
    state.showShipRocketModal = true;
  };

  return (
    <SimpleModal modalSize={"max-w-md"} closeModalHandler={modalHandler}>
      <div className="px-4 pb-4 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-gray-900 text-center w-full ">
          Select Shipping Method
        </h3>

        <Lottie
          loop
          animationData={shipping}
          play
          className="h-80 mb-[-50px]"
        />

        <div className="w-full flex flex-col items-center justify-center gap-2 mt-4 mb-2 z-50">
          <ManualButton
            img={ShipRocket}
            text={"Shiprocket"}
            style={"w-full border"}
            action={shipRocketModalHandler}
          />
          <ManualButton
            icon={<MdLocalShipping className="h-5 w-5" />}
            text={"Manual"}
            style={"bg-[#222222] text-white w-full"}
            action={manualShipModalHandler}
          />
        </div>
      </div>
    </SimpleModal>
  );
};

export default ShipNowModal;

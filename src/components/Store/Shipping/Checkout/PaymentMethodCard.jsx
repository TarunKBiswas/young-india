/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaWallet } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";
import { CheckOutButton, PaymentMethodButton } from "../../UI/Buttons";
import { useEffect, useState } from "react";
import Payment from "./Payment";
import { webState } from "../../../../data/webStates";
import { BiRupee } from "react-icons/bi";
import { useSnapshot } from "valtio";

const PaymentMethodCard = ({ data, text, action }) => {
  const [activeButton, setActiveButton] = useState("PREPAID");

  const snap = useSnapshot(webState);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    sessionStorage.setItem("activeButton", buttonId);
    webState.selectPayment = buttonId;
  };

  useEffect(() => {
    const storedActiveButton = sessionStorage?.getItem("activeButton");
    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
    }
  }, [activeButton]);

  let activeCardSet;

  switch (activeButton) {
    case "PREPAID":
      activeCardSet = <Payment data={data} />;
      break;
    case "COD":
      activeCardSet = <Payment data={data} />;
      break;
    case "WALLET":
      activeCardSet = <Payment data={data} />;
      break;
    default:
      activeCardSet = null;
      break;
  }

  return (
    <div className="w-full mt-2 flex flex-col items-center justify-center">
      {/* options */}
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="w-full flex items-center justify-center gap-3">
          <PaymentMethodButton
            activeButton={activeButton}
            action={handleButtonClick}
            Icon={SiMastercard}
            title={"Prepaid"}
            buttonNum={"PREPAID"}
          />
          <PaymentMethodButton
            activeButton={activeButton}
            action={handleButtonClick}
            Icon={BiRupee}
            title={"COD"}
            buttonNum={"COD"}
          />
          <PaymentMethodButton
            activeButton={activeButton}
            action={handleButtonClick}
            Icon={FaWallet}
            title={"Wallet"}
            buttonNum={"WALLET"}
          />
        </div>
      </div>

      {/* breakdown */}
      {activeButton && <div>{activeCardSet}</div>}
      {activeButton && (
        <div className="my-6 w-full flex items-center justify-center">
          <CheckOutButton text={text} action={action} style={"rounded"} />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;

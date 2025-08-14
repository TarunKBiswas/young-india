import { useState } from "react";
import { PaymentMethodButton } from "../UI/Buttons";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { useEffect } from "react";
import { FaHandHoldingUsd, FaWallet } from "react-icons/fa";
// import { BiSolidWallet } from "react-icons/bi";

const PaymentCard = () => {
  const snap = useSnapshot(webState);
  const [activeButton, setActiveButton] = useState(snap.selectPayment);
  // const userInfo = snap?.userData?.data;
  const [isCodAvailable, setIsCodavalable] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    sessionStorage.setItem("activeButton", buttonId);
    webState.selectPayment = buttonId;
  };

  const data =
    snap.purhcaseType === "buynow" ? [snap.buyNowProduct] : snap.cartItems;
  // console.log(data);

  const codAvailableHandler = data?.some((data) => {
    return data?.product?.cod_enabled === false;
  });

  useEffect(() => {
    if (codAvailableHandler) {
      setIsCodavalable(false);
    } else {
      setIsCodavalable(true);
    }
  }, [codAvailableHandler]);

  useEffect(() => {
    const storedActiveButton = sessionStorage?.getItem("activeButton");
    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
      webState.selectPayment = storedActiveButton;
    }
  }, [activeButton]);

  return (
    <div>
      <div className="w-full flex  items-center justify-center md:justify-start gap-3">
        <PaymentMethodButton
          activeButton={activeButton}
          action={handleButtonClick}
          Icon={FaWallet}
          title={"Pay Online"}
          buttonNum={"PREPAID"}
          // amount={"₹ " + snap?.totalPrice}
        />

        <PaymentMethodButton
          activeButton={activeButton}
          action={handleButtonClick}
          Icon={FaHandHoldingUsd}
          title={"COD"}
          buttonNum={"COD"}
          amount={
            !isCodAvailable && (
              <span className="text-red-500">Not Available</span>
            )
          }
        />
        {/* {snap?.loggedinUserData || snap.userData ? (
          <PaymentMethodButton
            activeButton={activeButton}
            action={handleButtonClick}
            Icon={BiSolidWallet}
            title={"Wallet"}
            buttonNum={"WALLET"}
            amount={
              "₹ " + snap?.loggedinUserData?.wallet_balance !== null
                ? snap?.loggedinUserData?.wallet_balance
                : userInfo?.wallet_balance
            }
          />
        ) : null} */}
      </div>
    </div>
  );
};

export default PaymentCard;

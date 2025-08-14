import { useState } from "react";
import { CheckOutButton } from "../../UI/Buttons";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import UPIAndBankInfo from "./UPIAndBankInfo";

const WebWallet = () => {
  const [bankDetails, setBankDetails] = useState(false);
  const snap = useSnapshot(webState);
  const profileData = snap.userData;

  const WithdrawCoins = () => {
    setBankDetails(!bankDetails);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[1440px] mx-auto">
      <div className="bg-white w-full h-full  px-3 ">
        <span className="text-neutral-800 text-xl font-semibold mt-2.5">
          Wallet Money
        </span>
        <div
          className={`w-full border p-6 my-6 flex items-center justify-center ${
            bankDetails ? "hidden" : "flex"
          }`}
        >
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-themecolor text-center text-2xl font-semibold leading-relaxed">
              ₹ {profileData?.data?.wallet_balance}
            </p>
            <div className="w-full flex flex-col gap-2">
              <CheckOutButton text={"Withdraw"} action={WithdrawCoins} />
              <span className="text-center text-neutral-800 text-opacity-70 text-xs font-normal leading-tight">
                Processing May take up to 3 business days
              </span>
            </div>
          </div>
        </div>

        {bankDetails ? <UPIAndBankInfo /> : null}
      </div>
    </div>
  );
};

export default WebWallet;

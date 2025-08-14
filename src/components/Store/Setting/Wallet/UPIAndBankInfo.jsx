import { useState } from "react";
import UPI from "./UPI";
import BankDetail from "./BankDetail";
import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import UserInfoData from "../../UI/UserInfoData";

const UPIAndBankInfo = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const snap = useSnapshot(webState);
  const userInfo = snap?.userData;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let content = "";

  if (selectedOption === "option1") {
    content = <UPI />;
  } else if (selectedOption === "option2") {
    content = <BankDetail />;
  }

  return (
    <UserInfoData>
      <div className="w-full md:border md:rounded-lg flex flex-col items-center gap-4 mt-3 py-3">
        <div className="md:min-w-[420px] md:mx-auto">
          <p className="text-opacity-70 text-sm font-normal text-center leading-tight text-themecolor">
            Withdraw Money from the wallet.
          </p>
          <div className="flex border-b justify-between mt-4 ">
            <div className="flex flex-col gap-2 mb-3 text-opacity-80 text-base font-normal leading-normal">
              <span>Withdraw Balance :</span>
              {/* <span>Payout Charges :</span> */}
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-neutral-800 text-opacity-80 text-base font-normal leading-normal">
              <span> ₹ {userInfo?.data?.wallet_balance}</span>
              {/* <span>(-) ₹ 7.9</span> */}
            </div>
          </div>
          <div className="flex gap-2  justify-between mt-3">
            <span className="text-neutral-800 text-base font-medium  leading-normal">
              Amount Receivable :
            </span>
            <span className="text-neutral-800 text-base font-medium leading-normal">
              ₹ {userInfo?.data?.wallet_balance}
            </span>
          </div>
          <p className="text-neutral-800 text-opacity-70 text-sm font-normal leading-tight flex items-center justify-start py-5">
            Choose how you want to receive payment
          </p>

          <div className="flex flex-col py-2">
            <div className="flex justify-start gap-8 text-[16px] font-medium ">
              <label className="flex gap-2 items-center text-lg">
                <input
                  type="radio"
                  name="content"
                  value="option1"
                  className="checked:text-themecolor cursor-pointer text-base font-normal leading-normal"
                  checked={selectedOption === "option1"}
                  onChange={handleOptionChange}
                />
                UPI
              </label>

              <label className="flex gap-2 items-center text-lg">
                <input
                  type="radio"
                  name="content"
                  value="option2"
                  className="checked:text-themecolor cursor-pointer text-base font-normal leading-normal"
                  checked={selectedOption === "option2"}
                  onChange={handleOptionChange}
                />
                Bank Info
              </label>
            </div>
            <div id="contentArea">{content}</div>
          </div>
        </div>
      </div>
    </UserInfoData>
  );
};

export default UPIAndBankInfo;

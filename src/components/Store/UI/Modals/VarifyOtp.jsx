/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import OTPInput from "react-otp-input";
import ModalBody from "./ModalBody";
import { useState } from "react";
import { webState } from "../../../../data/webStates";
import "./inputStyle.css";
import { CheckOutButton } from "../Buttons";

const VarifyOtp = () => {
  const [otp, setOtp] = useState(null);

  const closeModalHandler = () => {
    webState.showVerifyOtpModal = false;
  };

  const varifyOtpHandler = () => {};

  return (
    <ModalBody closeModalHandler={closeModalHandler}>
      <div className=" w-full bg-white rounded-md flex-col justify-start items-center gap-3 inline-flex">
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <span className="text-2xl font-bold text-black">Login</span>
          <span className="text-xs leading-5">
            Check your phone for the OTP sent and enter below
          </span>
        </div>

        <div className="w-full self-stretch h-24  flex-col justify-start items-start gap-3 flex">
          <div className="w-full flex-col justify-center items-start gap-1 flex">
            <span className="text-black text-opacity-50 text-xs font-normal leading-tight">
              OTP Sent to:
            </span>
            <div className="opacity-80 justify-start items-center gap-2 inline-flex">
              <span className=" text-neutral-800 text-sm font-normal leading-tight">
                +91 8018801808
              </span>
              <div className="Edit w-6 h-6 relative">
                <div className=" w-4 h-4 left-[4px] top-[4px] absolute"></div>
              </div>
            </div>
          </div>

          <div className="w-full self-stretch justify-start items-center gap-3 inline-flex">
            <OTPInput
              inputStyle="inputStyle"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  className="flex rounded border w-8 h-8 border-gray-300  placeholder-gray-400 shadow-sm  "
                  {...props}
                />
              )}
            />
          </div>
        </div>
        <div className=" self-stretch flex-col justify-start items-center gap-2.5 flex">
          <div className="w-full">
            <CheckOutButton
              text={"Verify"}
              style={"rounded px-2"}
              action={varifyOtpHandler}
            />
          </div>
        </div>
      </div>
    </ModalBody>
  );
};

export default VarifyOtp;

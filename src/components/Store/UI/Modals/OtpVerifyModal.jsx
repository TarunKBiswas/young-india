import { useState } from "react";
import ModalBody from "./ModalBody";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { useNavigate } from "react-router-dom";
import { FailureAlert } from "../../../Toast";
import OTPInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import { requestUserInfo } from "../../../../utils/Store/login";

const OtpVerifyModal = () => {
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const snap = useSnapshot(webState);
  const [showResend] = useState(false);
  const navigate = useNavigate();

  const closeModalHandler = () => {
    webState.showOTPModal = false;
  };

  const optVerifyHandler = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await requestUserInfo({
        phoneNumber: `+91${snap?.userPhoneNumber?.split(" ").join("")}`,
        otp,
      });
      console.log(response);
      setLoading(false);
      if (response?.status === 200) {
        sessionStorage.setItem("usertoken", response?.data?.jwt);
        setLoading(false);
        webState.resellerToken = response?.data?.jwt;
        webState.proceedCheck = true;
        webState.showOTPModal = false;
        navigate(snap.previousRoute);
      } else if (
        response?.response?.status === 400 &&
        response?.response?.data?.message === "Otp is Invalid"
      ) {
        FailureAlert(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalBody closeModalHandler={closeModalHandler}>
      <div className="space-y-6 flex flex-col items-center justify-center ">
        <label
          htmlFor="otp"
          className=" text-center text-3xl font-bold tracking-tight sm:text-neutral-700 "
        >
          Enter your OTP
        </label>
        <OTPInput
          value={otp}
          onChange={setOtp}
          OTPLength={6}
          otpType="number"
          disabled={false}
          autoFocus
          className="opt-container ml-4"
          inputStyles={{
            width: "40px",
          }}
        ></OTPInput>
        <button
          onClick={optVerifyHandler}
          className="bg-themecolor w-full flex gap-1  items-center justify-center py-2.5 text-white rounded"
        >
          {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
          <span>Verify OTP</span>
        </button>
      </div>
      {showResend && (
        <div className="flex flex-col mt-2 items-center justify w-full">
          <p className="text-base font-semibold">OR</p>
          <p className=" w-full flex  items-center justify-center text-black cursor-pointer">
            <span>Resend OTP</span>
          </p>
        </div>
      )}
    </ModalBody>
  );
};

export default OtpVerifyModal;

import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { useNavigate } from "react-router-dom";
import { requestUserInfo } from "../../../utils/Store/login";
import { FailureAlert } from "../../Toast";
import { FormButton } from "../UI/Buttons";
import OTPInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";

const OTPVerify = () => {
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const snap = useSnapshot(webState);
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();

  const optVerifyHandler = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await requestUserInfo({
        phoneNumber: `+91  ${snap?.userPhoneNumber}`,
        otp,
      });
      setLoading(false);
      if (response?.status === 200) {
        sessionStorage.setItem("usertoken", response?.data?.jwt);
        setLoading(false);
        webState.resellerToken = response?.data?.jwt;
        webState.loggedinUserData = response?.data?.user;
        // navigateHandler();
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

  useEffect(() => {
    const resendTimer = setTimeout(() => {
      setShowResend(true);
    }, 20000);
    return () => {
      clearTimeout(resendTimer);
    };
  }, []);

  const onResendOTP = () => {
    // navigate("/storelogin");
    // webState.showLoginModal = true;
    webState.showFlipModal = true;
  };

  return (
    <div className=" w-full flex items-center justify-center px-2 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md bg-white border py-6 px-8 shadow rounded sm:px-10  h-auto mt-40">
        <div className="w-full lg:mx-auto h-max lg:max-w-lg ">
          <div className=" py-6 sm:rounded-lg h-auto px-2">
            <div className="space-y-6 flex flex-col items-center justify-center ">
              <FormButton
                title={"Verify OTP"}
                description={
                  "Check your phone for the OTP sent and enter below"
                }
              />
              <OTPInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="ml-5 px-2"
                inputStyles={{
                  width: "40px",
                  height: "40px",
                }}
              ></OTPInput>
              <button
                onClick={optVerifyHandler}
                className="bg-themecolor w-full lg:max-w-[343px] flex gap-1  items-center justify-center py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button>
            </div>
            {showResend && (
              <div className="flex flex-col mt-2 items-center justify w-full">
                <p className="text-base font-semibold">OR</p>
                <p
                  onClick={onResendOTP}
                  className=" w-full flex  items-center justify-center text-black cursor-pointer"
                >
                  <span>Resend OTP</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;

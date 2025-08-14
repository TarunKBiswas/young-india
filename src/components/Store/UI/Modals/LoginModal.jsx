/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import OTPInput from "otp-input-react";
import { CheckoutSubmitButton } from "../Buttons";
// import { useNavigate } from "react-router-dom";
import { auth } from "../../../../utils/Store/firebase_config";
import { SuccessAlert } from "../../../Toast";
import { login, varifyOTp } from "../../../../utils/Store/login";
import { webState } from "../../../../data/webStates";

const LoginModal = ({ handleFlip }) => {
  auth.useDeviceLanguage();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  // const navigate = useNavigate();

  const loginHandler = async () => {
    setLoading(true);
    try {
      let res = await login(mobileNumber);
      if (res?.status === 200) {
        setShowOTP(true);
        SuccessAlert(res?.data?.message);
        setOtp(res?.data?.data?.otp);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const otpHandler = async () => {
    let data = { phone: mobileNumber, otp: otp };
    try {
      let res = await varifyOTp(data);
      console.log(res);
      if (res.status === 200) {
        sessionStorage.setItem("usertoken", res?.data?.data?.jwt);
        sessionStorage.setItem(
          "userdata",
          JSON.stringify(res?.data?.data?.user)
        );
        setLoading(false);
        webState.resellerToken = res?.data?.data?.jwt;
        webState.loggedinUserData = res?.data?.data?.user;
        // window.location.reload();

        if (res?.data?.data?.user?.isNewUser) {
          handleFlip();
        } else {
          webState.showFlipModal = false;
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white sm:rounded-lg w-full  ">
      {showOTP ? (
        <>
          <div className="w-full flex flex-col max-w-[350px] mx-auto gap-5 items-center">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-neutral-700 ">
              Enter OTP
            </h2>
            <OTPInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="w-full justify-between"
              inputStyles={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #000000",
                margin: "0",
                outline: "none",
              }}
            ></OTPInput>
            <button
              onClick={otpHandler}
              className="bg-themecolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
              <span>Verify OTP</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col max-w-[350px] mx-auto gap-4">
            <div className="w-full flex flex-col gap-2 mb-5">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-neutral-700 ">
                Login
              </h2>
              <label
                htmlFor="password"
                className="flex justify-center items-center text-center text-xs font-normal text-black text-opacity-80 leading-tight "
              >
                Welcome back !! Let’s get back to earning & Shopping.
              </label>
            </div>
            <div className="w-full flex border border-[#C6BCBC] rounded-md items-center m-auto">
              <span className="text-[#696767] p-3">+91</span>
              <hr className="w-[1px] h-7 bg-[#C6BCBC]" />
              <input
                type="tel"
                placeholder="Mobile Number"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                className="text-[16px] px-3 py-2.5 border-none !ring-0"
                aria-label="Mobile Number"
              />
            </div>

            <div className="flex flex-col gap-1">
              <CheckoutSubmitButton
                title={"Continue"}
                isLoading={loading}
                action={loginHandler}
              />
              {/* <small onClick={handleFlip} className="w-full text-right text-xs">
                Become a user! {""}
                <span className="underline cursor-pointer">Click here</span>.
              </small> */}
            </div>
          </div>
        </>
      )}
    </div>
    // </SimpleModal>
  );
};

export default LoginModal;

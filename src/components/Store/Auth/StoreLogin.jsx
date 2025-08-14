import { CgSpinner } from "react-icons/cg";
import OTPInput from "otp-input-react";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../../utils/Store/firebase_config";
import { useNavigate } from "react-router-dom";
import { login, varifyOTp } from "../../../utils/Store/login";
import { webState } from "../../../data/webStates";
import { useEffect } from "react";
import { SuccessAlert } from "../../Toast";
import { CheckoutSubmitButton } from "../UI/Buttons";

const StoreLogin = () => {
  auth.useDeviceLanguage();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      if (res.status === 200) {
        sessionStorage.setItem("usertoken", res?.data?.data?.jwt);
        sessionStorage.setItem(
          "userdata",
          JSON.stringify(res?.data?.data?.user)
        );
        setLoading(false);
        webState.resellerToken = res?.data?.data?.jwt;
        webState.loggedinUserData = res?.data?.data?.user;
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandler = () => {
    navigate("/register");
  };

  return (
    <div className=" w-full flex items-center justify-center px-2 my-40">
      <div className="w-full h-auto flex items-center justify-center ">
        {showOTP ? (
          <div className=" w-full flex items-center justify-center sm:rounded-lg  h-auto ">
            <div className=" rounded space-y-6 flex flex-col items-center justify-center border p-6 shadow ">
              <label className=" text-center text-2xl font-medium tracking-tight sm:text-neutral-700 ">
                Enter OTP
              </label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="ml-4 px-2 "
                inputStyles={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #000000",
                }}
              ></OTPInput>
              <button
                onClick={otpHandler}
                className="bg-themecolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <div className="bg-white py-6 px-8 shadow sm:rounded-lg sm:px-10 w-max ">
              <div className="space-y-6">
                <div className="w-full flex flex-col gap-2">
                  <h2 className="text-center text-3xl font-bold tracking-tight sm:text-neutral-700 ">
                    Login
                  </h2>
                  <label
                    htmlFor="password"
                    className="flex justify-center items-center text-xs font-normal text-black text-opacity-80 leading-tight "
                  >
                    Welcome back !! Let’s get back to earning & Shopping.
                  </label>
                </div>

                <div>
                  <div className="input-wrapper text-center max-w-[280px] flex justify-center border border-[#C6BCBC] rounded-[5px] items-center bg-white m-auto mb-3">
                    <p className="countryCode text-[#696767] min-w-[55px] max-w-[55px] tracking-normal text-[16px] bg-white border-none border-0 font-normal leading-[100%] p-3 text-left rounded-[5px] !h-auto shadow-none !outline-none w-auto">
                      +91
                    </p>
                    <div className="h-[60%] w-[0.75px] bg-[#A39C9C]" />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="text-[16px] pl-[6px] min-w-0 bg-white border-none outline-none focus:ring-0 font-normal leading-[100%] p-3 text-left rounded-[5px] !h-auto shadow-none w-auto max-w-fit"
                      aria-label="Mobile Number"
                    />
                  </div>

                  <CheckoutSubmitButton
                    title={"Continue"}
                    isLoading={loading}
                    action={loginHandler}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 mt-3">
                <p className="text-base font-semibold">OR</p>
                <p
                  className="text-sm font-normal cursor-pointer"
                  onClick={registerHandler}
                >
                  Register
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreLogin;

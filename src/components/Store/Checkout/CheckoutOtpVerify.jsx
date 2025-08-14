import { useState } from "react";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import OtpInput from "react-otp-input";
import { requestUserInfo } from "../../../utils/Store/login";
import { CheckoutSubmitButton } from "../UI/Buttons";

const CheckoutOtpVerify = () => {
  const snap = useSnapshot(webState);
  const number = snap.checkoutUserMobile;
  const [otp, setOtp] = useState(snap.checkoutOTP);
  const [isLoading, setIsLoading] = useState(false);

  const messageType = snap.globalData?.data?.user_verification_method;

  const changeNumberHandler = () => {
    webState.checkOutStatus = "number";
  };

  const optVerifyHandler = async () => {
    setIsLoading(true);
    let data = {
      phone: number,
      otp,
    };
    try {
      const response = await requestUserInfo(data);
      // console.log(response);
      if (response?.status === 200) {
        sessionStorage.setItem("usertoken", response?.data?.data?.jwt);
        sessionStorage.setItem(
          "userdata",
          JSON.stringify(response?.data?.data?.user)
        );
        webState.loggedinUserData = response?.data?.data?.user;
        webState.resellerToken = response?.data?.data?.jwt;

        console.log(response);
        if (response?.data?.data?.user?.isNewUser) {
          webState.checkOutStatus = "details";
        } else {
          webState.checkOutStatus = "address";
        }
        // webState.checkoutStage = "66%";
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[280px] h-full max-h-[400px] w-full mx-auto text-center my-6">
      <span className="capitalize text-2xl font-bold text-black tracking-wide">
        Verify Mobile Number
      </span>

      <div className="w-full flex flex-col  text-black mt-2">
        <span className="text-xs text-themecolor">
          {" "}
          {messageType === "INTERAKT"
            ? "You will recive OTP on whatsapp"
            : "You will recive OTP via text message "}
        </span>
        <span className="font-medium text-base"> +91 {number}</span>
      </div>

      <div className="w-full flex items-center justify-center">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          otpType="number"
          shouldAutoFocus
          onPaste={true}
          inputStyle={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #000000",
            color: "#000000",
            margin: "0 0 0 4px",
            autoFocus: true,
          }}
          renderInput={(props) => <input {...props} />}
        />
      </div>

      <CheckoutSubmitButton
        title={"Checkout"}
        isLoading={isLoading}
        action={optVerifyHandler}
      />

      <span className="text-xs">
        Want To Change Number ?
        <span
          className="text-blue-500 cursor-pointer hover:underline transition-all duration-200 pl-2"
          onClick={changeNumberHandler}
        >
          Click here
        </span>
      </span>
    </div>
  );
};

export default CheckoutOtpVerify;

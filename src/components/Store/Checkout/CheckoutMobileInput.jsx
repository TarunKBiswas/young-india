import { useState } from "react";
import { login } from "../../../utils/Store/login";
import { webState } from "../../../data/webStates";
import { CheckoutSubmitButton } from "../UI/Buttons";

const CheckoutMobileInput = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async () => {
    setIsLoading(true);
    webState.checkoutUserMobile = mobileNumber;
    try {
      let res = await login(mobileNumber);
      console.log(res);
      if (res?.status === 200) {
        webState.checkOutStatus = "otp";
        // webState.checkoutStage = "35%";
        webState.checkoutOTP = res?.data?.data?.otp;
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="mobile-input-wrapper w-full grid h-full text-left xl:mb-24">
      <div className="flex flex-col gap-4 max-w-[320px] h-full max-h-[400px] w-full mx-auto text-center">
        <span className="capitalize text-2xl font-bold text-black tracking-wide">
          Enter Number
        </span>
        <div>
          <div className="input-wrapper text-center max-w-[320px] grid justify-center border border-[#C6BCBC] rounded-[5px] items-center bg-white m-auto mb-3">
            <p className="countryCode text-[#696767] min-w-[55px] max-w-[55px] tracking-normal text-[16px] bg-white border-none border-0 font-normal leading-[100%] p-3 text-left rounded-[5px] !h-auto shadow-none !outline-none w-auto">
              +91
            </p>
            <div className="h-[60%] w-[0.75px] bg-[#A39C9C]" />
            <input
              type="tel"
              placeholder="Number"
              pattern="[0-9]{10}"
              maxLength={10}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="ring-0 text-[16px] pl-[6px] min-w-0 bg-white border-none focus:ring-0 font-normal leading-[100%] p-3 text-left rounded-[5px] !h-auto shadow-none !outline-none w-auto max-w-fit"
              aria-label="Mobile Number"
            />
          </div>

          <CheckoutSubmitButton
            title={"Continue"}
            isLoading={isLoading}
            action={loginHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutMobileInput;

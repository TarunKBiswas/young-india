import { useState } from "react";
import { state } from "../../../data/state";
import SimpleModal from "./SimpleModal";
import InputCompState from "../UI/Inputs/InputCompState";
import { forgetPassword } from "../../../utils/Auth";
import { FailureAlert, SuccessAlert } from "../../Toast";

const ForgetOtpModal = () => {
  const [email, setEmail] = useState("");

  const closeModalHandler = () => {
    state.showForgetOtpModal = false;
  };

  const forgetPasswordhandler = async () => {
    let data = { email: email };
    if (email) {
      try {
        let res = await forgetPassword(data);
        if (res?.status === 200) {
          closeModalHandler();
          // navigate("/reset-password");
          SuccessAlert(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      FailureAlert("Please enter your email address");
    }
  };

  return (
    <SimpleModal
      closeModalHandler={closeModalHandler}
      modalSize={"max-w-xl"}
      position={"items-center"}
    >
      <div className="w-full p-6 flex flex-col items-start justify-center gap-2">
        <div className="w-full flex flex-col itme">
          <InputCompState
            value={email}
            setValue={setEmail}
            type={"email"}
            label={"Email"}
          />
        </div>
        <div className="w-full flex items-end justify-end">
          <button
            className=" bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={forgetPasswordhandler}
          >
            Reset
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default ForgetOtpModal;

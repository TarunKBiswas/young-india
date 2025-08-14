import { useState } from "react";
import InputCompState from "../../Admin/UI/Inputs/InputCompState";
import { CheckoutSubmitButton } from "../UI/Buttons";
import { editProfile } from "../../../utils/Store/Setting";
import { SuccessAlert } from "../../Toast";
import { webState } from "../../../data/webStates";

const CheckoutDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = JSON.parse(sessionStorage.getItem("userdata"));
  const id = data.id;

  const profileHandler = async () => {
    setIsLoading(true);
    const data = { name, email };
    try {
      let res = await editProfile(id, data);
      if (res?.status === 200) {
        sessionStorage.setItem("userdata", JSON.stringify(res.data.data));
        webState.userData = res.data.data;
        SuccessAlert("Details Uploaded");
        webState.checkOutStatus = "address";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-input-wrapper w-full grid h-full text-left px-2 lg:mx-6 mb-4">
      <div className="w-full text-sm flex ">
        <span className="w-full font-semibold text-base">Enter Details</span>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 my-4">
        <InputCompState
          label={"Name"}
          required
          value={name}
          setValue={setName}
        />
        <InputCompState
          label={"Email"}
          required
          type={"email"}
          value={email}
          setValue={setEmail}
        />
      </div>

      <CheckoutSubmitButton
        title={"Continue"}
        isLoading={isLoading}
        action={profileHandler}
      />
    </div>
  );
};

export default CheckoutDetails;

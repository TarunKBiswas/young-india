import { useState } from "react";
import { state } from "../../../data/state.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createPlan } from "../../../utils/plans.js";
import { SuccessAlert } from "../../Toast.jsx";
import { lengthMsg, reqMsg } from "../../../utils/const_API.js";
import InputComp3 from "../UI/Inputs/InputComp3.jsx";
import CheckTabInput from "../UI/Inputs/CheckTabInput.jsx";
import SimpleModal from "../Modals/SimpleModal.jsx";
import { SubmitButton } from "../UI/Buttons/AddButton.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  validity: yup.string().required(reqMsg),
  price: yup.string().required(reqMsg),
});

const AddNewPlan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [description, setDescription] = useState(null);
  const [premiumPricing, setPremiumPricing] = useState(false);
  const [codAllowed, isCodAllowed] = useState(false);
  const [prepaidAllowed, setPrepaidAllowed] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const closeModalHandler = () => {
    state.addNewPlanModal = false;
  };

  const planSubmitHandler = async (data) => {
    let finalData = {
      ...data,
      description,
      premium_pricing: premiumPricing,
      prepaid_allowed: prepaidAllowed,
      cod_allowed: codAllowed,
      is_active: isActive,
    };

    try {
      let res2 = await createPlan(finalData);
      if (res2?.status === 200) {
        SuccessAlert("Plan Created");
        state.addNewPlanModal = false;
        state.refreshPlanList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal modalSize={"max-w-2xl"} closeModalHandler={closeModalHandler}>
      <form
        className="p-4 flex flex-col gap-4"
        onSubmit={handleSubmit(planSubmitHandler)}
      >
        <InputComp3
          register={register}
          label={"Name"}
          registerValue={"name"}
          error={errors.name?.message}
        />
        <InputComp3
          register={register}
          label={"Price"}
          registerValue={"price"}
          type={"number"}
          error={errors.price?.message}
        />
        <InputComp3
          register={register}
          label={"Validity"}
          registerValue={"validity"}
          type={"number"}
          error={errors.validity?.message}
        />

        <div className="w-full flex flex-col gap-1">
          <label className="text-sm col-lg-3 col-md-3 mb-0 font-medium">
            Description<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <textarea
              className="formInput"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex items-start">
          <div className="w-full">
            <div className="w-full flex items-center gap-4">
              <CheckTabInput
                label={"Premium Pricing :"}
                value={premiumPricing}
                setValue={setPremiumPricing}
              />
              <CheckTabInput
                label={"COD Allowed :"}
                value={codAllowed}
                setValue={isCodAllowed}
              />
              <CheckTabInput
                label={"Prepaid Allowed :"}
                value={prepaidAllowed}
                setValue={setPrepaidAllowed}
              />
              <CheckTabInput
                label={"Active :"}
                value={isActive}
                setValue={setIsActive}
              />
            </div>
          </div>
        </div>
        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default AddNewPlan;

import { useState } from "react";
import { state } from "../../../data/state.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnapshot } from "valtio";
import {
  emailRegExp,
  phoneRegExp,
  reqMsg,
  thankyouModalHandler,
  uploadImage,
} from "../../../utils/const_API.js";
import { shipNowOrder } from "../../../utils/Orders.js";
import { FailureAlert } from "../../Toast.jsx";
import MediaInput from "../UI/Inputs/MediaInput.jsx";
import InputComp from "../UI/Inputs/InputComp.jsx";
import SimpleModal from "../Modals/SimpleModal.jsx";
import { SubmitButton } from "../UI/Buttons/AddButton.jsx";

const schema = yup.object({
  courierName: yup.string().required(reqMsg),
  trackingId: yup.string().required(reqMsg),
  courierEmail: yup
    .string()
    .required(reqMsg)
    .matches(emailRegExp, "Email is not valid"),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid phone")
    .max(10, "Please enter valid phone"),
});

const ManualShippingModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [image, setImage] = useState(null);

  const snap = useSnapshot(state);
  let order_id = snap.selectedOrderID;

  const shippingHandler = async (data) => {
    if (image !== null) {
      state.showManualShipModal = false;

      try {
        const formdata = new FormData();
        formdata.append("file", image);
        let res = await uploadImage(formdata);
        if (res?.status === 200) {
          let finalData = {
            ...data,
            OrderVariantId: order_id?.id,
            images: [res?.data[0]?.id],
          };
          let res2 = await shipNowOrder(finalData);
          if (res2?.status === 200) {
            state.refreshOrderStats = true;
            state.refreshOrdersList = true;
            state.refreshOrdersDetails = true;
            thankyouModalHandler();
          } else {
            FailureAlert("Invalid Email Entered");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      FailureAlert("Please Add Image");
    }
  };

  const modalHandler = () => {
    state.showManualShipModal = false;
  };

  return (
    <SimpleModal closeModalHandler={modalHandler} modalSize={"max-w-2xl"}>
      <form
        onSubmit={handleSubmit(shippingHandler)}
        className="flex w-full flex-col gap-4 p-6"
      >
        <div className="w-full flex items-center gap-4">
          <InputComp
            size={"w-full flex flex-col gap-1"}
            label={"Courier Name"}
            require
            register={register}
            registerValue={"courierName"}
            errors={errors.courierName?.message}
          />

          <InputComp
            size={"w-full flex flex-col gap-1"}
            label={"Tracking ID"}
            require
            register={register}
            registerValue={"trackingId"}
            errors={errors.trackingId?.message}
          />
        </div>
        <div className="w-full flex items-center gap-4">
          <div className="w-full flex flex-col">
            <label>
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="w-full">
              <input
                className="w-full border-gray-200 "
                type="number"
                {...register("phone", {
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                  max: 10,
                })}
              />
              <p className="text-red-600 text-sm ">{errors.phone?.message}</p>
            </div>
          </div>

          <InputComp
            size={"w-full flex flex-col gap-1"}
            label={"Email"}
            require
            type={"email"}
            register={register}
            registerValue={"courierEmail"}
            errors={errors.courierEmail?.message}
          />
        </div>

        <MediaInput
          style={"w-full flex flex-col gap-1"}
          image={image}
          setImage={setImage}
          label={"Image"}
          required
        />

        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default ManualShippingModal;

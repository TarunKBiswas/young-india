import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  lengthMsg,
  phoneRegExp,
  reqMsg,
  thankyouModalHandler,
  uploadImage,
} from "../../../../utils/const_API";
import { createStaff } from "../../../../utils/usersAPI";
import { state } from "../../../../data/state";
import InputComp3 from "../../UI/Inputs/InputComp3";
import InputCompPhone from "../../UI/Inputs/InputCompPhone";
import MediaInput from "../../UI/Inputs/MediaInput";
import { SubmitButton } from "../../UI/Buttons/AddButton";
import SimpleModal from "../../Modals/SimpleModal";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  email: yup.string().required(reqMsg).max(200),
  password: yup.string().required(reqMsg).max(200),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
});

const AddStaffModal = () => {
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createStaffHandler = async (data) => {
    data.phone = "+91" + data.phone;
    closeModalHandler();

    try {
      if (avatar !== null) {
        const formdata = new FormData();
        formdata.append("file", avatar);
        let res = await uploadImage(formdata);
        if (res?.status === 200) {
          let finalData = {
            ...data,
            AvatarId: res?.data[0]?.id,
          };
          const res2 = await createStaff(finalData);
          if (res2?.status === 200) {
            thankyouModalHandler();
          }
        }
      } else {
        const res2 = await createStaff(data);
        if (res2?.status === 200) {
          thankyouModalHandler();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showAddStaffModal = false;
  };

  return (
    <SimpleModal modalSize={"max-w-2xl"} closeModalHandler={closeModalHandler}>
      <form
        className="w-full flex flex-col gap-4 p-6"
        onSubmit={handleSubmit(createStaffHandler)}
      >
        <InputComp3
          register={register}
          label={"Name"}
          registerValue={"name"}
          error={errors.name?.message}
        />

        <InputComp3
          register={register}
          type={"password"}
          label={"Password"}
          registerValue={"password"}
          error={errors.password?.message}
        />

        <InputCompPhone
          register={register}
          label={"Phone"}
          registerValue={"phone"}
          error={errors.phone?.message}
        />

        <InputComp3
          register={register}
          label={"Email"}
          registerValue={"email"}
          type={"email"}
          error={errors.email?.message}
        />
        <MediaInput label={"Image"} image={avatar} setImage={setAvatar} />

        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default AddStaffModal;

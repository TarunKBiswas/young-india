import SimpleModal from "../../Modals/SimpleModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  lengthMsg,
  phoneRegExp,
  reqMsg,
  thankyouModalHandler,
  uploadImage,
} from "../../../../utils/const_API";
import { createUser } from "../../../../utils/usersAPI";
import { state } from "../../../../data/state";
import InputComp3 from "../../UI/Inputs/InputComp3";
import InputCompPhone from "../../UI/Inputs/InputCompPhone";
import MediaInput from "../../UI/Inputs/MediaInput";
import { SubmitButton } from "../../UI/Buttons/AddButton";

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

const CreateUserModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [avatar, setAvatar] = useState(null);

  // const navigate = useNavigate();

  const userFormHandler = async (data) => {
    data.phone = "+91" + data.phone;
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
          const res2 = await createUser(finalData);
          if (res2?.status === 200) {
            // navigate("/users");
            state.showAddUserModal = false;
            thankyouModalHandler();
          }
        }
      } else {
        state.showAddUserModal = true;
        const res2 = await createUser(data);
        if (res2?.status === 200) {
          // navigate("/users");
          state.showAddUserModal = false;
          thankyouModalHandler();
        }
      }
    } catch (error) {
      state.showAddUserModal = true;
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showAddUserModal = false;
  };

  return (
    <SimpleModal modalSize={"max-w-2xl"} closeModalHandler={closeModalHandler}>
      <div className="w-full flex flex-col gap-4 max-w-3xl mx-auto p-6">
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(userFormHandler)}
        >
          <div className="w-full flex items-center gap-4">
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
          </div>

          <div className="w-full flex  items-center gap-4">
            <InputCompPhone
              register={register}
              label={"Phone"}
              registerValue={"phone"}
              error={errors.phone?.message}
              col={"flex-col"}
            />

            <InputComp3
              register={register}
              label={"Email"}
              registerValue={"email"}
              type={"email"}
              error={errors.email?.message}
            />
          </div>

          <MediaInput
            style={"flex-col"}
            label={"Image"}
            image={avatar}
            setImage={setAvatar}
            recSize={"Max 1mb"}
          />

          <SubmitButton />
        </form>
      </div>
    </SimpleModal>
  );
};

export default CreateUserModal;

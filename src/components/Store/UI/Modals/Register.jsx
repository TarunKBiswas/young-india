/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { webState } from "../../../../data/webStates";
// import { registerInfo } from "../../../../utils/Store/login";
// import { notify } from "../HotToast";
import { FailureAlert } from "../../../Toast";
import Input from "../Inputs/Input";
import { editProfile } from "../../../../utils/Store/Setting";
import { useEffect, useState } from "react";

const validationSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [id, setId] = useState(null);

  const userData = sessionStorage.getItem("userdata");

  useEffect(() => {
    if (userData) {
      const userData = JSON.parse(sessionStorage.getItem("userdata"));
      setId(userData?.id);
    }
  }, [userData]);

  const registerationHandler = async (data) => {
    try {
      let res = await editProfile(id, data);
      console.log(res);
      if (res?.status === 200) {
        sessionStorage.setItem("userdata", JSON.stringify(res.data.data));
        webState.userData = res.data.data;
        // SuccessAlert("Details Uploaded");
        webState.showFlipModal = false;
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      FailureAlert(error?.error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center sm:rounded-lg w-full px-10 mt-6 md:px-0">
      <form onSubmit={handleSubmit(registerationHandler)} className="w-full">
        <div className="w-full flex flex-col max-w-[350px] mx-auto gap-4">
          <div className="w-full flex flex-col gap-2">
            {/* <h2 className="text-center text-3xl font-bold tracking-tight sm:text-neutral-700 ">
              Register
            </h2> */}
            <label
              htmlFor="password"
              className="flex flex-col justify-center items-center text-xs font-normal text-black text-opacity-80 leading-tight "
            >
              {/* Welcome!! Let’s do Earning & Shopping. */}
              <h2 className="text-center text-xl font-bold tracking-tight sm:text-neutral-700">
                Please Enter Name & Email
              </h2>
              <span className="text-sm">(This is one time process)</span>
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              inputId="userName"
              label={"Name"}
              register={register}
              value={"name"}
              error={errors.name?.message}
            />
            <Input
              type={"email"}
              inputId="userEmail"
              label={"Email"}
              register={register}
              value={"email"}
              error={errors.email?.message}
            />
            {/* <Input
              type={"tel"}
              inputId="userPhone"
              label={"mobile number"}
              register={register}
              value={"phone"}
              error={errors.phone?.message}
            /> */}
          </div>
          <div className="flex flex-col gap-1">
            <button
              id="sign-in-button"
              className="bg-themecolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              <span>Continue</span>
            </button>
            {/* <small onClick={handleFlip} className="w-full text-right text-xs">
              Already a user?{" "}
              <span className="underline cursor-pointer">Click here</span>.
            </small> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

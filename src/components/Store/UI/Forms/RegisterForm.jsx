import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerInfo } from "../../../../utils/Store/login";
import { webState } from "../../../../data/webStates";
import { notify } from "../HotToast";
import { FailureAlert } from "../../../Toast";
import Input from "../Inputs/Input";

const validationSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number cannot exceed 12 digits")
    .required("Phone Number is required"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const registerationHandler = async (data) => {
    webState.userPhoneNumber = data?.phone;
    try {
      let finalData = {
        ...data,
        phone: `+91 ${data?.phone}`,
      };
      let res = await registerInfo(finalData);

      if (res?.status === 200) {
        notify("Register successfully!");
        // navigate("/storelogin");
        // webState.showLoginModal = true;
        webState.showFlipModal = true;
      } else {
        FailureAlert(res?.response?.data?.error?.message);
      }
    } catch (error) {
      console.log(error);
      FailureAlert(error?.error?.message);
    }
  };

  const loginRedirectHandler = () => {
    // navigate("/storelogin");
    // webState.showLoginModal = true;
    webState.showFlipModal = true;
  };

  return (
    <div className="w-full flex items-center justify-center px-2 my-16">
      <div className="w-full max-w-lg bg-white border py-6 px-8 shadow rounded">
        <div className="bg-white py-6  w-full h-auto">
          <form onSubmit={handleSubmit(registerationHandler)}>
            <div className="space-y-6">
              <h2 className=" text-center text-3xl font-bold tracking-tight sm:text-neutral-700 ">
                Register
              </h2>
              <div className="flex flex-col gap-3">
                <Input
                  type={"name"}
                  label={"Name"}
                  register={() => {
                    return { ...register("name") };
                  }}
                  error={errors.name?.message}
                />

                <Input
                  type={"password"}
                  label={"Password"}
                  register={() => {
                    return { ...register("password") };
                  }}
                  error={errors.password?.message}
                />

                <Input
                  type={"email"}
                  label={"Email"}
                  register={() => {
                    return { ...register("email") };
                  }}
                  error={errors.email?.message}
                />
                <Input
                  type={"tel"}
                  label={"Phone"}
                  register={() => {
                    return { ...register("phone") };
                  }}
                  error={errors.phone?.message}
                />
              </div>
              <button
                id="sign-in-button"
                className="bg-themecolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              >
                <span>Register</span>
              </button>
              <div className="flex flex-col items-center justify-center gap-1 mt-3">
                <p className="text-base font-semibold">OR</p>
                <p
                  className="text-sm font-normal cursor-pointer"
                  onClick={loginRedirectHandler}
                >
                  Login
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

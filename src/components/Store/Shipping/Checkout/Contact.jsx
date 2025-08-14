/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
import { webState } from "../../../../data/webStates";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Inputs/Input";

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
const Contact = ({ contactRef, registerationHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const navigate = useNavigate();

  const userLoginHandler = () => {
    webState.previousRoute = window.location.pathname;
    // navigate("/storelogin");
    // webState.showLoginModal = true;
    webState.showFlipModal = true;
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-1 bg-white ">
      <div className="w-full flex items-center justify-between">
        <span className="text-xl text-themecolor font-medium cursor-pointer flex items-center ">
          Contact
        </span>
        <span className="text-xs">
          Have an Account?{" "}
          <span
            className="text-indigo-500 underline pl-1 cursor-pointer text-xs"
            onClick={userLoginHandler}
          >
            Sign in
          </span>
        </span>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(registerationHandler)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
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
              label={"Create Password"}
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
          <button ref={contactRef} type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

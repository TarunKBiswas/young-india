import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { FailureAlert } from "../../../Toast";
import { webState } from "../../../../data/webStates";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormButton } from "../Buttons";
import { login } from "../../../../utils/Store/login";
import InputComp from "../../../Admin/UI/Inputs/InputComp";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Msg91StoreLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (data) => {
    setLoading(true);
    try {
      let res = await login(data);
      if (res?.status === 200) {
        sessionStorage.setItem("usertoken", res?.data?.data?.jwt);
        setLoading(false);
        webState.resellerToken = res?.data?.data?.jwt;
        webState.loggedinUserData = res?.data?.data?.user;
        navigate("/");
      } else {
        FailureAlert(res?.response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const registerRedirectHandler = () => {
    navigate("/register");
  };

  return (
    <div className=" w-full flex items-center justify-center px-2 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md bg-white border py-6 px-8 shadow rounded sm:px-10  h-auto my-24">
        <div className="space-y-6">
          <FormButton
            title={"Login"}
            description={"Welcome back !! Let's get back to shopping"}
          />
          <form
            onSubmit={handleSubmit(loginHandler)}
            className="flex flex-col items-centre justify-center gap-4"
          >
            <InputComp
              type={"email"}
              label={"Email"}
              require
              register={register}
              registerValue={"email"}
              error={errors.email?.message}
            />

            <InputComp
              type={"password"}
              label={"Password"}
              require
              register={register}
              registerValue={"password"}
              error={errors.password?.message}
            />

            <button className="bg-themecolor w-full flex gap-1 items-center justify-center py-2.5 text-white mt-2 rounded">
              {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
              <span>Login</span>
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 mt-3">
          <p className="text-base font-semibold">OR</p>
          <p
            className="text-sm font-normal cursor-pointer"
            onClick={registerRedirectHandler}
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Msg91StoreLogin;

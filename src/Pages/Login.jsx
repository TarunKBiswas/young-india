import { useEffect, useState } from "react";
import { state } from "../data/state";
import { login } from "../utils/Auth";
import { SuccessAlert } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { getGlobalBrand } from "../utils/settings";
import "./Login.css";
import logo from "../assets/logoblue.svg";
import creative from "../assets/logincreative.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [identifier, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);

  const [brand, setBrand] = useState(null);

  const passwordHandler = () => {
    setShowPassWord(!showPassWord);
  };

  const navigate = useNavigate();

  const getBrandDetails = async () => {
    try {
      let res = await getGlobalBrand();
      setBrand(res?.data?.data);
      state.brandInfo = res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrandDetails();
  }, []);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    link.href = brand?.favicon?.url;
    document.title = brand?.name || brand?.tagline || "Socialseller MAX";
  }, [brand]);

  const loginHandler = async () => {
    try {
      const res = await login(identifier, password);

      if (res?.status === 200) {
        state.adminInfo = res?.data?.data;
        navigate("/");
        SuccessAlert("Login Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#2563EB0D] h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto flex lg:flex-row justify-between px-5 lg:px-0">
        <div className="hidden lg:flex flex-col gap-10 lg:gap-16 item-center text-center justify-center w-full max-w-[500px]">
          <div className="h-11 w-full max-w-sm mx-auto">
            <img
              src={logo}
              alt="Social Seller"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-full">
            <img
              src={creative}
              alt="Social Seller"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="p-5 lg:px-10 lg:py-12 flex flex-col w-full shadow-[0px_5px_20px_-1px_#0000001A] bg-white rounded-[22px] max-w-md">
          <div className="w-full flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl lg:text-[32px] lg:leading-9 font-bold">
                Sign In
              </h3>
              <p className="text-[#222222B2]">
                Please fill your details to sign in.
              </p>
            </div>
            <div className="flex flex-col justify-between h-full w-full">
              <div className="flex flex-col gap-5">
                <div className="inputGroup">
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={identifier}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  {/* <label>Email</label> */}
                </div>

                <div className="inputGroup">
                  <input
                    type={showPassWord ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <label>Password</label> */}
                  <span
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                    onClick={passwordHandler}
                  >
                    {showPassWord ? (
                      <BsEyeSlash className="cursor-pointer" />
                    ) : (
                      <BsEye className="cursor-pointer" />
                    )}
                  </span>
                </div>

                <div className="w-full flex flex-col mt-3 gap-3 items-center justify-center">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center font-medium h-11 bg-[#2563EB] text-white rounded-full"
                    onClick={loginHandler}
                  >
                    Sign in
                  </button>

                  <span
                    className="cursor-pointer text-sm text-[#2563EBB2]"
                    onClick={() => (state.showForgetOtpModal = true)}
                  >
                    Forget Password ?
                  </span>
                </div>
              </div>
              <p className="text-[#22222299] text-center">
                <Link
                  className="underline opacity-80"
                  to={"https://register.socialseller.in/terms"}
                  target="_blank"
                >
                  terms & conditions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

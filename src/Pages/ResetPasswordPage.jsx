import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/Auth";
import { FailureAlert } from "../components/Toast";
import { state } from "../data/state";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const passwordResetToken = query.get("password_reset_token");
  const email = query.get("email");
  const navigate = useNavigate();

  const resethandler = async () => {
    if (password === cPassword) {
      try {
        const res = await resetPassword({
          token: passwordResetToken,
          email: email,
          data: password,
        });

        if (res?.status === 200) {
          navigate("/auth");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      FailureAlert("Password and confirm password not match");
    }
  };

  return (
    <div className="bg-[#2563EB] h-screen w-full bg-themecolor flex flex-col items-center justify-center bg_pattern">
      <div className="w-full py-8 mt-2 3xl:py-14 3xl:mt-0 3xl:px-10 px-6 bg-white rounded-xl max-w-lg border shadow-solid">
        <div className="w-full flex items-center justify-center  mb-2">
          <p className=" text-2xl font-semibold mt-1">
            Please Create New Passowrd
          </p>
        </div>
        <div className="space-y-6 mt-4">
          <div className="">
            <label className="text-sm font-medium text-gray-700 tracking-wide">
              New Password
            </label>
            <input
              className="w-full text-base px-4 py-2 border  border-gray-300 rounded focus:outline-none focus:border-green-400"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="">
            <label className="text-sm font-medium text-gray-700 tracking-wide">
              Confirm New Password
            </label>
            <input
              className="w-full text-base px-4 py-2 border  border-gray-300 rounded focus:outline-none focus:border-green-400"
              type="text"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <div
            className="w-full flex justify-center bg-[#222222] text-gray-100 p-3  rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-300"
            onClick={resethandler}
          >
            Change Password
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

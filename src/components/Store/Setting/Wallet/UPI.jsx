import payment from "../../../../assets/website/payment.jpg";
import { CheckOutButton } from "../../UI/Buttons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { walletWithdraw } from "../../../../utils/Store/Setting";
import { webState } from "../../../../data/webStates";
import { FailureAlert, SuccessAlert } from "../../../Toast";
import { useSnapshot } from "valtio";
import Wallet from "../../UI/Icon/Wallet";

const amountValidation = (walletBalance) =>
  yup
    .number()
    .max(walletBalance, `Amount cannot exceed ${walletBalance}`)
    .required("Amount is required");

const UPI = () => {
  const snap = useSnapshot(webState);
  const userInfo = snap?.userData?.data;

  const validationSchema = yup.object().shape({
    upi_address: yup
      .string()
      .matches(/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/, "Invalid UPI Address")
      .required("UPI Addresss is required"),
    amount: amountValidation(userInfo?.wallet_balance),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const upiID = async (data) => {
    const finalData = { ...data, mode: "upi" };
    try {
      let res = await walletWithdraw(finalData);
      if (res?.status === 200) {
        SuccessAlert("Your UPI has been initialized");
      } else {
        FailureAlert(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-2">
      <div className="text-neutral-800 text-xl font-normal leading-normal">
        UPI Details
      </div>
      <form onSubmit={handleSubmit(upiID)}>
        <div className="flex flex-col items-center w-full mb-3 gap-2">
          <div className="flex border  items-center px-2 text-[14px] relative w-full">
            <img
              src={payment}
              className="w-16 object-contain absolute "
              width={"auto"}
              height={"auto"}
              alt="image"
            />
            <input
              type="text"
              placeholder="UPI Address "
              className="border-none  w-full inputStyle ps-16"
              id="upi_address"
              {...register("upi_address")}
            />
          </div>
          <div>
            {errors.upi_address && (
              <div className="errorMessage">{errors.upi_address.message}</div>
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="flex border items-center  px-2 text-[14px] relative w-full">
              <div className="left-2 h-full top-1 flex items-center justify-center absolute">
                <Wallet className="w-4 h-4 mb-2" />
              </div>
              <input
                type="text"
                placeholder="Amount Withdraw"
                className="border-none  w-full inputStyle "
                id="amount"
                {...register("amount")}
              />
            </div>
            {errors.amount && (
              <div className="errorMessage">{errors.amount.message}</div>
            )}
          </div>
        </div>
        <CheckOutButton type="submit" text={"Withdraw"} style={"w-full "} />
      </form>
    </div>
  );
};

export default UPI;

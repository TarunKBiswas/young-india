import { AiOutlineBank } from "react-icons/ai";
import { CheckOutButton } from "../../UI/Buttons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { walletWithdraw } from "../../../../utils/Store/Setting";
import { FailureAlert, SuccessAlert } from "../../../Toast";
import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";

const amountValidation = (walletBalance) =>
  yup
    .number()
    .max(walletBalance, `Amount cannot exceed ${walletBalance}`)
    .required("Amount is required");

const BankDetail = () => {
  const snap = useSnapshot(webState);
  const userInfo = snap.userData?.data;

  const validationSchema = yup.object().shape({
    // name: yup.string().required("Account Holder Name is required"),
    account_number: yup.string().required("Account Number is required"),
    ifsc: yup.string().required("IFSC Code is required"),
    amount: amountValidation(userInfo?.wallet_balance),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const BankDetailsHandler = async (data) => {
    const finalData = { ...data, mode: "bank" };
    try {
      let res = await walletWithdraw(finalData);
      if (res?.status === 200) {
        SuccessAlert("Your Payout has been initialized");
      } else {
        FailureAlert(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="w-full mt-2">
      <span className="text-[20px] font-normal tracking-wide">
        Bank Account Details
      </span>
      <form action="" onSubmit={handleSubmit(BankDetailsHandler)}>
        <div className="flex flex-col gap-3 mt-3 ">
          {/* <BankDetailsInput
            Icon={FaUserAlt}
            register={register}
            placeholder={"Account Holder Name"}
            errors={errors.name?.message}
            registerValue={"name"}
          /> */}
          <div className="flex flex-col items-center w-full">
            <div className="flex border items-center px-2 text-[14px] relative  w-full">
              <AiOutlineBank className="w-4 h-4 absolute" />
              <input
                type="number"
                placeholder="Account Number"
                className="border-none  w-full inputStyle"
                id="account_number"
                {...register("account_number")}
              />
            </div>
            {errors.account_number && (
              <div className="errorMessage">
                {errors.account_number.message}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="flex border items-center px-2 text-[14px] relative w-full">
              <AiOutlineBank className="w-4 h-4 absolute" />
              <input
                type="text"
                placeholder="IFSC Code"
                className="border-none  w-full inputStyle "
                id="ifsc"
                {...register("ifsc")}
              />
            </div>
            {errors.ifsc && (
              <div className="errorMessage">{errors.ifsc.message}</div>
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="flex border items-center px-2 text-[14px] relative w-full">
              <AiOutlineBank className="w-4 h-4 absolute" />
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
        <CheckOutButton
          type="submit"
          text={"Withdraw"}
          style={" flex items-center justify-center mt-4 w-full "}
        />
      </form>
    </div>
  );
};

export default BankDetail;

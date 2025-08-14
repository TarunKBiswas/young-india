import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUsers } from "../../../utils/usersAPI.js";
import { state } from "../../../data/state.js";
import { postWallet } from "../../../utils/wallet.js";
import DataDropDown from "../UI/DataDropDown.jsx";
import SimpleModal from "../Modals/SimpleModal.jsx";
import InputComp3 from "../UI/Inputs/InputComp3.jsx";
import { SuccessAlert } from "../../Toast.jsx";
import { reqMsg } from "../../../utils/const_API.js";
import { SubmitButton } from "../UI/Buttons/AddButton.jsx";

const schema = yup.object({
  amount: yup.string().required(reqMsg),
  remark: yup.string().required(reqMsg),
});

const AddWalletData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsersList = async () => {
    const res = await getUsers();
    setAllUsers(res?.data?.data);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const submitHandler = async (data) => {
    closeModalHandler();

    try {
      let finalData = {
        ...data,
        StoreUserId: selectedUser?.id,
      };
      let res = await postWallet(finalData);
      if (res?.status === 200) {
        SuccessAlert("Wallet Added");
        state.refreshWalletList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showAddWalletModal = false;
  };

  return (
    <>
      <SimpleModal
        closeModalHandler={closeModalHandler}
        modalSize={"max-w-2xl"}
      >
        <form
          className="p-4 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="w-full flex flex-col gap-1">
            <label className=" font-medium">
              User<span className="text-red-500">*</span>
            </label>
            <div className="w-full">
              <DataDropDown
                data={allUsers}
                selected={selectedUser}
                setSelected={setSelectedUser}
              />
            </div>
          </div>

          <InputComp3
            register={register}
            registerValue={"amount"}
            label={"Amount"}
            type={"number"}
            error={errors.amount?.message}
          />

          <div className="w-full flex flex-col">
            <label className=" ">
              Remark<span className="text-red-500">*</span>
            </label>
            <div className="col-sm-9">
              <textarea
                className="formInput"
                type="text"
                placeholder="Remark"
                {...register("remark")}
              />
              <p className="text-red-600 text-sm ">{errors.remark?.message}</p>
            </div>
          </div>

          <SubmitButton />
        </form>
      </SimpleModal>
    </>
  );
};

export default AddWalletData;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnapshot } from "valtio";
import { state } from "../../../../data/state";
import { editUser, getSingleUserDetails } from "../../../../utils/usersAPI";
import {
  lengthMsg,
  phoneRegExp,
  reqMsg,
  thankyouModalHandler,
  uploadImage,
} from "../../../../utils/const_API";
import { FailureAlert } from "../../../Toast";
import MediaInputUpdate from "../../UI/Inputs/MediaInputUpdate";
import SimpleModal from "../../Modals/SimpleModal";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  email: yup.string().required(reqMsg).max(200),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
});

const EditUserModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => await getUserDetails(),
  });

  const snap = useSnapshot(state);
  const id = snap.selectedUserID;

  const [userDetails, setUserDetails] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = await getSingleUserDetails(id);

      if (res?.status === 200) {
        setUserDetails(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateUserHanlder = async (data) => {
    state.showEditUserModal = false;
    try {
      if (avatar !== null) {
        const formdata = new FormData();
        formdata.append("file", avatar);
        let res = await uploadImage(formdata);
        if (res?.status === 200) {
          let fData = { ...data, AvatarId: res?.data[0]?.id };
          const res2 = await editUser(id, fData);
          if (res2 === true) {
            state.refreshUsersTable = true;
            thankyouModalHandler();
          }
        }
      } else {
        const res = await editUser(id, data);
        if (res === true) {
          state.refreshUsersTable = true;
          thankyouModalHandler();
        }
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing Went Wrong");
    }
  };

  const modalHandler = () => {
    state.showEditUserModal = false;
  };

  return (
    <>
      <SimpleModal modalSize={"max-w-2xl"} closeModalHandler={modalHandler}>
        <div className="w-full flex flex-col gap-4 max-w-3xl mx-auto p-6">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(updateUserHanlder)}
          >
            <div className="w-full flex flex-col items-start gap-1">
              <label className="w-full">
                Name<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  className="formInput"
                  type="text"
                  placeholder="Name"
                  {...register("name", { value: userDetails?.name })}
                  defaultValue={userDetails?.name}
                />
                <p className="text-red-600 text-sm">{errors.name?.message}</p>
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-1">
              <label className="w-full">
                Phone<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  className="formInput"
                  type="number"
                  placeholder="Number"
                  {...register("phone", { value: userDetails?.phone })}
                  defaultValue={userDetails?.phone}
                />
                <p className="text-red-600 text-sm">{errors.phone?.message}</p>
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-1">
              <label className="w-full">
                Email<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  className="formInput"
                  type="email"
                  placeholder="Email"
                  {...register("email", { value: userDetails?.email })}
                  defaultValue={userDetails?.email}
                />
                <p className="text-red-600 text-sm">{errors.email?.message}</p>
              </div>
            </div>

            <MediaInputUpdate
              style={"flex-col"}
              label={"Avatar"}
              state={avatar}
              setState={setAvatar}
              size={"w-52"}
              image={
                userDetails?.avatar === null
                  ? userDetails?.avatar
                  : userDetails?.avatar?.url
              }
            />

            <div className="w-full flex items-center justify-end">
              <button className="submitButton">Submit</button>
            </div>
          </form>
        </div>
      </SimpleModal>
    </>
  );
};

export default EditUserModal;

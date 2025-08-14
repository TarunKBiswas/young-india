/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { postAddress } from "../../../utils/addresses.js";
import { SuccessAlert } from "../../Toast.jsx";
import CloseModalButton from "../UI/Buttons/CloseModalButton.jsx";
import FormModal from "../Modals/FormModal.jsx";
import { getUsers } from "../../../utils/usersAPI.js";
import DataDropDown from "../UI/DataDropDown.jsx";
import { thankyouModalHandler } from "../../../utils/const_API.js";

const reqMsg = "It is required";
const lengthMsg = (length) => {
  return `Must be at least ${length} characters long.`;
};

const schema = yup.object({
  name: yup.string().required(reqMsg),
  houseNumber: yup.string().required(reqMsg),
  addressLine1: yup.string().required(reqMsg).min(10, lengthMsg(10)),
  pincode: yup.string().required(reqMsg),
  state: yup.string().required(reqMsg),
  country: yup.string().required(reqMsg),
  area: yup.string().required(reqMsg),
  city: yup.string().required(reqMsg),
});

const AddAddressModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsersList = async () => {
    try {
      const res = await getUsers();

      if (res?.status === 200) {
        setAllUsers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const addNewAddressHandler = async (data) => {
    let finalData = { ...data, user: selectedUser?.id };
    state.showAddAddressModal = false;

    try {
      const res = await postAddress(finalData);
      if (res?.status === 200) {
        state.refreshAddressList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addressModalHandler = () => {
    state.showAddAddressModal = false;
  };

  return (
    <>
      <FormModal
        closeModalHandler={addressModalHandler}
        title={"Add New Address"}
      >
        <form
          className="theme-form theme-form-2 mega-form"
          onSubmit={handleSubmit(addNewAddressHandler)}
        >
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4">
              <div className="col-sm-6">
                <label htmlFor="">
                  User<span className="text-red-500">*</span>
                </label>
                <DataDropDown
                  data={allUsers}
                  selected={selectedUser}
                  setSelected={setSelectedUser}
                />
              </div>
              <div className="col-sm-5">
                <label htmlFor="">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                />
                <p className="text-red-600 text-sm ">{errors.name?.message}</p>
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-6">
                <label htmlFor="">
                  House Number<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="House Number"
                  {...register("houseNumber")}
                />
                <p className="text-red-600 text-sm ">
                  {errors.houseNumber?.message}
                </p>
              </div>
              <div className="col-sm-5">
                <label htmlFor="">
                  Address Line 1<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address Line 1"
                  {...register("addressLine1")}
                />
                <p className="text-red-600 text-sm ">
                  {errors.addressLine1?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-6">
                <label htmlFor="">Address Line 2</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address Line 2"
                  {...register("addressLine2")}
                />
              </div>

              <div className="col-sm-5">
                <label htmlFor="">
                  Pincode<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Pincode"
                  {...register("pincode")}
                />
                <p className="text-red-600 text-sm ">
                  {errors.pincode?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-6">
                <label htmlFor="">
                  Area<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Area"
                  {...register("area")}
                />
                <p className="text-red-600 text-sm ">{errors.area?.message}</p>
              </div>

              <div className="col-sm-5">
                <label htmlFor="">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  {...register("city")}
                />
                <p className="text-red-600 text-sm ">{errors.city?.message}</p>
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-6">
                <label htmlFor="">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="State"
                  {...register("state")}
                />
                <p className="text-red-600 text-sm ">{errors.state?.message}</p>
              </div>
              <div className="col-sm-5">
                <label htmlFor="">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Country"
                  {...register("country")}
                />
                <p className="text-red-600 text-sm ">
                  {errors.country?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-end pt-4 pr-4">
            <button className="submitButton w-full">Create</button>
          </div>
        </form>
      </FormModal>
    </>
  );
};

export default AddAddressModal;

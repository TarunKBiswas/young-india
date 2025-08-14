/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getSingleAddress, updateAddress } from "../../../utils/addresses.js";
import { useSnapshot } from "valtio";
import FormModal from "../Modals/FormModal.jsx";
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

const UpdateAddressModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => await getAddress(),
  });

  const [addressDetails, setAddressDetails] = useState(null);
  const snap = useSnapshot(state);
  const id = snap.selectedAddressID;

  const getAddress = async () => {
    try {
      const res = await getSingleAddress(id);
      if (res?.status === 200) {
        setAddressDetails(res?.data?.data?.attributes);
        return res?.data?.data?.attributes;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (addressDetails === null) {
      getAddress();
    }
  }, [addressDetails]);

  const updateAddressHandler = async (data) => {
    state.showEditAddressModal = false;

    try {
      const res = await updateAddress(id, data);
      if (res?.status === 200) {
        state.refreshAddressList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addressModalHandler = () => {
    state.showEditAddressModal = false;
  };

  return (
    <>
      <FormModal
        closeModalHandler={addressModalHandler}
        title={"Update New Address"}
      >
        <form
          className="theme-form theme-form-2 mega-form"
          onSubmit={handleSubmit(updateAddressHandler)}
        >
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-5">
                <label htmlFor="">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  defaultValue={addressDetails?.name}
                  {...register("name", { value: addressDetails?.name })}
                />
                <p className="text-red-600 text-sm ">{errors.name?.message}</p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="">
                  House Number<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="House Number"
                  {...register("houseNumber", {
                    value: addressDetails?.houseNumber,
                  })}
                  defaultValue={addressDetails?.houseNumber}
                />
                <p className="text-red-600 text-sm">
                  {errors.houseNumber?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-5">
                <label htmlFor="">
                  Address Line 1<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address Line 1"
                  {...register("addressLine1", {
                    value: addressDetails?.addressLine1,
                  })}
                  defaultValue={addressDetails?.addressLine1}
                />
                <p className="text-red-600 text-sm ">
                  {errors.addressLine1?.message}
                </p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="">Address Line 2</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address Line 2"
                  {...register("addressLine2", {
                    value: addressDetails?.addressLine2,
                  })}
                  defaultValue={addressDetails?.addressLine2}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-5">
                <label htmlFor="">
                  Pincode<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Pincode"
                  {...register("pincode", { value: addressDetails?.pincode })}
                  defaultValue={addressDetails?.pincode}
                />
                <p className="text-red-600 text-sm ">
                  {errors.pincode?.message}
                </p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="">
                  Area<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Area"
                  {...register("area", { value: addressDetails?.area })}
                  defaultValue={addressDetails?.area}
                />
                <p className="text-red-600 text-sm ">{errors.area?.message}</p>
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4">
              <div className="col-sm-5">
                <label htmlFor="">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  {...register("city", { value: addressDetails?.city })}
                  defaultValue={addressDetails?.city}
                />
                <p className="text-red-600 text-sm ">{errors.city?.message}</p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="State"
                  {...register("state", { value: addressDetails?.state })}
                  defaultValue={addressDetails?.state}
                />
                <p className="text-red-600 text-sm ">{errors.state?.message}</p>
              </div>
            </div>
          </div>
          <div className="mb-4 row align-items-center">
            <div className="col-sm-12 flex items-end gap-4 ">
              <div className="col-sm-5">
                <label htmlFor="">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Country"
                  {...register("country", { value: addressDetails?.country })}
                  defaultValue={addressDetails?.country}
                />
                <p className="text-red-600 text-sm ">
                  {errors.country?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-end">
            <button className="submitButton">Submit</button>
          </div>
        </form>
      </FormModal>
    </>
  );
};

export default UpdateAddressModal;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import ModalBody from "./ModalBody";
import { useEffect, useState } from "react";
import {
  getAddressSingle,
  updateAddress,
} from "../../../../utils/Store/Address";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { lengthMsg, reqMsg } from "../../../../utils/Store/Constant";
import { ApplyButton } from "../Buttons";
import { SuccessAlert } from "../../../Toast";

const schema = yup.object({
  name: yup.string().required(reqMsg),
  // houseNumber: yup.string().required(reqMsg),
  addressLine1: yup.string().required(reqMsg).min(10, lengthMsg(10)),
  city: yup.string().required(reqMsg),
});

const EditAddressModal = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const snap = useSnapshot(webState);
  const [addressDetails, setAddressDetails] = useState(null);
  let id = snap.selectedID;

  const closeModalHandler = () => {
    webState.showEditAddressModal = false;
  };

  const getAddress = async () => {
    try {
      const res = await getAddressSingle(id);
      if (res?.status === 200) {
        setAddressDetails(res?.data?.data);
        setValue("name", res?.data?.data?.name);
        // setValue("houseNumber", res?.data?.data?.houseNumber);
        setValue("addressLine1", res?.data?.data?.addressLine1);
        setValue("city", res?.data?.data?.city);
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const updateAddressHandler = async (data) => {
    closeModalHandler();
    // console.log(data);

    try {
      const res = await updateAddress(id, data);
      console.log(res);
      if (res?.status === 200) {
        SuccessAlert("Address Updated successfully");
        webState.refreshAddressList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalBody closeModalHandler={closeModalHandler}>
      <form
        className="w-full flex flex-col items-start gap-3 mt-8"
        onSubmit={handleSubmit(updateAddressHandler)}
      >
        <input
          type="text"
          className="w-full outline-none rounded-md border-gray-300 text-sm h-12 focus:outline-none"
          placeholder="Name"
          {...register("name", { value: addressDetails?.name })}
        />
        {/* <input
          type="text"
          className="w-full outline-none rounded-md border-gray-300 text-sm h-12"
          placeholder="House No."
          {...register("houseNumber", { value: addressDetails?.houseNumber })}
        /> */}
        <textarea
          rows={"4"}
          type="text"
          className="w-full outline-none rounded-md border-gray-300 text-sm"
          placeholder="Address Line 1"
          {...register("addressLine1", { value: addressDetails?.addressLine1 })}
        />
        {/* <textarea
          type="text"
          className="w-full outline-none rounded-md border-gray-300 text-sm h-12"
          placeholder="Address Line 2 (Optional)"
          defaultValue={addressDetails?.addressLine2}
          {...register("addressLine2", { value: addressDetails?.addressLine2 })}
        /> */}
        <input
          type="text"
          className="w-full outline-none rounded-md border-gray-300 text-sm h-12"
          placeholder="City"
          {...register("city", { value: addressDetails?.city })}
        />
        <div className="w-full flex items-center justify-end">
          <ApplyButton text={"Update"} />
        </div>
      </form>
    </ModalBody>
  );
};

export default EditAddressModal;

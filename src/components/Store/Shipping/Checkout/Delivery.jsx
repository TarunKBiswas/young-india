/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  lengthMsg,
  phoneRegExp,
  reqMsg,
} from "../../../../utils/Store/Constant";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  houseNumber: yup.string().required(reqMsg),
  addressLine1: yup.string().required(reqMsg).min(10, lengthMsg(10)),
  pincode: yup.string().required(reqMsg),
  area: yup.string().required("Please Select Area"),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
});

const Delivery = ({
  deliveryRef,
  addresses,
  retrievePincode,
  pinCodeApi,
  addAddressHandler,
  setPincode,
  setArea,
  showAddress,
  showAddressForm,
  showAddressFormHandler,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="w-full flex flex-col items-start bg-white mt-3">
      <div className="w-full flex items-center gap-2  cursor-pointer">
        <span
          className="text-lg text-darkText font-medium flex items-center gap-2"
          onClick={showAddressFormHandler}
        >
          Add Address
          <span className="text-xl">{!showAddressForm ? " - " : " + "}</span>
        </span>
      </div>

      {!showAddressForm ? (
        <form
          className="w-full flex flex-col gap-2 mt-2 "
          onSubmit={handleSubmit(addAddressHandler)}
        >
          <div className="flex w-full gap-3 mb-2">
            <div className="w-full flex flex-col ">
              <label
                htmlFor="price"
                className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                className="webInput text-sm focus:outline-none w-full"
                placeholder="Name"
                {...register("name")}
              />
              <p className="text-red-600 text-sm ">{errors.name?.message}</p>
            </div>
            <div className="w-full flex flex-col ">
              <label
                htmlFor="price"
                className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
              >
                Phone
              </label>
              <input
                type="text"
                className="webInput text-sm focus:outline-none w-full"
                placeholder="Phone"
                {...register("phone", {
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                  max: 10,
                })}
              />
              <p className="text-red-600 text-xs md:text-sm ">
                {errors.phone?.message}
              </p>
            </div>
          </div>
          {/* <div className="flex w-full gap-3 mb-2"> */}
          {/* <div className="w-full flex flex-col ">
              <input
                type="text"
                className="webInput text-sm focus:outline-none w-full"
                placeholder="Phone"
                {...register("phone", {
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                  max: 10,
                })}
              />
              <p className="text-red-600 text-xs md:text-sm ">
                {errors.phone?.message}
              </p>
            </div> */}
          {/* </div> */}
          <div className="flex w-full gap-3 mb-2">
            <div className="w-full flex flex-col ">
              <label
                htmlFor="price"
                className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
              >
                House No
              </label>
              <input
                type="text"
                className="webInput text-sm w-full"
                placeholder="House No."
                {...register("houseNumber")}
              />
              <p className="text-red-500 text-xs  ">
                {errors.houseNumber?.message}
              </p>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="price"
                className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
              >
                Address
              </label>
              <textarea
                type="text"
                className="webInput text-sm w-full scrollbar-hide"
                placeholder="Address Line 1"
                {...register("addressLine1")}
              />
              <p className="text-red-500 text-xs ">
                {errors.addressLine1?.message}
              </p>
            </div>
            {/* 
            <div className="w-full flex flex-col ">
              <textarea
                rows="4"
                cols="50"
                type="text"
                className="webInput text-sm w-full scrollbar-hide "
                placeholder="Address Line 2 "
                {...register("addressLine2")}
              />
            </div> */}
          </div>
          <div className="flex w-full gap-3 ">
            <div className="w-full flex flex-col ">
              <label
                htmlFor="price"
                className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
              >
                Pincode
              </label>
              <input
                type="number"
                className="webInput text-sm w-full "
                placeholder="Pincode"
                {...register("pincode", {
                  onChange: (e) => {
                    if (e.target.value?.length === 6) {
                      retrievePincode(e.target.value);
                      setPincode(e.target.value);
                    }
                  },
                })}
              />
              <p className="text-red-500 text-xs ">{errors.pincode?.message}</p>
            </div>

            {pinCodeApi ? (
              <div className="w-full relative mb-2">
                <label
                  htmlFor="price"
                  className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
                >
                  Select Area
                </label>
                <select
                  className="webInput text-sm w-full py-2"
                  {...register("area", {
                    onChange: (e) => {
                      setArea(e.target.value);
                    },
                  })}
                >
                  <option value="">Select Area</option>
                  {pinCodeApi?.map((obj, i) => (
                    <option key={i} value={obj?.Name} selected>
                      {obj?.Name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs ">{errors.area?.message}</p>
              </div>
            ) : null}
          </div>

          <button ref={deliveryRef} type="submit"></button>
        </form>
      ) : null}
    </div>
  );
};

export default Delivery;

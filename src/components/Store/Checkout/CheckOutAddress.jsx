/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  creatAddress,
  fetchAreaData,
  getAddress,
} from "../../../utils/Store/Address";
import YourAddressCard from "../Setting/Addresses/YourAddressCard";
import { webState } from "../../../data/webStates";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { lengthMsg, phoneRegExp, reqMsg } from "../../../utils/Store/Constant";
import { ApplyButton, CheckoutSubmitButton } from "../UI/Buttons";
import InputComp from "../../Admin/UI/Inputs/InputComp";
import InputCompPhone from "../../Admin/UI/Inputs/InputCompPhone";
import TextareaInput from "../../Admin/UI/Inputs/TextareaInput";
import { useSnapshot } from "valtio";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  addressLine1: yup.string().required(reqMsg).min(10, lengthMsg(10)),
  pincode: yup.string().required(reqMsg),
  area: yup.string().required("Please Select Area"),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
  // email: yup.string().required(reqMsg),
});

const CheckOutAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pinCodeApi, setPinCodeApi] = useState(null);
  const [pinCode, setPincode] = useState(null);
  const [area, setArea] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const snap = useSnapshot(webState);

  const getAddressData = useCallback(async () => {
    try {
      let res = await getAddress();
      if (res?.status === 200) {
        setAddresses(res?.data?.data);
        webState.checkoutAddressId = res?.data?.data[0]?.id;
        if (res?.data?.data?.length < 0) {
          setShowAddress(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAddressData();
    webState.refreshAddressList = false;
  }, [snap.refreshAddressList]);

  const retrievePincode = useCallback(async (pincode) => {
    try {
      let res = await fetchAreaData(pincode);
      if (res?.status === 200) {
        setPinCodeApi(res?.data[0]?.PostOffice);
        setCity(res?.data[0]?.PostOffice[0]?.District);
        setState(res?.data[0]?.PostOffice[0]?.State);
        setCountry(res?.data[0]?.PostOffice[0]?.Country);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editModalHandler = (id) => {
    webState.selectedID = id;
    webState.showEditAddressModal = true;
  };

  const deleteAddressHandler = async (id) => {
    webState.selectedID = id;
    webState.showDeleteAddressModal = true;
  };

  const addAddressHandler = async (data) => {
    let finalData = { ...data, city, state, country, countryCode: "+91" };
    try {
      let res = await creatAddress(finalData);
      if (res?.status === 200) {
        webState.refreshAddressList = true;
        setShowAddress(!showAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectAddressHandler = (id) => {
    webState.checkoutAddressId = id;
    setSelected(id);
  };

  useEffect(() => {
    let id = addresses[0]?.id;
    setSelected(id);
  }, [addresses]);

  const submitHandler = () => {
    setIsLoading(true);
    webState.checkOutStatus = "payment";
    // webState.checkoutStage = "99%";
    setIsLoading(false);
  };

  return (
    <div className="mobile-input-wrapper w-full grid h-full text-left px-2 lg:mx-6 mb-4 ">
      <div className="w-full text-sm  flex items-center justify-between">
        <span className="w-full font-semibold text-base hidden lg:block">
          Select Addresses
        </span>
        <div className="w-full  font-medium flex items-center justify-end gap-2 mb-2">
          <div
            className=" flex items-center gap-2 justify-end border-1 border-gray-400 border-dashed px-2 py-1 cursor-pointer"
            onClick={() => setShowAddress(!showAddress)}
          >
            {!showAddress ? <AiOutlinePlus /> : <AiOutlineMinus />}
            Add Address
          </div>
        </div>
      </div>

      {showAddress ? (
        <div className="w-full flex flex-col items-center justify-end mt-2">
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={handleSubmit(addAddressHandler)}
          >
            {/* <div className="flex gap-2"> */}
            <div className="w-full grid grid-cols-2 gap-4">
              <InputComp
                size={"w-full flex flex-col"}
                register={register}
                label={"Name"}
                registerValue={"name"}
                errors={errors.name?.message}
                require
              />

              <div className="w-full  flex flex-col lg:flex-row items-center gap-4">
                <InputCompPhone
                  register={register}
                  registerValue={"phone"}
                  label={"Phone"}
                  error={errors.phone?.message}
                  col={"flex-col items-start"}
                />
              </div>
            </div>

            <div className="w-full items-center grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col">
                <label className="text-base font-medium">Pincode</label>
                <input
                  type="number"
                  className="webInputStyle"
                  {...register("pincode", {
                    onChange: (e) => {
                      if (e.target.value?.length === 6) {
                        retrievePincode(e.target.value);
                        setPincode(e.target.value);
                      }
                    },
                  })}
                />
                <p className="text-red-500 text-xs">
                  {errors.pincode?.message}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <label className="text-base font-medium ">Select Area</label>
                <select
                  className="webInputStyle py-2"
                  {...register("area", {
                    onChange: (e) => {
                      setArea(e.target.value);
                    },
                  })}
                >
                  {pinCodeApi?.map((obj, i) => (
                    <option key={i} value={obj?.Name} selected>
                      {obj?.Name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs">{errors.area?.message}</p>
              </div>
            </div>
            <div className="w-full flex gap-2">
              <TextareaInput
                size={"w-full flex-col"}
                register={register}
                registerValue={"addressLine1"}
                label={"Complete Address"}
                rows={3}
                error={errors.addressLine1?.message}
                placeholder={"Add Complete Address"}
                require
              />
            </div>

            {showAddress && (
              <div className="w-full flex items-center justify-end">
                <ApplyButton text={"Create"} size={"w-full"} />
              </div>
            )}
          </form>
        </div>
      ) : null}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 overflow-y-scroll scrollbar-hide pr-2">
        {!showAddress &&
          addresses?.map((data) => (
            <YourAddressCard
              data={data}
              editModalHandler={editModalHandler}
              deleteAddressHandler={deleteAddressHandler}
              key={data?.id}
              selected={selected}
              selectAddressHandler={selectAddressHandler}
            />
          ))}
      </div>

      {addresses?.length > 0 && !showAddress && (
        <div className="w-full flex items-center justify-end mt-2">
          <CheckoutSubmitButton
            title={"Continue"}
            isLoading={isLoading}
            action={submitHandler}
          />
        </div>
      )}
    </div>
  );
};

export default CheckOutAddress;

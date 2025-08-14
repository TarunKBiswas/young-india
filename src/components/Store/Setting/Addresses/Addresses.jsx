import { webState } from "../../../../data/webStates";
import { useState } from "react";
import YourAddressCard from "./YourAddressCard";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ApplyButton } from "../../UI/Buttons";
import {
  creatAddress,
  // fetchAreaData,
  getAddress,
} from "../../../../utils/Store/Address";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  lengthMsg,
  phoneRegExp,
  reqMsg,
} from "../../../../utils/Store/Constant";
import { useSnapshot } from "valtio";
import { SuccessAlert } from "../../../Toast";
import InputComp from "../../../Admin/UI/Inputs/InputComp";
import InputCompPhone from "../../../Admin/UI/Inputs/InputCompPhone";
import TextareaInput from "../../../Admin/UI/Inputs/TextareaInput";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  addressLine1: yup.string().required(reqMsg).min(10, lengthMsg(10)),
  pincode: yup.string().required(reqMsg),
  // area: yup.string().required("Please Select Area"),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
  country: yup.string().required("required"),
});

const WebAddresses = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState(null);
  // const [addAdrees, setAddAddress] = useState(false);
  // const [pinCodeApi, setPinCodeApi] = useState(null);
  // const [pinCode, setPincode] = useState(null);
  // const [area, setArea] = useState(null);
  // const [city, setCity] = useState(null);
  // const [state, setState] = useState(null);
  // const [country, setCountry] = useState(null);

  const snap = useSnapshot(webState);

  const getData = async () => {
    try {
      let res = await getAddress();
      if (res?.status === 200) {
        setAddresses(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    webState.refreshAddressList = false;
  }, [snap.refreshAddressList]);

  // const retrievePincode = async (pincode) => {
  //   try {
  //     let res = await fetchAreaData(pincode);
  //     if (res?.status === 200) {
  //       setPinCodeApi(res?.data[0]?.PostOffice);
  //       setCity(res?.data[0]?.PostOffice[0]?.District);
  //       setState(res?.data[0]?.PostOffice[0]?.State);
  //       setCountry(res?.data[0]?.PostOffice[0]?.Country);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const closeModalHandler = () => {
    webState.showEditAddressModal = false;
  };

  const editModalHandler = (id) => {
    webState.selectedID = id;
    webState.showEditAddressModal = true;
  };

  const deleteAddressHandler = async (id) => {
    webState.selectedID = id;
    webState.showDeleteAddressModal = true;
  };

  const addAddressHandler = async (data) => {
    let finalData = { ...data, countryCode: "+91" };

    try {
      let res = await creatAddress(finalData);
      if (res?.status === 200) {
        webState.refreshAddressList = true;
        SuccessAlert("Address Created");
        reset();
        setShowAddress(!showAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const addressHAndler = () => {
  //   if (addresses?.length < 1) {
  //     setAddAddress(true);
  //   } else {
  //     setAddAddress(!addAdrees);
  //   }
  // };

  return (
    <div className="px-5 py-4 lg:p-0 bg-white w-full flex flex-col items-center justify-center max-w-[1440px] mx-auto">
      <div className="grid gap-1.5 w-full h-full">
        {/* Add New Address */}
        <div className="w-full flex items-center justify-between gap-2">
          <span className="w-full text-lg lg:text-2xl font-medium text-darkText">
            Your Addresses
          </span>
          <span
            className="w-full text-lg max-w-max text-themecolor font-medium cursor-pointer flex items-center justify-end gap-2"
            onClick={() => setShowAddress(!showAddress)}
          >
            Add New Address
            <span>{showAddress ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
          </span>
        </div>
        {showAddress ? (
          <div className="w-full flex flex-col items-center justify-end mt-2">
            <form
              className="w-full flex flex-col gap-2"
              onSubmit={handleSubmit(addAddressHandler)}
            >
              <div className="flex gap-4 ">
                <InputComp
                  size={"w-full flex flex-col"}
                  register={register}
                  label={"Name"}
                  registerValue={"name"}
                  errors={errors.name?.message}
                  require
                />

                <InputCompPhone
                  register={register}
                  registerValue={"phone"}
                  label={"Phone"}
                  error={errors.phone?.message}
                  col={"flex-col items-start"}
                />
              </div>

              <TextareaInput
                size={"flex-col itmes-start"}
                register={register}
                registerValue={"addressLine1"}
                label={"Address"}
                rows={3}
                error={errors.addressLine1?.message}
              />

              <div className="w-full grid grid-cols-2 gap-4">
                <InputComp
                  size={"w-full flex flex-col"}
                  register={register}
                  label={"Pin Code"}
                  registerValue={"pincode"}
                  errors={errors.pincode?.message}
                  require
                />

                <InputComp
                  size={"w-full flex flex-col"}
                  register={register}
                  label={"City"}
                  registerValue={"city"}
                  errors={errors.city?.message}
                  require
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <InputComp
                  size={"w-full flex flex-col"}
                  register={register}
                  label={"State"}
                  registerValue={"state"}
                  errors={errors.state?.message}
                  require
                />

                <InputComp
                  size={"w-full flex flex-col"}
                  register={register}
                  label={"Country"}
                  registerValue={"country"}
                  error={errors.country?.message}
                  require
                />
              </div>

              {showAddress && (
                <div className="w-full flex items-center justify-end">
                  <ApplyButton text={"Create"} />
                </div>
              )}
            </form>
          </div>
        ) : null}
        {!showAddress && (
          <div
            className={`w-full h-full lg:max-h-[calc(90vh_-_140px)] ${
              addresses?.length > 5 && "overflow-y-scroll thinScrollbar"
            }`}
          >
            <div className="w-full flex items-center flex-col gap-3 mt-2">
              {addresses?.map((data) => (
                <YourAddressCard
                  data={data}
                  editModalHandler={editModalHandler}
                  closeModalHandler={closeModalHandler}
                  deleteAddressHandler={deleteAddressHandler}
                  key={data?.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebAddresses;

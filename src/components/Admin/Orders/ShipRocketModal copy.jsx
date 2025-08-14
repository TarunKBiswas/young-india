/* eslint-disable no-unsafe-optional-chaining */
import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getShipRocketAddress,
  shipRocketShipping,
} from "../../../utils/Orders";
import { thankyouModalHandler } from "../../../utils/const_API";
import { useEffect, useState } from "react";
import InputComp from "../UI/Inputs/InputComp";
import SimpleModal from "../Modals/SimpleModal";
import { useNavigate } from "react-router-dom";
// import { integrateShipRocket } from "../../../utils/settings";

const reqMsg = "It is required";

const schema = yup.object({
  height: yup.string().required(reqMsg),
  weight: yup.string().required(reqMsg),
  length: yup.string().required(reqMsg),
  breadth: yup.string().required(reqMsg),
});

const ShipRocketModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [address, setAddress] = useState([]);
  const [pickup_location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(true);

  const snap = useSnapshot(state);
  const navigate = useNavigate();
  let order_products = [snap.selectedOrderID?.id];

  const closeModalHandler = () => {
    state.showShipRocketModal = false;
  };

  const getAddress = async () => {
    try {
      let res = await getShipRocketAddress();
      if (res?.status === 200) {
        setAddress(res?.data?.data);
      } else {
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const addressChangeHandler = (value) => {
    setLocation(value);
  };

  const submitHandler = async (data) => {
    let fData = { ...data, orderVariantId: order_products, pickup_location };

    try {
      let res = await shipRocketShipping(fData);
      if (res?.status === 200) {
        state.showShipRocketModal = false;
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
        state.refreshOrdersDetails = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(snap.globalData);

  const navigateHandler = async () => {
    state.showShipRocketModal = false;
    navigate("/settings", { replace: true });
    // console.log("clickef");
    // const shiprocket_username = snap.globalData?.data?.shiprocket_username;
    // const shiprocket_password = snap.globalData?.data?.shiprocket_password;
    // const is_shiprocket_enabled = true;

    // const data = {
    //   shiprocket_username,
    //   shiprocket_password,
    //   is_shiprocket_enabled,
    // };

    // try {
    //   let res = await integrateShipRocket(data);
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-2xl"}>
      {showForm ? (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full flex flex-col items-center justify-center p-4"
        >
          <div className="w-full flex flex-col items-start bg-white ">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <InputComp
                label={"Height(cm)"}
                labelClass={"block mb-2 text-sm font-bold text-gray-700"}
                register={register}
                registerValue={"height"}
                errors={errors.height?.message}
                inputClass={"p-2.5"}
              />

              <InputComp
                label={"Weight(gm)"}
                labelClass={"block mb-2 text-sm font-bold text-gray-700"}
                register={register}
                registerValue={"weight"}
                errors={errors.weight?.message}
                inputClass={"p-2.5"}
              />

              <InputComp
                label={"Length(cm)"}
                labelClass={"block mb-2 text-sm font-bold text-gray-700"}
                register={register}
                registerValue={"length"}
                errors={errors.length?.message}
                inputClass={"p-2.5"}
              />

              <InputComp
                label={"Breadth(cm)"}
                labelClass={"block mb-2 text-sm font-bold text-gray-700"}
                register={register}
                registerValue={"breadth"}
                errors={errors.breadth?.message}
                inputClass={"p-2.5"}
              />

              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Select Pickup Address<span className="text-red-500">*</span>
                </label>
                <select
                  className="form-control p-2.5 outline-none border-gray-200 rounded ring-0 focus:ring-0"
                  onChange={(e) => addressChangeHandler(e.target.value)}
                >
                  <option selected disabled>
                    Select Location
                  </option>
                  {address?.map((add) => (
                    <>
                      <option value={add}>{add}</option>
                    </>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end">
            <button className="submitButton">Submit</button>
          </div>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-2 mb-4">
          <span className="font-semibold text-red-500 text-xl ">
            Shiprocket is not integrated
          </span>
          <p className="font-medium text-base ">
            Please Integrate Shiprocket to ship order
          </p>
          <span
            className="border px-2 py-1 rounded bg-themecolor text-white text-sm mt-1 cursor-pointer"
            onClick={navigateHandler}
          >
            Integrate Now
          </span>
        </div>
      )}
    </SimpleModal>
  );
};

export default ShipRocketModal;

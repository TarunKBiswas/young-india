/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getFreePlans, updateFreePlan } from "../../../utils/plans.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { lengthMsg, reqMsg } from "../../../utils/const_API.js";
import CheckTabInput from "../UI/Inputs/CheckTabInput.jsx";
import { SuccessAlert } from "../../Toast.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  maxProducts: yup.string().required(reqMsg),
  maxUsers: yup.string().required(reqMsg),
});

const FreePlans = () => {
  const [getPlanDetails, setPlanDetails] = useState(null);
  const [premiumPricing, setPremiumPricing] = useState();
  const [isCodAllowed, setIsCodAllowed] = useState();
  const [prepaidAllowed, setPrepaidAllowed] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getPlans = async () => {
    try {
      let res = await getFreePlans();
      if (res?.status === 200) {
        setPlanDetails(res?.data?.data);
        setPremiumPricing(res?.data?.data?.premiumPricing);
        setIsCodAllowed(res?.data?.data?.codAllowed);
        setPrepaidAllowed(res?.data?.data?.prepaidAllowed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getPlanDetails === null) {
      getPlans();
    }
  }, []);

  const updateFreePlanHandler = async (data) => {
    let finalData = {
      ...data,
      premiumPricing,
      codAllowed: isCodAllowed,
      prepaidAllowed,
    };

    try {
      let res = await updateFreePlan(finalData);
      if (res?.status === 200) {
        SuccessAlert("Plan Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" mt-4 w-full  ">
        <form
          className="p-4 max-w-3xl mx-auto bg-white"
          onSubmit={handleSubmit(updateFreePlanHandler)}
        >
          <div className="w-full flex flex-col gap-4 ">
            <div className="w-full flex items-center ">
              <label className="font-medium w-40">Name</label>
              <div className="w-full">
                <input
                  className="formInput outline-none border-gray-200 rounded ring-0 focus:ring-0"
                  type="text"
                  defaultValue={getPlanDetails?.name}
                  {...register("name", { value: getPlanDetails?.name })}
                />
                <p className="text-red-600 text-sm ">{errors?.name?.message}</p>
              </div>
            </div>

            <div className="w-full flex items-center">
              <label className="font-medium w-40">Description</label>
              <div className="w-full">
                <textarea
                  className="w-full formInput outline-none border-gray-200 rounded ring-0 focus:ring-0"
                  {...register("description", {
                    value: getPlanDetails?.description,
                  })}
                  defaultValue={getPlanDetails?.description}
                />
              </div>
            </div>

            <div className="w-full flex items-center ">
              <label className="font-medium w-40">Products</label>
              <div className="w-full">
                <input
                  className="formInput outline-none border-gray-200 rounded ring-0 focus:ring-0"
                  type="number"
                  defaultValue={getPlanDetails?.maxProducts}
                  {...register("maxProducts", {
                    value: getPlanDetails?.maxProducts,
                  })}
                />
                <p className="text-red-600 text-sm ">
                  {errors?.maxProducts?.message}
                </p>
              </div>
            </div>

            <div className="w-full flex items-center ">
              <label className="font-medium w-40">Users</label>
              <div className="w-full">
                <input
                  className="formInput outline-none border-gray-200 rounded ring-0 focus:ring-0"
                  type="number"
                  defaultValue={getPlanDetails?.maxUsers}
                  {...register("maxUsers", {
                    value: getPlanDetails?.maxUsers,
                  })}
                />
                <p className="text-red-600 text-sm ">
                  {errors?.maxUsers?.message}
                </p>
              </div>
            </div>

            <div className="w-full flex items-center">
              <label className="font-medium w-40">Features</label>
              <div className="w-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
                  {/* {premiumPricing && ( */}
                  <CheckTabInput
                    label={"Premium Pricing : "}
                    value={premiumPricing}
                    setValue={setPremiumPricing}
                  />
                  {/* )} */}

                  {/* {isCodAllowed && ( */}
                  <CheckTabInput
                    label={"COD Allowed : "}
                    value={isCodAllowed}
                    setValue={setIsCodAllowed}
                  />
                  {/* )} */}

                  {/* {prepaidAllowed && ( */}
                  <CheckTabInput
                    label={"Prepaid Allowed : "}
                    value={prepaidAllowed}
                    setValue={setPrepaidAllowed}
                  />
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end p-4">
            <button className="submitButton">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FreePlans;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { webState } from "../../../../data/webStates";
import { userInfoData, editProfile } from "../../../../utils/Store/Setting";
import {
  phoneRegExp,
  resizeFile,
  uploadImage,
} from "../../../../utils/Store/Constant";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FailureAlert, SuccessAlert } from "../../../Toast";
import Edit from "../../UI/Icon/Edit";
import Coin from "../../UI/Icon/Coin";
import { useSnapshot } from "valtio";

const reqMsg = "Required";

const schema = yup
  .object({
    name: yup.string().required(reqMsg),
    email: yup.string().email().required(reqMsg),
    phone: yup
      .string()
      .required(reqMsg)
      .matches(phoneRegExp, "Number Should be Valid")
      .min(10, "Please enter valid number")
      .max(10, "Please enter valid number"),
  })
  .required();

const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userInfo, setUserInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [image, setImage] = useState(null);
  const inputFile = useRef(null);

  const snap = useSnapshot(webState);
  // console.log(snap.storeInfo);
  const storeType = snap.storeInfo.store_type;

  const getUserData = async () => {
    try {
      let res = await userInfoData();
      // console.log(res);
      if (res?.status === 200) {
        setUserInfo(res?.data);
        webState.userData = res?.data;
        setValue("name", res?.data?.data?.name);
        setValue("email", res?.data?.data?.email);
        setValue("phone", res?.data?.data?.phone);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const profileDetails = () => {
    setShowEdit(!showEdit);
  };

  const onEditImageClick = () => {
    inputFile.current.click();
  };

  const resizeImageFile = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  let id = userInfo?.data?.id;

  const updateUserDetails = async (data) => {
    try {
      if (image !== null) {
        let formdata = new FormData();
        formdata.append("file", image);
        let res = await uploadImage(formdata);
        if (res?.status === 200) {
          let finalData = { ...data, AvatarId: res?.data[0]?.id };
          let res2 = await editProfile(id, finalData);
          if (res2?.status === 200) {
            SuccessAlert("Details Updated");
            setShowEdit(!showEdit);
          }
        }
      } else {
        let finalData = {
          ...data,
          AvatarId: userInfo?.avatar?.id || null,
        };
        let res2 = await editProfile(id, finalData);
        if (res2?.status === 200) {
          SuccessAlert("Details Updated");
          setShowEdit(!showEdit);
        }
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  return (
    <div className="bg-gray-50 rounded w-full p-3">
      <div
        className={`flex justify-between mt-2 ${showEdit ? "hidden" : "flex"}`}
      >
        <div className="flex items-start gap-4 mb-6">
          {userInfo?.data?.avatar ? (
            <img
              width={"auto"}
              height={"auto"}
              alt="image"
              src={userInfo?.data?.avatar?.url}
              className="rounded-full w-16 h-16 object-contain border-1 border-themecolor object-center"
            />
          ) : (
            <div className="bg-gray-600 text-white capitalize border rounded-full text-2xl flex items-center justify-center font-semibold w-16 h-16">
              {userInfo?.data?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <span className="text-neutral-800 text-base font-normal capitalize leading-normal">
              {userInfo?.data?.name}
            </span>
            {userInfo?.data?.email && (
              <span className="text-neutral-800 text-opacity-70 text-xs font-normal leading-tight">
                {userInfo?.data?.email}
              </span>
            )}
            <span className="text-neutral-800 text-opacity-70 text-xs font-normal leading-tight">
              {userInfo?.data?.phone}
            </span>
            {storeType === "RESELLER-ECOMMERCE" && (
              <span className="flex items-center justify-between gap-2 py-1 px-2 border border-themecolor rounded-2xl w-max">
                <span>
                  <Coin className="w-5 h-5 text-[#dab14c]" />
                </span>
                <span className="text-themecolor text-[14px] font-medium leading-4 tracking-wide">
                  ₹ {userInfo?.data?.wallet_balance}
                </span>
              </span>
            )}
          </div>
        </div>
        <Edit
          onClick={profileDetails}
          className=" w-6 h-6 cursor-pointer text-gray-300"
        />
      </div>

      {showEdit ? (
        <div className={`w-full flex flex-col`}>
          <div className="flex items-center justify-end w-full">
            <RxCross2
              className="w-5 h-5 cursor-pointer text-gray-600"
              onClick={profileDetails}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-1 ">
            <div className="w-full flex items-center justify-center">
              {userInfo?.data?.avatar && !image ? (
                <img
                  width={"auto"}
                  height={"auto"}
                  alt="image"
                  src={userInfo?.data?.avatar?.url}
                  className="rounded-full w-16 h-16 object-contain"
                />
              ) : (
                <div>
                  {!image ? (
                    <div className="bg-gray-600 text-white border rounded-full text-2xl font-semibold w-16 h-16 flex items-center justify-center">
                      {userInfo?.data?.name?.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <img
                      width={"auto"}
                      height={"auto"}
                      alt="image"
                      src={URL.createObjectURL(image)}
                      className="rounded-full w-16 h-16 object-contain"
                    />
                  )}
                </div>
              )}
            </div>

            <span
              className="text-themecolor text-sm cursor-pointer"
              onClick={onEditImageClick}
            >
              Change Profile Photo
            </span>
            <input
              type="file"
              id="file"
              ref={inputFile}
              onChange={resizeImageFile}
              className="hidden"
            />
          </div>

          <form
            onSubmit={handleSubmit(updateUserDetails)}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col w-full items-center justify-center gap-4 text-[14px] font-medium text-black/50 my-6 ">
              <div className="w-[300px] lg:w-[500px] flex flex-col items-center justify-center">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
                  className="inputStyle capitalize border-gray-200 rounded "
                />
                <p className="text-red-600 text-xs">{errors.name?.message}</p>
              </div>

              <div className="w-[300px] lg:w-[500px] flex flex-col items-center justify-center">
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  className="inputStyle border-gray-200 rounded"
                />
                <p className="text-red-400 text-xs w-full flex items-center justify-start">
                  {errors.email?.message}
                </p>
              </div>

              <div className="w-[300px] lg:w-[500px] flex flex-col items-center justify-center">
                <input
                  type="tel"
                  placeholder="Your Number"
                  {...register("phone")}
                  className="inputStyle border-gray-200 rounded"
                />
                <p className="text-red-600 text-xs ">{errors.phone?.message}</p>
              </div>
            </div>

            <div className="w-[300px] flex items-center justify-center gap-3 mb-4 cursor-pointer">
              <button className=" text-xs border bg-themecolor rounded hover:opacity-80 transition-all duration-300 text-center text-white font-normal leading-normal  py-2 px-3 ">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

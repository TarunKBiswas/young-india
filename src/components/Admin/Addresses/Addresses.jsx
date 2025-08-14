/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { state } from "../../../data/state.js";
import { getAddressList } from "../../../utils/addresses.js";
import { HiOutlineEye } from "react-icons/hi2";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSnapshot } from "valtio";
import CreateButton from "../UI/Buttons/CreateButton.jsx";

const Addresses = () => {
  const [addressList, setAddressList] = useState([]);
  const snap = useSnapshot(state);

  const getAddress = async () => {
    try {
      let res = await getAddressList();
      if (res?.status === 200) {
        setAddressList(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
    state.refreshAddressList = false;
  }, [snap.refreshAddressList]);

  const deleteAddressHandler = (id) => {
    state.selectedAddressID = id;
    state.showDeleteAddressModal = true;
  };

  const editAddressHandler = (id) => {
    state.selectedAddressID = id;
    state.showEditAddressModal = true;
  };

  const addressModalHandler = () => {
    state.showAddAddressModal = true;
  };

  return (
    <>
      <div className=" px-2">
        <div className="w-full flex items-center justify-between pb-4 pt-2">
          <span className="text-black text-2xl font-semibold">
            Saved Addresses
          </span>
          <CreateButton action={addressModalHandler} title={"Add New"} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {addressList?.map((address, i) => (
            <div
              className="w-full flex flex-col p-3 rounded-md border cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out hover:bg-[#222222] hover:text-white group"
              key={address?.id}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold">{`Address ${i + 1}`}</h1>
                <p className="flex items-center gap-2">
                  <span
                    className="cursor-pointer hover:scale-125 transition-all duration-300"
                    onClick={() => editAddressHandler(address?.id)}
                  >
                    <AiOutlineEdit className="h-4 w-4 group-hover:text-white" />
                  </span>
                  <span
                    className="cursor-pointer hover:scale-125 transition-all duration-300"
                    onClick={() => deleteAddressHandler(address?.id)}
                  >
                    <AiOutlineDelete className="h-4 w-4 text-red-500 group-hover:text-white" />
                  </span>
                </p>
              </div>
              <div className="pt-2">
                <p>
                  Name:{" "}
                  <span className="font-semibold">
                    {" "}
                    {address?.attributes?.name}
                  </span>{" "}
                </p>
                <p>
                  {" "}
                  Mobile:{" "}
                  <span className="font-semibold">
                    {address?.attributes?.user?.data?.attributes?.phone}{" "}
                  </span>
                </p>
                <span>
                  {address?.attributes?.houseNumber +
                    ", " +
                    address?.attributes?.addressLine1 +
                    ", " +
                    address?.attributes?.area +
                    ", " +
                    address?.attributes?.city +
                    ", " +
                    address?.attributes?.pincode +
                    ", " +
                    address?.attributes?.state +
                    ", " +
                    address?.attributes?.area +
                    ", " +
                    address?.attributes?.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Addresses;

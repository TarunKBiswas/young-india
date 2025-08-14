/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { state } from "../../../../data/state";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CustomerAddress = ({ addressData }) => {
  const deleteAddressHandler = (id) => {
    state.selectedAddressID = id;
    state.showDeleteAddressModal = true;
  };

  const editAddressHandler = (id) => {
    state.selectedAddressID = id;
    state.showEditAddressModal = true;
  };

  return (
    <>
      <div className="px-2">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {addressData &&
            addressData?.map((address, i) => (
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
                    <span className="font-semibold"> {address?.name}</span>{" "}
                  </p>
                  <span>
                    {address?.houseNumber +
                      ", " +
                      address?.addressLine1 +
                      ", " +
                      address?.area +
                      ", " +
                      address?.city +
                      ", " +
                      address?.pincode +
                      ", " +
                      address?.state +
                      ", " +
                      address?.area +
                      ", " +
                      address?.country}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CustomerAddress;

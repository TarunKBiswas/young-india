import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import Edit from "../UI/Icon/Edit";
import Delete from "../UI/Icon/Delete";

/* eslint-disable react/prop-types */
const AddressCard = ({ data, editModalHandler, deleteAddressHandler }) => {
  const snap = useSnapshot(webState);
  const userInfo = snap.userData;

  return (
    <div
      className={`w-full bg-white border max-w-[576px] sm:max-w-[964px] lg:max-w-[1440px] mx-auto p-3 rounded-lg cursor-pointer`}
      onClick={() => {
        if (snap.selectAddressID !== data?.id) {
          webState.selectAddressID = data?.id;
        } else {
          webState.selectAddressID = null;
        }
      }}
    >
      <div className="w-full flex">
        <div className="w-full flex max-w-[80%] items-start flex-col gap-1 ">
          <span className="text-base font-medium"> {data?.name}</span>
          <span className="text-xs">
            {data?.houseNumber}, {data?.addressLine1},{data?.area},{data?.city},
            {data?.pincode} , {data?.state}
          </span>
          {/* <span className="text-xs">{data?.phone || userInfo?.data?.phone}</span>             */}
        </div>
        <div className="w-full flex flex-col items-end justify-between max-w-[20%]">
          <input
            type="radio"
            name="address"
            onClick={() => {
              if (snap.selectAddressID !== data?.id) {
                webState.selectAddressID = data?.id;
              } else {
                webState.selectAddressID = null;
              }
            }}
            value={data?.id}
            className="checked:text-themecolor cursor-pointer"
            checked={snap?.selectAddressID === data?.id}
          />
          <div className="w-full flex items-center justify-end gap-2 mt-3">
            <Edit
              className="cursor-pointer h-4 w-4 "
              onClick={() => editModalHandler(data?.id)}
            />
            <Delete
              className="cursor-pointer h-5 w-5 "
              onClick={() => deleteAddressHandler(data?.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;

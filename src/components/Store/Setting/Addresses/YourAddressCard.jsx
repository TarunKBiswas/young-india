import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import Edit from "../../UI/Icon/Edit";
import Delete from "../../UI/Icon/Delete";

/* eslint-disable react/prop-types */
const YourAddressCard = ({
  data,
  editModalHandler,
  deleteAddressHandler,
  selected,
  selectAddressHandler,
}) => {
  const snap = useSnapshot(webState);
  const userInfo = snap.userData;

  return (
    <div
      className={`relative w-full cursor-pointer ${
        selected === data?.id ? "bg-black/10 " : "bg-white"
      }  border max-w-[576px] sm:max-w-[964px]  lg:max-w-[1440px] mx-auto p-3 rounded-lg`}
      onClick={
        selectAddressHandler ? () => selectAddressHandler(data?.id) : null
      }
    >
      {/* {selected === data?.id && (
        <div className="absolute rounded-full bg-[#222222] w-4 h-4 top-[-6px] right-[-4px] z-10  flex items-center justify-center">
          <span className=" text-xs flex items-center justify-center">
            <FaCheck className=" text-white h-2 w-2" />
          </span>
        </div>
      )} */}
      <div className="w-full flex">
        <div className="w-full flex max-w-[80%] items-start flex-col gap-1 ">
          <span className="text-base capitalize font-medium">{data?.name}</span>
          <span className="text-xs">{data?.phone || userInfo?.phone}</span>
          <span className="text-xs">
            {data?.addressLine1}, {data?.area}, {data?.city}, {data?.pincode},
            {data?.state}
          </span>
        </div>
        <div className="w-full flex flex-col items-end justify-between max-w-[20%]">
          <div className="w-full flex items-center justify-end gap-2">
            <Edit
              className=" cursor-pointer h-5 w-5 lg:h-4 lg:w-4"
              onClick={() => editModalHandler(data?.id)}
            />
            <Delete
              className=" cursor-pointer h-5 w-5 lg:h-4 lg:w-4"
              onClick={() => deleteAddressHandler(data?.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourAddressCard;

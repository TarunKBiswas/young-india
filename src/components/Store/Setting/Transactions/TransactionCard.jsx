/* eslint-disable react/prop-types */

import moment from "moment";
import {
  BsArrowUpRightCircleFill,
  BsArrowDownLeftCircleFill,
} from "react-icons/bs";

const TransactionCard = ({ data }) => {
  return (
    <div
      className="w-full mx-auto flex justify-between border rounded bg-white p-3 "
      key={data?.id}
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-normal text-themecolor">
          #{data?.txn_id}
        </span>
        <span className="text-lg font-semibold text-themecolor py-1">
          ₹ {data?.amount}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="uppercase text-xs font-medium">{data?.purpose}</span>
          <span className="text-xs font-medium text-themecolor">
            {moment(data?.updatedAt)?.format("MMMM DD YYYY, hh:mm:ss")}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1.5 pr-2">
        <div className="rounded-full p-3 pr">
          {data?.purpose === "PURCHASE" ? (
            <BsArrowUpRightCircleFill className="h-5 w-5 fill-red-600/75" />
          ) : (
            <BsArrowDownLeftCircleFill className="h-5 w-5 fill-green-700" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;

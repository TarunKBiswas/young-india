/* eslint-disable react/prop-types */

import Filter from "../UI/Filter";

const purposeData = [
  {
    id: 1,
    name: "Purchase",
    value: "PURCHASE",
    current: "purpose",
  },
  {
    id: 2,
    name: "Refund",
    value: "REFUND",
    current: "purpose",
  },
  {
    id: 1,
    name: "Wallet",
    value: "ADDED_TO_WALLET",
    current: "purpose",
  },
];

const typeData = [
  {
    id: 1,
    name: "Credit",
    value: "CREDIT",
    current: "type",
  },
  {
    id: 2,
    name: "Debit",
    value: "DEBIT",
    current: "type",
  },
];

const modeData = [
  {
    id: 1,
    name: "Cash",
    value: "CASH",
    current: "mode",
  },
  {
    id: 2,
    name: "Online",
    value: "ONLINE",
    current: "mode",
  },
];

const TransactionFilters = ({
  setPurpose,
  setMode,
  setType,
  filterTrxHandler,
}) => {
  return (
    <Filter action={filterTrxHandler}>
      <div className="px-2 py-3 w-full flex items-start gap-4">
        <div className="w-full flex flex-col items-start gap-4">
          <span className="font-semibold">Purpose</span>
          <div className="w-full flex flex-col gap-3">
            {purposeData?.map((data) => {
              return (
                <div className="flex items-center gap-2" key={data?.id}>
                  <input
                    type="radio"
                    id={data?.id}
                    name={data?.current}
                    value={data?.value}
                    onChange={() => setPurpose(data?.value)}
                    className="h-5 w-5 rounded border-gray-300 checked:outline-none"
                  />
                  <span className="text-sm ">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          <span className="font-semibold">Type</span>
          <div className="w-full flex flex-col gap-3">
            {typeData?.map((data) => {
              return (
                <div className="flex items-center gap-2" key={data?.id}>
                  <input
                    type="radio"
                    id={data?.id}
                    name={data?.current}
                    value={data?.value}
                    onChange={() => setType(data?.value)}
                    className="h-5 w-5 rounded border-gray-300 checked:outline-none"
                  />

                  <span className="text-sm ">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          <span className="font-semibold">Mode</span>
          <div className="w-full flex flex-col gap-3">
            {modeData?.map((data) => {
              return (
                <div className="flex items-center gap-2" key={data?.id}>
                  <input
                    type="radio"
                    id={data?.id}
                    name={data?.current}
                    value={data?.value}
                    onChange={() => setMode(data?.value)}
                    className="h-5 w-5 rounded border-gray-300 checked:outline-none"
                  />

                  <span className="text-sm ">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Filter>
  );
};

export default TransactionFilters;

/* eslint-disable react/prop-types */
import { orderStatus, paymentMode } from "../../../../data/UserOrderFilters";
import Filter from "../../../Admin/UI/Filter";

const OrdersFilter = ({ setStatus, setMode, filterHandler, resetHandler }) => {
  return (
    <Filter
      action={filterHandler}
      size={"w-[550px] "}
      resetHandler={resetHandler}
    >
      <div className=" px-2 py-3 w-full flex items-start gap-4 ">
        <div className="w-full flex flex-col items-start gap-4">
          <span className="font-semibold">Status</span>
          <div className="w-full flex flex-col gap-2">
            {orderStatus?.map((data) => {
              return (
                <div className="flex items-center gap-2" key={data?.id}>
                  <input
                    type="radio"
                    id={data?.id}
                    name={data?.current}
                    value={data?.value}
                    onChange={() => setStatus(data?.value)}
                    className="cursor-pointer h-5 w-5 rounded border-gray-300"
                  />
                  <span className="text-sm ">{data?.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-4">
          <span className="font-semibold">Payment Mode</span>
          <div className="w-full flex flex-col gap-2">
            {paymentMode?.map((data) => {
              return (
                <div className="flex items-center gap-2" key={data?.id}>
                  <input
                    type="radio"
                    id={data?.id}
                    name={data?.current}
                    value={data?.value}
                    onChange={() => setMode(data?.value)}
                    className="cursor-pointer h-5 w-5 rounded border-gray-300 checked:outline-none"
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

export default OrdersFilter;

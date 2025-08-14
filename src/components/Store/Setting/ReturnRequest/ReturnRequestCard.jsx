/* eslint-disable react/prop-types */

import moment from "moment";

const ReturnRequestCard = ({ returnProducts }) => {
  return (
    <>
      {returnProducts?.map((data, i) => {
        return (
          <div className="flex w-full bg-white border lg:h-[153px]" key={i}>
            <img
              width={"auto"}
              height={"auto"}
              alt="image"
              className=" w-1/3 lg:w-[14%] bg-cover object-top rounded-r-none"
              src={data?.variant?.thumbnail?.url}
            />
            <div className="w-full p-2 flex flex-col items-center">
              <div className="w-full flex items-center justify-between">
                <p className="text-center text-blue-600 text-xs font-medium leading-tight">
                  #{data?.order?.slug}
                </p>
                <h1>
                  <span className="font-medium text-xs lg:text-sm ">
                    {moment(data?.createdAt).format("MMM Do YY")}
                  </span>
                </h1>
              </div>

              <div className="w-full flex  justify-between gap-2 mt-1">
                <div className="flex w-full flex-col gap-1.5">
                  <h1 className="text-gray-900 text-sm lg:text-lg text-ellipsis">
                    {data?.variant?.product?.name}
                  </h1>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1">
                      <span className="text-neutral-400 text-sm font-normal  leading-normal">
                        Variant :
                      </span>
                      <span className="text-slate-900 text-sm font-normal  leading-normal capitalize">
                        {data?.variant?.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-400 text-sm font-normal  leading-normal">
                          Quantity :
                        </span>
                        <span className="text-slate-900 text-sm font-normal  leading-normal">
                          {data?.variant?.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="px-4 py-2 bg-zinc-800 bg-opacity-5 inline-flex justify-center items-center text-zinc-800 text-xs font-medium leading-normal">
                    {data?.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReturnRequestCard;

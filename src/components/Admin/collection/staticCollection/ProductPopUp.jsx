/* eslint-disable react/prop-types */
import { Popover } from "@headlessui/react";

const ProductPopUp = ({ data }) => {
  let pData = data?.attributes?.products?.data;
  return (
    <>
      <Popover className="relative">
        <Popover.Button disabled={data?.products?.length === 0 ? true : false}>
          <span className="py-1 px-2 bg-gray-50 border shadow-sm rounded-md text-[#222222] hover:bg-[#222222]/20 cursor-pointer text-base font-semibold">
            {pData?.length}
          </span>
        </Popover.Button>

        <Popover.Panel className="absolute z-10 bg-white shadow-sm flex flex-col gap-1 p-2 rounded ml-10 border mt-[-35px] cursor-pointer w-full">
          {pData?.map((item) => {
            return (
              <div className="flex items-center gap-1 p-1" key={item.id}>
                <img
                  src={item?.attributes?.thumbnail?.data?.attributes?.url}
                  alt="Image"
                  width="auto"
                  height="auto"
                  className="h-6 w-6 rounded-full border "
                />
                <span className="">{item?.attributes?.name}</span>
              </div>
            );
          })}
        </Popover.Panel>
      </Popover>
    </>
  );
};

export default ProductPopUp;

/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import Select from "react-select";

const OrderStats = () => {
  const [active, setActive] = useState("NEW");
  const snap = useSnapshot(state);

  const setTag = (e, tag) => {
    // console.log('Setting active to:', tag);
    state.selectedTag = tag;
    setActive(tag);
  };

  let data = snap.orderStatsInfo?.map((data) => {
    return {
      value: data?.statsTitle,
      label: data?.id,
    };
  });

  return (
    <>
      <div className="hidden md:block">
        <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
          {snap.orderStatsInfo?.map((data) => {
            return (
              // <div >
                <div
                  key={data?.id}
                  className={`rounded-lg p-2 gap-2 cursor-pointer border flex items-center justify-between ${
                    active === data?.id ? "bg-[#222222] text-white" : ""
                  }`}
                  id={data?.id}
                  onClick={(e) => setTag(e, data?.id)}
                >
                  <span className="text-[10px] lg:text-sm capitalize">
                    {data?.statsTitle}
                  </span>
                  <span
                    className={`bg-[#222222] rounded-full px-2 py-1 text-xs text-white`}
                  >
                    {data?.statsValue}
                  </span>
                </div>
              // </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center w-full mb-4 md:hidden">
        <Select
          className="w-[80%] mx-auto text-black"
          options={data}
          defaultValue={data[0]}
          onChange={(value) => setTag(value.value, value.label)}
        />
      </div>
    </>
  );
};

export default OrderStats;

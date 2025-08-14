import { useState } from "react";
import { state } from "../../../data/state";
import { useSnapshot } from "valtio";
import Select from "react-dropdown-select";

const LeadStats = () => {
  const [active, setActive] = useState("NEW");
  const snap = useSnapshot(state);

  const setTag = (e, tag) => {
    state.selectedLeadTag = tag;
    setActive(e.target.id);
  };

  let data = snap.leadStatsInfo?.map((data) => {
    return {
      value: data?.statsTitle,
      label: data?.id,
    };
  });

  return (
    <>
      <div className="hidden md:block mt-10 ">
        <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-7 mb-4">
          {snap.leadStatsInfo?.map((data) => {
            return (
              <div className="relative" key={data?.id}>
                <div
                  className={`rounded-lg p-2 gap-2 cursor-pointer border flex items-center justify-between ${
                    active === data?.id ? "bg-[#222222] text-white" : null
                  }
                `}
                  id={data?.id}
                  onClick={(e) => setTag(e, data?.id)}
                >
                  <span className="text-[10px] lg:text-xs font-medium capitalize">
                    {data?.statsTitle}
                  </span>
                  <span className="bg-[#222222] rounded-full px-2 py-1 text-xs text-white">
                    {data?.statsValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" flex items-center justify-center w-full mb-4 md:hidden">
        <Select
          className="w-[80%] mx-auto text-black"
          options={data}
          defaultValue={data[0]}
          onChange={(value) => setTag(value?.value, value?.label)}
        />
      </div>
    </>
  );
};

export default LeadStats;

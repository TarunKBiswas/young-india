/* eslint-disable react/prop-types */

import { ApplyButton, FilterButton } from "../UI/Buttons";
import { useEffect } from "react";

const sortOptions = [
  {
    id: 2,
    name: "Newest",
    value: "desc",
    current: "sortOptions",
    val: "date",
  },
  {
    id: 3,
    name: "Oldest",
    value: "asc",
    current: "sortOptions",
    val: "date",
  },
  {
    id: 4,
    name: "Price Low To High",
    value: "low-to-high",
    current: "sortOptions",
    val: "price",
  },
  {
    id: 5,
    name: "price High to Low",
    value: "high-to-low",
    current: "sortOptions",
    val: "price",
  },
];

const SortByDropDown = ({
  dropDownFilterFor,
  setDropDrownFilterFor,
  searchFilter,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white border w-[297px] ml-[-200px] lg:ml-[-270px] absolute p-3 mt-8 z-10">
      <FilterButton title={"Sort By"}>
        {sortOptions?.map((item) => {
          return (
            <div key={item?.id} className="flex items-center gap-2">
            
              <input
                type="radio"
                className="h-4 w-4 checked:text-themecolor"
                id={item?.id}
                name={"sorting"}
                value={item?.value}
                onChange={(e) =>
                  setDropDrownFilterFor({
                    ...dropDownFilterFor,
                    sortBy: item.val,
                    sortName: e.target.value,
                  })
                }
              />
              <span className="text-neutral-800 text-xs font-medium leading-tight">
                {item?.name}
              </span>
            </div>
          );
        })}
      </FilterButton>

      <div className="mt-4 flex items-center justify-end gap-4">
        {/* <ResetButton action={resetHandler} /> */}
        <ApplyButton action={searchFilter} text={"Apply"} />
      </div>
    </div>
  );
};

export default SortByDropDown;

/* eslint-disable react/prop-types */
import { ApplyButton, FilterButton } from "../UI/Buttons";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { useEffect } from "react";

const FilterDropDown = ({ dropDownFilterFor, searchFilter, action }) => {
  const snap = useSnapshot(webState);
  let categories = snap.categoriesData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-[297px] ml-[-100px] absolute border p-3 mt-8 z-30 bg-white">
      {/* Categories */}
      <div className="flex flex-col items-start gap-3 ">
        <FilterButton title={"Categories"}>
          {categories?.map((item) => {
            return (
              <div key={item?.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 checked:text-themecolor"
                  value={item?.attributes?.name}
                  onChange={(e) => action(item?.id, e)}
                  checked={dropDownFilterFor?.categoriesID?.includes(item?.id)}
                />
                <div className="flex items-center justify-between w-full ">
                  <span className="text-neutral-800 text-xs font-medium leading-tight">
                    {item?.name}
                  </span>
                  <span className="text-right text-neutral-800 text-opacity-50 text-xs font-medium leading-tight">
                    {item?.products}
                  </span>
                </div>
              </div>
            );
          })}
        </FilterButton>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <ApplyButton action={() => searchFilter(1, false)} text={"Apply"} />
      </div>
    </div>
  );
};

export default FilterDropDown;

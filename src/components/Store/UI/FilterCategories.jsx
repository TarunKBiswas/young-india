/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ApplyButton, ResetButton } from "../UI/Buttons";
import { useEffect } from "react";

const priceOptions = [
  {
    id: 1,
    name: "₹ 0 - ₹ 499",
    value: "₹ 0 - ₹ 499",
    current: "priceOtions",
    price: {
      priceMax: 499,
      priceMin: 0,
    },
  },
  {
    id: 2,
    name: "₹ 499 - ₹ 1499",
    value: "₹ 499 - ₹ 1499",
    current: "priceOtions",
    price: {
      priceMax: 1499,
      priceMin: 499,
    },
  },
  {
    id: 3,
    name: "₹ 1499 - ₹ 4999",
    value: "₹ 1499 - ₹ 4999",
    current: "priceOtions",
    price: {
      priceMax: 4999,
      priceMin: 1499,
    },
  },
  {
    id: 4,
    name: "₹ 4999 & Above",
    value: "",
    current: "priceOtions",
    price: {
      priceMax: 1000000000,
      priceMin: 4999,
    },
  },
];

const FilterCategories = ({
  showFilter,
  setShowFilter,
  dropDownFilterFor,
  setDropDrownFilterFor,
  searchFilter,
}) => {
  const resetHandler = () => {
    setShowFilter(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white border w-[297px] ml-[-100px] lg:ml-[-200px] absolute p-3 rounded mt-6 z-10 cursor-pointer ">
      {/* Categories */}

      <div className="w-full flex flex-col gap-2.5">
        <span className="font-semibold text-lg">Price</span>
        {priceOptions?.map((item) => {
          const price = JSON.stringify(item?.price);
          return (
            <div key={item?.id} className="flex items-center gap-3">
              <input
                type="radio"
                className="h-5 w-5 checked:text-themecolor"
                id={item?.id}
                name={item?.current}
                value={price}
                onChange={(e) => {
                  var tmp = JSON.parse(e.target.value);
                  setDropDrownFilterFor({ ...dropDownFilterFor, ...tmp });
                }}
              />
              <span className="text-base" htmlFor={item?.value}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <ResetButton action={resetHandler} />
        <ApplyButton action={searchFilter} text={"Apply"} />
      </div>
    </div>
  );
};

export default FilterCategories;

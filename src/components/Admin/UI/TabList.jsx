/* eslint-disable react/prop-types */
import { Tab } from "@headlessui/react";

const TabList = ({ categories, size }) => {
  function classNames(...classes) {
    return classes.filter(Boolean)?.join(" ");
  }

  return (
    <Tab.List
      className={`w-full flex ${size} space-x-1 rounded-xl bg-[#222222] p-1`}
    >
      {Object?.keys(categories)?.map((category) => (
        <Tab
          key={category}
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
              // "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              "!ring-none !outline-none",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          {category}
        </Tab>
      ))}
    </Tab.List>
  );
};

export default TabList;

/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaFilter } from "react-icons/fa";
import { ApplyFilerButton, ResetFilerButton } from "./Buttons/AddButton";

const Filter = ({ children, size, action, resetHandler }) => {
  return (
    <div className="max-w-96 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <div className="bg-gray-100 flex items-center gap-2 py-2.5 px-6 rounded cursor-pointer hover:bg-gray-200 transition-all duration-300">
            <span>Filters</span>
            <FaFilter />
          </div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute right-0 mt-2 ${
              size || "w-96"
            } origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow ring-1 ring-black/5 focus:outline-none`}
          >
            {children}
            <div className="p-2 w-full flex items-center justify-end gap-2 ">
              <ResetFilerButton action={resetHandler} />
              <ApplyFilerButton action={action} />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Filter;

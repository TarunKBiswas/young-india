/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { BsFillCheckCircleFill } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const TypeCard = ({ selected, setSelected, options }) => {
  return (
    <Listbox
      value={selected}
      onChange={setSelected}
      className="w-full lg:w-2/3"
    >
      {({ open }) => (
        <div className="relative w-1/2">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-themecolor sm:text-sm ">
            <div className="flex flex-col ">
              <span className={"font-medium text-base ml-3 block truncate"}>
                {selected?.name}
              </span>
              <span className={"font-normal text-sm ml-3 block text-gray-500 "}>
                {selected?.desc}
              </span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((person) => (
                <Listbox.Option
                  key={person?.id}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-[#222222] text-white" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex flex-col ">
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-medium",
                            "ml-3 block truncate"
                          )}
                        >
                          {person?.name}
                        </span>
                        <span
                          className={classNames(
                            selected ? "font-semibold " : "font-normal ",
                            "ml-3 block truncate"
                          )}
                        >
                          {person?.desc}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-white" : "text-[#222222]",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <BsFillCheckCircleFill
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default TypeCard;

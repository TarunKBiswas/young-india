/* eslint-disable react/prop-types */

import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
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
      className="w-full lg:w-1/3"
    >
      {({ open }) => (
        <div className="relative w-1/2">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-themecolor sm:text-sm ">
            <div className="flex flex-col ">
              <span className={" text-base  block truncate"}>
                {selected?.name}
              </span>
              <span className={"font-normal text-sm ml-3 block text-gray-500 "}>
                {selected?.desc}
              </span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((person) => (
                <ListboxOption
                  key={person?.id}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-themecolor text-white" : "text-gray-900",
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
                            " block truncate"
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
                            active ? "text-white" : "text-themecolor",
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
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default TypeCard;

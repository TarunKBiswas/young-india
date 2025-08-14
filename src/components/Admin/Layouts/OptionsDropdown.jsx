import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { BsActivity } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import HeaderProfile from "./HeaderProfile";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

export default function OptionsDropdown() {
  const navigate = useNavigate();
  const dropDownMenus = [
    {
      name: "Profile",
      to: "settings",
      icon: CiUser,
    },
    {
      name: "Activity Logs",
      to: "activity",
      icon: BsActivity,
    },
    {
      name: "Sign Out",
      to: "auth",
      icon: FiLogOut,
    },
  ];

  return (
    <div className="absolute w-56 text-right mr-16 z-10">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton>
          <HeaderProfile />
        </MenuButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 mt-2 min-w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="p-2">
              <MenuItem>
                <HeaderProfile />
              </MenuItem>
              <hr className="w-full my-2 text-gray-400" />
              {dropDownMenus?.map((menu, i) => {
                return (
                  <MenuItem key={i}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-gray-100 text-black" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer`}
                        onClick={() => navigate(menu?.to)}
                      >
                        <menu.icon
                          className="mr-2 h-6 w-6 text-gray-600 "
                          aria-hidden="true"
                        />
                        <span className="text-smtext-gray-600 font-medium">
                          {menu?.name}
                        </span>
                      </div>
                    )}
                  </MenuItem>
                );
              })}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

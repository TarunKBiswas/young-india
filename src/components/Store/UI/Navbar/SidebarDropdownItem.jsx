/* eslint-disable react/prop-types */
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SidebarDropdownItem = ({
  title,
  items = [],
  isOpen,
  onClick,
  handleRedirect,
  setSideMenuOpen,
}) => {
  const [openSubItemIndex, setOpenSubItemIndex] = useState(null);

  const toggleSubItems = (index) => {
    setOpenSubItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="py-1">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map((item, index) => {
          return (
            <div key={index}>
              <button
                className="flex w-full items-center justify-between px-2 py-2 text-left text-sm text-gray-600 hover:text-gray-900"
                onClick={() => {
                  if (item.subCategories && item.subCategories.length > 0) {
                    toggleSubItems(index);
                  } else {
                    handleRedirect(
                      title === "Categories"
                        ? `/category/${item.id}`
                        : `/collection/${item.id}`
                    );
                    setSideMenuOpen(false);
                  }
                }}
              >
                <span className="capitalize">{item.name}</span>
                {item.subCategories && item.subCategories.length > 0 && (
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      openSubItemIndex === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {item.subCategories && item.subCategories.length > 0 && (
                <div
                  className={`overflow-hidden transition-all w-full duration-300 ease-in-out ${
                    openSubItemIndex === index
                      ? "max-h-auto opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subCategories.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="w-full px-4 py-1 text-left text-sm text-gray-500 hover:text-gray-900 capitalize"
                      onClick={() => {
                        handleRedirect(`/sub-category/${subItem.id}`);
                        setSideMenuOpen(false);
                      }}
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarDropdownItem;

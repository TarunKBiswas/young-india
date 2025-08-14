import React from "react";

const SidebarList = ({ items, onItemClick }) => {
  return (
    <ul className="space-y-6">
      {items.map((item, index) => (
        <li
          key={index}
          className={`p-2 rounded-md cursor-pointer shadow-md h-20 bg-white ${
            item?.isActive
              ? "bg-[#e8eef8] border-l-4 border-[#0d66ff]"
              : "hover:bg-gray-100 border border-[#b9b6b6]"
          }`}
          onClick={() => onItemClick(item)}
        >
          <div className="flex items-center justify-center w-full h-full gap-3">
            <div className="w-3/2 flex items-center justify-start gap-4">
              <div className="bg-gray-200 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SidebarList;

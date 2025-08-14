/* eslint-disable react/prop-types */

export const DeleteButton = ({ title, func, type }) => {
  return (
    <button
      className={`px-3 py-2 ${
        type !== "delete" ? "bg-themecolor" : "bg-red-600"
      }  text-white rounded-md font-normal text-sm border`}
      onClick={func}
    >
      {title}
    </button>
  );
};

export const CancelButton = ({ func }) => {
  return (
    <button
      className="px-3 py-2 bg-white text-gray-700 rounded-md font-normal text-sm border"
      onClick={func}
    >
      Cancel
    </button>
  );
};

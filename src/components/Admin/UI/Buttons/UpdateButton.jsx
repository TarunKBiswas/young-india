/* eslint-disable react/prop-types */
const UpdateButton = ({ func }) => {
  return (
    <div className="w-full flex items-center justify-end gap-2">
      <span
        className="p-2 text-sm bg-[#222222] rounded-md text-white transition-all duration-500 cursor-pointer"
        onClick={func}
      >
        Updated
      </span>
    </div>
  );
};

export default UpdateButton;

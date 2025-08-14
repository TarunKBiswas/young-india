/* eslint-disable react/prop-types */
const CheckTabInput = ({ label, value, setValue, position }) => {
  return (
    <div className={`flex items-center ${position || "justify-end"}  gap-2 `}>
      <label className="text-xs font-medium">{label}</label>
      <div>
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value}
            onChange={() => setValue(!value)}
          />
          <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-[#222222]"></div>
        </label>
      </div>
    </div>
  );
};

export default CheckTabInput;

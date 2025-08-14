/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const CardSwitch = ({ title, desc, register, storeData, registerValue }) => {
  return (
    <div className="gap-2 flex flex-col items-start justify-between lg:flex-row lg:items-center bg-white border p-2 rounded-xl ">
      <div>
        <span className="text-sm font-medium">{title} </span>
        <br />
        <span className="text-xs text-gray-500">{desc}</span>
      </div>
      {register && (
        <div id="switchComp">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register(registerValue, {
                value: storeData,
              })}
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#222222]"></div>
          </label>
        </div>
      )}
    </div>
  );
};

export default CardSwitch;

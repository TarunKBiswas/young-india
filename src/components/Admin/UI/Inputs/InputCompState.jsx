/* eslint-disable react/prop-types */
const InputCompState = ({ label, type, value, setValue, size, required }) => {
  return (
    <div className={`${size || "w-full flex flex-col gap-0.5"}`}>
      <label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className=" border-gray-200 rounded placeholder:opacity-70"
        type={type || "text"}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputCompState;

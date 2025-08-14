/* eslint-disable react/prop-types */
const DisabledInput = ({ size, label, require, value }) => {
  return (
    <div className={size}>
      <label>
        {label}
        {require && <span className="text-red-500">*</span>}
      </label>
      <input
        className="w-full border-gray-200 rounded ring-0 focus:ring-0 placeholder:opacity-70"
        placeholder={label}
        value={value}
        disabled
      />
    </div>
  );
};

export default DisabledInput;

/* eslint-disable react/prop-types */
const InputCompState2 = ({
  size,
  label,
  required,
  type,
  defaultValue,
  setValue,
}) => {
  return (
    <div className={`${size}`}>
      <label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="form-control w-100 border-gray-200 rounded"
        type={type || "text"}
        placeholder={label}
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputCompState2;

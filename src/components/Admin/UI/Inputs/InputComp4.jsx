/* eslint-disable react/prop-types */
const InputComp4 = ({
  size,
  require,
  label,
  type,
  defaultValue,
  register,
  registerValue,
  value,
  errors,
  // setValue,
}) => {
  return (
    <div className={size}>
      <label>
        {label}
        {require && <span className="text-red-500">*</span>}
      </label>
      <input
        className="border-gray-200 rounded ring-0 focus:ring-0 placeholder:opacity-70"
        type={type || "text"}
        placeholder={label}
        defaultValue={defaultValue}
        {...register(registerValue, {
          value: value,
        })}
      />
      <p className="text-red-600 text-sm ">{errors}</p>
    </div>
  );
};

export default InputComp4;

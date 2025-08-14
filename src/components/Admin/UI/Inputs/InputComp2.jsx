/* eslint-disable react/prop-types */
const InputComp2 = ({
  label,
  register,
  registerValue,
  value,
  errors,
  size,
  type,
  lableStyle,
}) => {
  return (
    <div className={`${size} `}>
      <label className={lableStyle}>{label}</label>
      <input
        className=" outline-none border-gray-200 rounded ring-0 focus:ring-0 text-sm"
        type={type || "text"}
        {...register(registerValue, { value: value })}
      />
      <p className="text-red-600 text-sm ">{errors}</p>
    </div>
  );
};

export default InputComp2;

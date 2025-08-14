/* eslint-disable react/prop-types */
const InputComp = ({
  label,
  register,
  registerValue,
  errors,
  size,
  require,
  type,
  errmsgsize,
  labelsize,
  placeholder,
}) => {
  return (
    <div className={`${size} w-full`}>
      <label className={`text-base font-medium ${labelsize && labelsize}`}>
        {label}
        {require && <span className="text-red-500">*</span>}
      </label>
      <input
        className="form-control outline-none border-gray-200 rounded ring-0 focus:ring-0 placeholder:opacity-70 h-11 w-full"
        type={type || "text"}
        placeholder={placeholder}
        {...register(registerValue)}
      />
      <p className={`text-red-600 text-sm ${errmsgsize && errmsgsize}`}>
        {errors}
      </p>
    </div>
  );
};

export default InputComp;

/* eslint-disable react/prop-types */
const TextareaInput = ({
  size,
  label,
  rows,
  register,
  registerValue,
  error,
  require,
  // placeholder,
}) => {
  return (
    <div className={`${size}`}>
      <label className="text-base font-medium">
        {label}
        {require && <span className="text-red-500">*</span>}
      </label>
      <textarea
        rows={rows}
        // placeholder={placeholder}
        {...register(registerValue)}
        className="w-full border border-gray-200 outline-none placeholder:text-sm"
      />
      <p className="text-red-600 text-sm ">{error}</p>
    </div>
  );
};

export default TextareaInput;

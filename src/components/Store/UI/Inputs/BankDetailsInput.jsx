/* eslint-disable react/prop-types */
const BankDetailsInput = ({
  Icon,
  register,
  errors,
  registerValue,
  type,
  placeholder,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex  border rounded-lg items-center px-2 text-[14px] relative  w-full">
        <Icon className="w-4 h-4 absolute" />
        <input
          type={type || "text"}
          placeholder={placeholder}
          {...register(registerValue)}
          className="border-none outline-none w-full inputStyle"
        />
      </div>
      <div className="errorMessage">{errors}</div>
    </div>
  );
};

export default BankDetailsInput;

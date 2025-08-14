/* eslint-disable react/prop-types */

const InputComp3 = ({ register, label, type, registerValue, error }) => {
  return (
    <div className="w-full flex flex-col items-start gap-1 ">
      <label className="w-full">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <div className="w-full">
        <input
          className="formInput"
          type={type || "text"}
          placeholder={label}
          {...register(registerValue)}
        />
        <p className="text-red-600 text-sm ">{error}</p>
      </div>
    </div>
  );
};

export default InputComp3;

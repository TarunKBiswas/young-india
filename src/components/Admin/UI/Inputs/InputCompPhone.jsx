/* eslint-disable react/prop-types */

const InputCompPhone = ({ label, register, registerValue, error, col }) => {
  return (
    <div className={`w-full flex items-start ${col}`}>
      <label className=" col-sm-3  font-medium">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <div className="w-full">
        <input
          className="formInput"
          type="number"
          // placeholder={label}
          {...register(registerValue, {
            valueAsNumber: true,
            validate: (value) => value > 0,
            max: 10,
          })}
        />
        <p className="text-red-600 text-sm ">{error}</p>
      </div>
    </div>
  );
};

export default InputCompPhone;

/* eslint-disable react/prop-types */

function Input({ label, type, register, error, value, inputId }) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="text-xs capitalize font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type || "text"}
        {...register(value)}
        placeholder={`Enter Your ${label} `}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:ring-0 focus:outline-none focus:border-gray-700"
      />
      <small className="text-[11px] mt-0.5 text-red-500">{error}</small>
    </div>
  );
}

export default Input;

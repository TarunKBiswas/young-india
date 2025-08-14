/* eslint-disable react/prop-types */
const RatingInput = ({ size, label, required, value, setValue }) => {
  return (
    <div className={`${size}`}>
      <label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="form-control border-gray-200 rounded placeholder:opacity-70"
        type="number"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min="1"
        max="5"
        step="0.5"
      />
    </div>
  );
};

export default RatingInput;

/* eslint-disable react/prop-types */
export const AddButton = ({ text }) => {
  return (
    <button type="submit" className="submitButton">
      {text}
    </button>
  );
};

export const SubmitButton = () => {
  return (
    <div className="w-full flex items-center justify-end ">
      <button className="submitButton">Submit</button>
    </div>
  );
};

export const ApplyFilerButton = ({ action }) => {
  return (
    <div className="flex items-center justify-end border-gray-200 ">
      <div
        className="rounded bg-blue-600 px-3 py-2 text-xs font-medium text-white active:scale-95 cursor-pointer"
        onClick={action}
      >
        Apply Filters
      </div>
    </div>
  );
};

export const ResetFilerButton = ({ action }) => {
  return (
    <div className="flex items-center justify-end bg-transparent border  rounded">
      <div
        className="rounded  px-3 py-2 text-xs font-medium text-black active:scale-95 cursor-pointer"
        onClick={action}
      >
        Reset Filters
      </div>
    </div>
  );
};

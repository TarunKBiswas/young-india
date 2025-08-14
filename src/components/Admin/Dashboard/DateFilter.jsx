/* eslint-disable react/prop-types */
const DateFilter = ({ setDays, dates }) => {
  return (
    <div className="w-full flex items-center justify-center xl:justify-end gap-4">
      <select
        onChange={(e) => setDays(e.target.value)}
        className="border-none  text-sm bg-blue-100 text-[#2563EB] rounded "
      >
        <option value="" className="text-xs" selected disabled>
          Last 7 Days
        </option>
        {dates?.map((date, i) => {
          return (
            <option value={date} key={i}>
              {date}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DateFilter;

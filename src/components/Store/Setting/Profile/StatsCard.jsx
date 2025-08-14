/* eslint-disable react/prop-types */

const StatsCard = ({ data }) => {
  return (
    <div className="border rounded-md flex flex-col gap-3 p-3 cursor-pointer">
      <span className="text-xl font-bold leading-3 tracking-wide">
        {data?.stats}
      </span>
      <span className="text-xs font-normal leading-3 tracking-wide">
        {data?.title}
      </span>
    </div>
  );
};

export default StatsCard;

/* eslint-disable react/prop-types */
const StateCard = ({ data, navigationHandler }) => {
  return (
    <div
      className={`bg-gray-100 shadow-sm px-3 py-8 rounded-md md:rounded-lg  ${
        data.to ? "cursor-pointer" : null
      } `}
      onClick={() => navigationHandler(data?.to)}
    >
      <div className={`border-l-0`}>
        <div className="flex items-center gap-3 relative">
          <div className={`block ${data?.bgColor} p-3 rounded-full`}>
            {data?.StatIcon && (
              <data.StatIcon
                className={`${data?.iconStyle} text-sm xl:text-2xl`}
              />
            )}
          </div>
          <div className="flex items-start flex-col">
            <span className="text-sm font-extrabold md:text-2xl">
              {data?.statValue || 0}
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-500">
              {data?.statTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateCard;

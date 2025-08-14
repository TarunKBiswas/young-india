/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */

const InfoLogoCard = ({ data }) => {
  return (
    <div className="w-full flex items-center justify-start gap-2">
      {data?.avatar?.data !== null ? (
        <div className="w-12 h-12 rounded-full">
          <img
            className="h-full w-full rounded-full object-fill"
            src={data?.avatar?.url}
            alt="avatar"
            width="auto"
            height="auto"
          />
        </div>
      ) : (
        <p className="h-12 w-12 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
          <span className="text-black text-lg">{(data?.name).charAt(0)}</span>
        </p>
      )}
      <p className="flex flex-col items-start">
        <span className="font-semibold"> {data?.name}</span>
        <span className="text-xs"> {data?.phone}</span>
      </p>
    </div>
  );
};

export default InfoLogoCard;

/* eslint-disable react/prop-types */

const SkeletonLoader = ({ count }) => {
  return (
    <div className="grid gap-4 h-126">
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="flex w-full bg-white border overflow-hidden"
          key={index}
        >
          <div className=" w-1/3 lg:w-[25%] bg-cover object-top bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          <div className="w-full p-2 flex flex-col justify-between gap-2">
            <div className="w-full flex flex-col gap-1">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse mb-3 w-full"></div>
              <div className="flex w-full gap-10 justify-between mb-1">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/2"></div>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/3"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

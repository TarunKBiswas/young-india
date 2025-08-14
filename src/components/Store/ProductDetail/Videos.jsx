import ReactPlayer from "react-player";

/* eslint-disable react/prop-types */
const Videos = ({ data }) => {
  
  return (
    <div className="w-full flex items-center justify-center rounded-lg overflow-hidden">
      {data ? (
        <ReactPlayer url={data} />
      ) : (
        <span className="capitalize font-medium">No video Available</span>
      )}
    </div>
  );
};

export default Videos;

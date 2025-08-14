/* eslint-disable react/prop-types */

const VideoPlayer = ({ videoSrc, title, description, nextVideo, onNextVideo }) => {
  return (
    <div>
      <div className="w-full aspect-video mb-6">
        <iframe
          src={videoSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-md"
        ></iframe>
      </div>

      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      {nextVideo && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Next</h3>
          <div
            className="flex justify-between items-center p-4 bg-white border border-[#e4e0e0] rounded-md cursor-pointer"
            onClick={onNextVideo}
          >
            <span className="text-gray-800 font-medium">{nextVideo.title}</span>
            <span className="text-sm text-gray-500">{nextVideo.duration}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

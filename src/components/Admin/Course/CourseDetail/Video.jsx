
import { useNavigate } from "react-router-dom";
const Video = ({ videoData }) => {
  const navigate = useNavigate();
  console.log(videoData?.des);
  return (
    <div className="flex flex-col lg:flex-row  w-full gap-11 py-10 ">
      {/* Video Section */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 relative">
        <div className="w-full aspect-video mb-2">
          <iframe
            src={videoData?.lessonData[0]?.link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-md"
          ></iframe>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-2/3 gap-2 flex flex-col">
        <div className="flex items-start justify-start flex-col gap-2">
          <h1 className="text-3xl font-semibold text-gray-900  flex items-center">
            {videoData?.course_name}
          </h1>
          <p className="text-[#707070] text-[16px] font-normal text-start leading-relaxed max-w-[500px]">
            {videoData?.des}
          </p>
        </div>
        <div className="mt-4 flex flex-col items-start justify-end gap-3">
          <button
            onClick={() => navigate(`/academy/${videoData?.id}`)}
            className="bg-blue-600 border border-blue-700 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
          >
            🚀 Start the course
          </button>

          <div className="flex gap-2">
            {/* Avatars */}
            <div className="flex -space-x-2">
              <img
                src="https://app.minea.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmemoji1.b8a67b6f.png&w=48&q=75"
                alt="Avatar 1"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://app.minea.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmemoji2.858765ac.png&w=48&q=75"
                alt="Avatar 2"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://app.minea.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmemoji3.4fff0e49.png&w=48&q=75"
                alt="Avatar 3"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <p className="text-black text-[16px] flex items-center justify-center">
              Join the <span className="font-bold px-2">17,214</span> future
              ecommerce experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

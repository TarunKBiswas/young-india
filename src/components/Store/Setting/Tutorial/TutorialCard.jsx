/* eslint-disable react/prop-types */
import { AiOutlinePlayCircle } from "react-icons/ai";

const TutorialCard = ({ video, handleVideo }) => {
  return (
    <div className="flex flex-col border w-full" key={video?.id}>
      <div
        className="flex items-center justify-center relative"
        onClick={() => handleVideo(video?.video_url)}
      >
        <img
          src={video?.thumbnail?.url}
          width={"auto"}
          height={"auto"}
          alt="image"
          className=" w-full h-full lg:h-[220px] object-cover object-right-top"
        />
        <AiOutlinePlayCircle className="absolute w-10 h-10 flex items-center justify-center cursor-pointer font-semibold text-white" />
      </div>
      <div className="flex flex-col gap-2 py-2 px-2 justify-center">
        <p className="text-xs md:text-sm font-medium capitalize leading-6 ">
          {video?.name}
        </p>
        <p className="text-xs font-normal capitalize">
          {video?.description?.substring(0, 50) + "..."}
        </p>
      </div>
    </div>
  );
};

export default TutorialCard;

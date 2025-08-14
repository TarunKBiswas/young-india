import ReactPlayer from "react-player";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { IoMdCloseCircle } from "react-icons/io";

const TestimonialVideo = () => {
  const snap = useSnapshot(webState);

  return (
    <div
      id="hello"
      className=" fixed bg-black/20 flex items-center w-screen h-screen z-[99999] justify-center top-0 left-0"
    >
      <div className=" w-full flex items-center justify-center ">
        <div className="relative">
          <ReactPlayer url={snap?.videoUrl} controls={true} />

          <div
            className=" absolute right-3 top-2.5 bg-white rounded-full cursor-pointer "
            onClick={() => (webState.testimonialVideo = false)}
          >
            <IoMdCloseCircle className=" text-themecolor w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialVideo;

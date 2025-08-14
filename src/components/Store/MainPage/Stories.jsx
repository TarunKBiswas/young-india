/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { CategoryContainer } from "../UI/Wrappers/CategoryContainer";
import ReactLazyLoad from "react-lazyload";
import VideoCard from "./VideoCard";

const Stories = ({ videos }) => {
  const renderedVideos = useMemo(() => {
    return videos?.map((video) => {
      return (
        <ReactLazyLoad key={video.id} height={100} offset={100} once>
          <VideoCard data={video} />
        </ReactLazyLoad>
      );
    });
  }, [videos]);

  return (
    <CategoryContainer>
      {videos?.length > 0 && (
        <div className="scrollbar-hide overflow-x-scroll w-full max-w-[100vw] flex px-4 py-8 items-center gap-8">
          {renderedVideos}
        </div>
      )}
    </CategoryContainer>
  );
};

export default Stories;

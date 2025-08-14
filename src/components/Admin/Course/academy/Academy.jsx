/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import OutletWrapper from "../../../../Pages/OutletWrapper";
import VideoPlayer from "./VideoPlayer";
import SidebarList from "./SidebarList";
import SectionHeader from "./SectionHeader";
import { coursesData } from "../Course";

const Academy = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const courseData = coursesData?.find(
    (course) => course?.id === parseInt(id)
  );

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Course not found!</p>
      </div>
    );
  }
  const [currentVideo, setCurrentVideo] = useState(courseData?.lessonData[0]);

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center p-4 w-full bg-gray-50">
      <OutletWrapper>
        <FaArrowLeft
          onClick={() => navigate(`/course-detail/${id}`)}
          className="hover:scale-125 transition-all duration-500 cursor-pointer text-xl"
        />

        <div className="flex items-start justify-center flex-col lg:flex-row w-full mt-12 gap-8">
          <div className="w-full lg:w-3/4">
            <VideoPlayer
              videoSrc={currentVideo?.link}
              title={currentVideo?.title}
              description={currentVideo?.description}
              nextVideo={courseData.lessonData.find(
                (lesson) => lesson.lesson === currentVideo?.lesson + 1
              )}
              onNextVideo={() => {
                const nextVideo = courseData.lessonData.find(
                  (lesson) => lesson.lesson === currentVideo?.lesson + 1
                );
                if (nextVideo) handleVideoChange(nextVideo);
              }}
            />
          </div>

          <div className="w-full lg:w-1/4 rounded-md flex flex-col gap-12">
            {/* {courseData?.lessonData?.map((section, sectionIdx) => ( */}
            <div>
              <SectionHeader
                // title={`${sectionIdx + 1}. ${section.section}`}
                title={`Pillars & Mindset`}
              />
              <SidebarList
                items={courseData?.lessonData?.map((lesson) => ({
                  ...lesson,
                  isActive: lesson.title === currentVideo?.title,
                }))}
                onItemClick={handleVideoChange}
              />
            </div>
            {/* ))} */}
          </div>
        </div>
      </OutletWrapper>
    </div>
  );
};

export default Academy;

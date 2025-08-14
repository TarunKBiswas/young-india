import OutletWrapper from "../../../../Pages/OutletWrapper";
import CourseOutline from "./CourseOutline";
import SummaryCard from "./SummaryCard";
import Video from "./Video";
import { useParams } from "react-router-dom";
import { coursesData } from "../Course";

const CourseDetails = () => {
  const { id } = useParams();
  const courseData = coursesData.find((course) => course?.id === parseInt(id));
  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Course not found!</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#f5f5f5] flex items-center justify-center w-full p-3">
        <OutletWrapper className="w-full">
          <Video videoData={courseData} />
        </OutletWrapper>
      </div>
      <div className="w-full mt-20 flex items-start justify-center">
        <OutletWrapper className="w-full flex items-start justify-center gap-10 px-4">
          <div className="w-1/5 hidden md:flex">
            <SummaryCard summary={courseData} />
          </div>
          <div className="w-full md:w-4/5">
            <CourseOutline outline={courseData} />
          </div>
        </OutletWrapper>
      </div>
    </>
  );
};

export default CourseDetails;

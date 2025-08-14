/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import TutorialCard from "./TutorialCard";
import { webState } from "../../../../data/webStates";
import { useState } from "react";
import { getTutorials } from "../../../../utils/Store/Tutorials";
import NoDataAnime from "../../UI/NoDataAnime";
import { useSnapshot } from "valtio";

const WebTutorial = () => {
  const [tutorialList, setTutorialList] = useState(null);
  const snap = useSnapshot(webState);

  const getTutorial = async () => {
    try {
      let res = await getTutorials();
      setTutorialList(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tutorialList === null) {
      getTutorial();
    }
  }, []);

  const handleVideo = (link) => {
    const videoLink = `${link}`;
    window.open(videoLink, "_blank");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 max-w-[1440px] mx-auto bg-white ">
      <div className="w-full flex items-center justify-start mb-3 ">
        <span className="text-2xl font-normal text-darkText">Tutorials</span>
      </div>

      <div className="w-full h-full rounded p-2.5 max-h-[800px] overflow-scroll scrollbar-hide">
        {tutorialList?.length > 0 ? (
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tutorialList?.map((data) => {
              return <TutorialCard video={data} handleVideo={handleVideo} />;
            })}
          </div>
        ) : (
          <div
            className={`${
              !snap?.isLoading ? "hidden " : "flex"
            } w-full  items-center justify-center mt-20 lg:mt-0"`}
          >
            <NoDataAnime msg={"No Tutorial found"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WebTutorial;

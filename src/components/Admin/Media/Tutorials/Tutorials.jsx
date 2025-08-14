import { useEffect, useState } from "react";
import { getTutorials } from "../../../../utils/Tutorials.js";
import { state } from "../../../../data/state.js";
import { AiFillYoutube } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useSnapshot } from "valtio";
import CreateButton from "../../UI/Buttons/CreateButton.jsx";

const Tutorials = () => {
  const [tutorialList, setTutorialList] = useState([]);
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const getTutorial = async () => {
    try {
      let res = await getTutorials();
      if (res?.status === 200) {
        setTutorialList(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTutorial();
    state.refreshTutList = false;
  }, [snap.refreshTutList]);

  const handleVideo = (link) => {
    const videoLink = `${link}`;
    window.open(videoLink, "_blank");
  };

  const deleteModalHandler = (id) => {
    state.selectedTutorialID = id;
    state.showDeleteTutModal = true;
  };

  const updateTutorialHandler = (id) => {
    navigate(`${id}`);
  };

  return (
    <>
      <div className=" px-2 mt-[-50px]">
        <div className="w-full flex items-center justify-between pb-4 pt-2 mt-16 lg:mt-0">
          <span className="text-black text-2xl font-semibold"></span>
          <CreateButton to={"add"} title={"Add New"} />
        </div>

        {tutorialList?.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {tutorialList?.map((video) => {
              return (
                <div
                  className="relative mx-auto w-full max-w-xs shadow-sm rounded-sm "
                  key={video?.id}
                >
                  <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
                    <div className="rounded-lg ">
                      <div
                        className="relative flex h-full items-center justify-center overflow-hidden rounded-lg rounded-b-none"
                        onClick={() =>
                          handleVideo(video?.attributes?.video_url)
                        }
                      >
                        <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                          <img
                            src={
                              video?.attributes?.thumbnail?.data?.attributes
                                ?.url
                            }
                            alt="Image"
                            width={"auto"}
                            height={"auto"}
                            className="object-contain w-full h-full"
                          />
                        </div>

                        <span className="absolute z-10 mx-auto rounded-lg text-sm font-medium text-white">
                          <AiFillYoutube className="h-10 w-10 text-red-500 cursor-pointer" />
                        </span>
                      </div>
                      <div>
                        <div className="mt-4 grid grid-cols-2">
                          <div className="flex items-center">
                            <div className="relative">
                              <h2 className="line-clamp-1 text-base font-medium text-gray-800 md:text-lg px-1">
                                {video?.attributes?.name}
                              </h2>
                            </div>
                          </div>
                          <div className="flex items-center justify-end">
                            <p className="text-primary whitespace-nowrap rounded-xl font-semibold leading-tight flex items-center gap-2">
                              <span className="text-lg hover:scale-125 transition-all duration-300">
                                <BsPencil
                                  onClick={() =>
                                    updateTutorialHandler(video?.id)
                                  }
                                />
                              </span>
                              <span className="text-lg hover:scale-125 transition-all duration-300 text-red-500">
                                <BsTrash
                                  onClick={() => deleteModalHandler(video?.id)}
                                />
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 border-t border-gray-200 pt-3 px-1">
                          {video?.attributes?.description?.substring(0, 100) +
                            "..."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Tutorials;

import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { useEffect, useState } from "react";
import { singleStory } from "../../../../utils/Store/Homepage";
import { CgArrowLeft } from "react-icons/cg";
import StoriesCard from "../Cards/StoriesCard";
import { SlHandbag } from "react-icons/sl";

const StoriesModal = () => {
  const snap = useSnapshot(webState);
  const [moreProduct, setMoreProduct] = useState(false);
  const [storiesInfo, setStoriesInfo] = useState();

  const closeModalHandler = () => {
    webState.stories = false;
  };

  const moreProductHandler = () => {
    setMoreProduct(!moreProduct);
  };

  const singleStoriesInfo = async () => {
    try {
      let res = await singleStory(snap?.storiesDataID);
      if (res?.status === 200) {
        setStoriesInfo(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleStoriesInfo();
  }, []);

  return (
    <>
      <div className="hidden lg:flex bg-black fixed top-0 right-0 left-0 z-50 w-screen h-screen ">
        <div className="flex justify-between  h-full w-full px-12">
          <div className="relative">
            <button
              onClick={closeModalHandler}
              type="button"
              className="absolute top-10  text-sm p-1.5 ml-auto inline-flex items-center text-white"
              data-modal-toggle="authentication-modal"
            >
              <CgArrowLeft className="h-6 w-6 fill-white" />
            </button>
          </div>

          <div className="h-full w-full flex items-center justify-center">
            <video
              loop={true}
              controls={true}
              autoPlay
              src={storiesInfo?.video?.url}
              className="lg:w-[460px] lg:h-[850px] aspect-video "
            />
          </div>

          <div className="right-10 mt-8 rounded flex flex-col items-center overflow-y-auto scrollbar-hide p-3 gap-4">
            {storiesInfo?.products?.map((item) => {
              return <StoriesCard product={item} key={item?.id} />;
            })}
          </div>
        </div>
      </div>

      <div className="lg:hidden flex flex-col bg-black/[0.90] fixed top-0 right-0 left-0 z-50 w-screen h-screen ">
        {/* <!-- Modal content --> */}
        <div className="flex flex-col items-center  h-full w-full ">
          <div className="h-screen flex flex-col items-center justify-center relative ">
            <button
              onClick={closeModalHandler}
              type="button"
              className="absolute top-10 left-0 text-sm p-1.5 ml-auto z-[99999999] inline-flex items-center text-white"
              data-modal-toggle="authentication-modal"
            >
              <CgArrowLeft className="h-6 w-6 fill-white" />
            </button>
            <div className="h-full w-full flex items-center justify-center">
              <video
                loop={true}
                controls={true}
                autoPlay
                id="vidplayer"
                src={storiesInfo?.video?.url}
                className="h-full w-full aspect-video"
              ></video>
            </div>

            {!moreProduct && (
              <div
                className="flex items-center justify-end gap-2 bg-white/30 px-2.5 py-1.5 absolute bottom-5 right-2"
                onClick={moreProductHandler}
              >
                <div className="bg-white rounded-full w-8 h-8">
                  <SlHandbag className="w-8 h-5 mt-1 text-black flex items-center justify-center " />
                </div>
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-sm font-medium text-white">
                    Screenshop photo
                  </span>
                  <span className="text-xs font-normal text-white">
                    Tap for products
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex overflow-x-scroll w-screen scrollbar-hide absolute bottom-2 gap-2 px-2">
          {moreProduct && (
            <div
              className="flex justify-end absolute right-2 text-white w-screen "
              onClick={moreProductHandler}
            >
              x
            </div>
          )}
          {moreProduct &&
            storiesInfo?.products?.map((item) => {
              return (
                <StoriesCard
                  product={item}
                  key={item?.id}
                  className="relative"
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default StoriesModal;

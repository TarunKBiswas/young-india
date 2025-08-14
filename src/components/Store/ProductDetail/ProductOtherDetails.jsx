/* eslint-disable react/prop-types */
import { useState } from "react";
import Description from "./Description";
import Reviews from "./Reviews";
import Videos from "./Videos";
// import { useParams } from "react-router-dom";
// import { webState } from "../../../data/webStates";
// import { useSnapshot } from "valtio";

const ProductOtherDetails = ({ data, rating, setRating }) => {
  // const param = useParams();
  // const snap = useSnapshot(webState);
  // const id = param.id;
  const [active, setActive] = useState("review");

  const handleClick = (e) => {
    setActive(e.target.id);
  };

  // const addReviewModal = (id) => {
  //   if (snap.loggedinUserData) {
  //     webState.selectedID = id;
  //     webState.showAddReviewModal = true;
  //   } else {
  //     webState.showFlipModal = true;
  //   }
  // };

  return (
    <div className="flex flex-col gap-5 lg:gap-10 w-full pt-10">
      {data?.yt_video_link && <Videos data={data?.yt_video_link} />}
      <div className="w-full border p-6 rounded mb-8">
        <div className="w-full flex items-center justify-between flex-col gap-8 lg:flex-row">
          <div className="w-full flex items-center justify-center lg:justify-start gap-6">
            <button
              className={
                active === "review"
                  ? "webFilterBtn bg-themecolor text-textcolor"
                  : "webFilterBtn"
              }
              onClick={handleClick}
              id="review"
            >
              Reviews
            </button>
            <button
              className={
                active === "description"
                  ? "webFilterBtn bg-themecolor text-textcolor"
                  : "webFilterBtn"
              }
              onClick={handleClick}
              id="description"
            >
              Descriptions
            </button>
            {/* <button
              className={
                active === "video"
                  ? "webFilterBtn bg-themecolor text-textcolor "
                  : "webFilterBtn"
              }
              onClick={handleClick}
              id="video"
            >
              Videos
            </button> */}
          </div>
          {/* {snap.loggedinUserData && (
            <div className="w-full flex items-center justify-end">
              <div
                className={
                  active === "review"
                    ? "rounded bg-themecolor text-textcolor text-xs py-2 px-2 hover:scale-95 transition-all duration-300 cursor-pointer"
                    : "hidden"
                }
                onClick={() => addReviewModal(id)}
              >
                Write Product Review
              </div>
            </div>
          )} */}
        </div>

        <hr className="my-4 hidden lg:flex" />

        <div className="w-full flex items-center mt-6 lg:mt-0">
          {active === "review" ? (
            <Reviews rating={rating} setRating={setRating} />
          ) : null}
          {active === "description" ? (
            <Description data={data?.description} />
          ) : null}

          {/* {active === "video" ? <Videos data={data?.yt_video_link} /> : null} */}
        </div>
      </div>
    </div>
  );
};

export default ProductOtherDetails;

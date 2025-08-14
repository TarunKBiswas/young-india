/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getReviewList } from "../../../utils/Store/Reviews";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import StarRating from "../UI/StarRating";
import moment from "moment";
import { webState } from "../../../data/webStates";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Reviews = ({ rating, setRating }) => {
  const param = useParams();
  const snap = useSnapshot(webState);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState({});

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const getData = async () => {
    let res = await getReviewList(param.id);
    // console.log(res);
    setReviews(res?.data?.data);
    setRating(res?.data?.data);
    setImages(res?.data?.data?.gallary?.map((review) => review[0]?.url));
  };

  useEffect(() => {
    getData();
    webState.refreshReviewsList = false;
  }, [snap.refreshReviewsList]);

  return (
    <div className="w-full flex items-center justify-center">
      {reviews?.length > 0 ? (
        <div
          className={`w-full max-h-[500px] overflow-y-scroll scrollbar-hide ${
            reviews?.length < 4 ? "scrollbar-hide" : ""
          } `}
        >
          <div className="w-full flex flex-col justify-between mt-3 gap-4 ">
            {reviews?.map((review) => {
              return (
                <div key={review?.id}>
                  <div className="w-full flex flex-col items-start">
                    <div className="w-full flex items-center gap-2">
                      <p className="h-8 w-8 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
                        <span className="text-black text-sm font-medium">
                          {review?.user?.name?.charAt(0) ||
                            review?.name?.charAt(0)}
                        </span>
                      </p>

                      <span className="flex items-center gap-1 font-medium">
                        {review?.name || review?.user?.name}
                        <RiVerifiedBadgeFill className="fill-green-600" />
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-2 mt-1">
                      <span className="pt-1 flex items-center gap-4">
                        {/* <StarRating rating={review?.rating} /> */}
                        <StarRating review={review} />
                        <span className="font-bold text-black">
                          {review?.title}
                        </span>
                      </span>
                      <span className="text-gray-500">
                        Reviewd On{" "}
                        {moment(review?.createdAt)?.format("DD MMM YYYY")}
                      </span>
                      <hr className="w-1/3" />
                      <span>{review?.review}</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center gap-2 mt-2">
                    {review?.gallery?.map((image, i) => {
                      return (
                        <div key={i}>
                          <img
                            src={image?.url}
                            onClick={() => handleImageClick(i)}
                            width={"auto"}
                            height={"auto"}
                            alt="image"
                            className="h-full w-32 object-cover cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    index={currentIndex}
                    slides={images}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <span className="capitalize text-center font-medium">
          No Reviews Available
        </span>
      )}
    </div>
  );
};

export default Reviews;

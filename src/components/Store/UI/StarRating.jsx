/* eslint-disable react/prop-types */

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ review }) => {
  const stars = [];
  const fullStars = Math.floor(review?.rating);
  const hasHalfStar = review?.rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar className="fill-[#EAB308]" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt className="fill-[#EAB308]" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar className="text-gray-200" />);
  }

  return (
    <div key={review?.id} className="flex items-center gap-1">
      {stars}
    </div>
  );
};

export default StarRating;

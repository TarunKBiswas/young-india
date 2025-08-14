/* eslint-disable react/prop-types */

const Rating = ({ className }) => {
  return (
    <div>
      <svg
        className={className}
        fill="none"
        viewBox="0 0 25 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1749_39439)">
          <path
            d="M19.9675 23.3151L12.5005 17.8271L5.0335 23.3151L7.9005 14.4521L0.4375 8.99909H9.6515L12.5005 0.121094L15.3495 8.99909H24.5625L17.1005 14.4521L19.9675 23.3151Z"
            fill="#F5D426"
          />
        </g>
        <defs>
          <clipPath id="clip0_1749_39439">
            <rect
              height="24"
              width="24"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Rating;

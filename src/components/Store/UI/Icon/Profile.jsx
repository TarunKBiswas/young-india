/* eslint-disable react/prop-types */

const Profile = ({ onClick, className }) => {
  return (
    <div onClick={onClick}>
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2676_8630)">
          <circle cx="12" cy="6" r="4" stroke="#222222" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="17"
            rx="7"
            ry="4"
            stroke="#222222"
            strokeWidth="1.5"
          />
        </g>
        <defs>
          <clipPath id="clip0_2676_8630">
            <rect height="24" width="24" fill="white" rx="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Profile;

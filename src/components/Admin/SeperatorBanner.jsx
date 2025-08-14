import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const SeperatorBanner = ({ banners }) => {
  const navigate = useNavigate();

  const navigateHandler = (id) => {
    navigate(`/collection/${id}`);
  };

  const banner = banners?.desktop_thumbnail?.url;

  return (
    <div
      className={`w-full flex items-center justify-center${
        banner !== undefined ? "my-20" : ""
      }`}
    >
      <img
        src={banner}
        alt="banner"
        width="auto"
        height="auto"
        loading="lazy"
        data-aos="zoom-in"
        data-aos-duration="300"
        className="w-full object-cover object-top cursor-pointer"
        onClick={() => navigateHandler(banners.data)}
      />
    </div>
  );
};

export default SeperatorBanner;

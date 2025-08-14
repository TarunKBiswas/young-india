import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const VideoCard = ({ data }) => {
  const navigate = useNavigate();

  const video = data?.video?.url;
  const image = data?.thumbnail?.url || data?.products[0]?.thumbnail?.url;
  const name = data?.products[0]?.name;
  const price = data?.products[0]?.variants[0]?.price;
  const strikePrice = data?.products[0]?.variants[0]?.strike_price;

  const navigateHandler = () => {
    navigate(`/product/${data?.products[0]?.id}`);
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer shadow-sm justify-start w-[185px] h-max p-0 m-0 flex-shrink-0 relative z-0 text-themecolor rounded-[5px] overflow-hidden"
      onClick={navigateHandler}
    >
      {/* Video Section */}
      <div className="flex flex-col items-center justify-center w-full h-[330px] p-0 m-0 flex-shrink-0 relative z-0 bg-white text-black ">
        <div className="flex h-full w-full overflow-hidden object-cover">
          <video
            preload="none"
            loop
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover rounded-[2px]"
            src={video}
          ></video>
        </div>
      </div>

      {/* Image Section */}
      <img
        loading="lazy"
        alt="Product"
        width={"auto"}
        height={"auto"}
        src={image}
        className="flex flex-col items-center justify-center w-[50px] h-[50px] object-cover rounded-[2px] mt-[-20px] z-[1]"
      />
      {/* Text Section */}
      <div className="flex flex-col items-center justify-center w-full p-[6px_4px_0] text-center">
        <p className="text-[14px] font-semibold line-clamp-3 overflow-hidden">
          {name?.slice(0, 40)}
        </p>
      </div>
      {/* Price Section */}
      <div className="flex flex-row items-center justify-center w-full p-[4px_4px_4px_5px]">
        <span className="text-[14px] font-medium mr-[7px]">₹ {price}</span>
        <span className="text-[14px] font-medium line-through">
          ₹ {strikePrice}
        </span>
      </div>
    </div>
  );
};

export default VideoCard;

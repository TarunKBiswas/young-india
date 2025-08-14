import OutletWrapper from "../../../Pages/OutletWrapper.jsx";
import BannerListing from "./Banner/BannerListing.jsx";

const Media = () => {
  return (
    <OutletWrapper>
      <div className="w-full flex items-start justify-between flex-col">
        <span className="text-black text-2xl font-semibold">Banners</span>
        <div className="w-full sm:px-0 mt-4">
          <BannerListing />
        </div>
      </div>
    </OutletWrapper>
  );
};

export default Media;

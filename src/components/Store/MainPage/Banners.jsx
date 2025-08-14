/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

const Banners = ({ banners }) => {
  const navigate = useNavigate();

  const processedData = useMemo(() => {
    return banners?.filter((banner) => banner?.type === "HEADER");
  }, [banners]);

  const images = processedData?.map((item) => {
    // console.log(item);
    return {
      original: item?.mobile_thumbnail?.url,
      id: item?.data,
    };
  });

  const navigateHandler = (id) => {
    navigate(`/collection/${id}`);
  };

  useEffect(() => {
    const images = document.querySelectorAll(".carousel-item img");
    images.forEach((img) => {
      img.classList.add("zoom-transition");
    });
  }, [processedData]);

  const clickHandler = (id) => {
    navigateHandler(id);
  };

  const renderItem = (item) => {
    return (
      <div onClick={() => clickHandler(item.id)}>
        <img
          src={item?.original}
          alt="banner"
          className="carousel-item max-w-[100vw]"
        />
      </div>
    );
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      data-aos="zoom-in"
      data-aos-duration="300"
    >
      <div className="hidden lg:block">
        {
          <Carousel
            autoPlay
            swipeable={true}
            infiniteLoop
            showArrows={false}
            useKeyboardArrows
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            interval={5000}
          >
            {processedData?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="cursor-pointer  hidden lg:block w-full 3xl:max-h-[800px] max-w-[100vw] mx-auto"
                  // className="cursor-pointer  hidden lg:block w-full xl:max-h-[calc(100vh_-_120px)] aspect-[16/9] mx-auto"
                  onClick={() => navigateHandler(item.data)}
                >
                  <img
                    alt="image"
                    loading="lazy"
                    src={item?.desktop_thumbnail?.url}
                    className={`h-full w-full object-top cursor-pointer object-cover`}
                  />
                </div>
              );
            })}
          </Carousel>
        }
      </div>

      {processedData && (
        <div className="block lg:hidden">
          <ImageGallery
            items={images}
            showNav={false}
            disableSwipe={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            showBullets={true}
            autoPlay={true}
            lazyLoad
            renderItem={renderItem} // Custom render method
          />
        </div>
      )}
    </div>
  );
};

export default Banners;

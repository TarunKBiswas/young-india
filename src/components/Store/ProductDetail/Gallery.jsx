/* eslint-disable react/prop-types */
import { useMemo } from "react";

const Gallery = ({ productDetail, activeImage, setActiveImage }) => {
  const { thumbnail, gallery } = productDetail || {};

  const galleryImages = useMemo(
    () => (gallery ? [thumbnail, ...gallery] : [thumbnail]),
    [thumbnail, gallery]
  );

  const handleImageClick = (url) => {
    setActiveImage(url);
  };

  return (
    <div className="w-full xl:h-[82vh] mx-auto lg:w-7/12  flex flex-col-reverse lg:flex-row gap-2 lg:gap-5">
      <div className="h-full flex lg:flex-col gap-2 overflow-y-auto scrollbar-hide lg:px-0">
        {galleryImages?.map((image, index) => (
          <img
            key={index}
            src={image?.url}
            loading="lazy"
            width={"auto"}
            height={"auto"}
            alt="image"
            data-aos="fade-down"
            data-aos-duration="300"
            data-aos-delay={index * 100}
            className="w-[120px] max-h-[180px] object-cover object-center cursor-pointer rounded"
            onClick={() => handleImageClick(image?.url)}
          />
        ))}
      </div>

      {activeImage && (
        <div className="w-full flex flex-1 flex-col gap-6 lg:w-[520px] xl:w-[800px] h-full bg-gray-50 rounded">
          <img
            src={activeImage}
            alt="image"
            loading="lazy"
            className="w-full h-full object-contain object-top rounded"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;

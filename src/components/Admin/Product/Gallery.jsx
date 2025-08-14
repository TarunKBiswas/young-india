/* eslint-disable react/prop-types */
// import ReactImageMagnify from "react-image-magnify";

const Gallery = ({ product, activeImage, setActiveImage }) => {
  return (
    <div className="w-full gap-2 flex flex-col-reverse lg:flex-row lg:gap-8">
      <div
        className={`max-h-[450px] flex lg:flex-col gap-3 overflow-y-auto scrollbar-hide`}
      >
        <img
          src={product?.thumbnail?.data?.attributes?.url}
          alt="Image"
          width={"auto"}
          height={"auto"}
          className="w-24 max-h-28 object-fill rounded-sm shadow-sm cursor-pointer"
          onClick={() =>
            setActiveImage(product?.thumbnail?.data?.attributes?.url)
          }
        />
        {product?.gallery?.data?.map((img, i) => {
          return (
            <img
              src={img?.attributes?.url}
              alt="Image"
              width={"auto"}
              height={"auto"}
              className="w-24 max-h-full object-fill rounded-sm shadow-sm cursor-pointer"
              onClick={() => setActiveImage(img?.attributes?.url)}
              key={i}
            />
          );
        })}
      </div>

      {activeImage !== null && <img src={activeImage} alt="Image" />}
      {/* {activeImage !== null ? (
        <div className="z-10 flex flex-col items-start justify-start gap-6 lg:w-[600px] max-h-full lg:max-h-[450px]">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src:  activeImage,
                sizes:
                  "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
              },
              largeImage: {
                src:  activeImage,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: "150%",
                height: "100%",
              },
            }}
          />
        </div>
      ) : null} */}
    </div>
  );
};

export default Gallery;

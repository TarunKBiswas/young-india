/* eslint-disable react/prop-types */

const BannerInfo = ({ data }) => {
  return (
    <div className="flex items-center gap-2 ">
      <img
        alt="Banner"
        width={"auto"}
        height={"auto"}
        src={data}
        className="rounded h-full max-h-40 max-w-[300px] object-contain"
      />
    </div>
  );
};

export default BannerInfo;

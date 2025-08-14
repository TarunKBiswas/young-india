/* eslint-disable react/prop-types */
const Description = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-start w-full mt-3">
      <div className="w-full flex items-start justify-between">
        <span
          className="text-neutral-800 text-opacity-70 text-sm lg:text-base font-normal leading-tight"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    </div>
  );
};

export default Description;

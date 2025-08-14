/* eslint-disable react/prop-types */

const CategoryInfoCard = ({ cat, catDetailsHandler }) => {
  let image = cat?.thumbnail?.url;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer h-full w-full "
      onClick={catDetailsHandler ? () => catDetailsHandler(cat?.id) : null}
    >
      <div className="w-14 h-14 bg-gray-200 flex items-center justify-center ">
        <img
          className="rounded h-full w-full object-cover "
          src={image}
          alt="Image"
          width="auto"
          height="auto"
        />
      </div>
    </div>
  );
};

export default CategoryInfoCard;

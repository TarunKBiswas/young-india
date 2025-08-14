/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categories }) => {
  const navigate = useNavigate();

  const catHandler = (id) => {
    navigate(`category/${id}`);
  };

  const item = categories;
  const image = item?.thumbnail?.url || item?.image_url;

  // console.log(item);

  return (
    <div
      key={item?.id}
      // className={`flex items-center flex-col cursor-pointer gap-2 lg:gap-6 min-w-[110px] h-full lg:min-w-[200px] group transition-all duration-300 ease-in-out
      //   ${
      //   loadedImages?.includes(index)
      //     ? "opacity-100 transform translate-y-0"
      //     : "opacity-100 lg:opacity-0 transform translate-y-4"
      // }`}
      className={`flex items-center flex-col cursor-pointer gap-2 lg:gap-6 min-w-[110px] h-full lg:min-w-[200px] group transition-all duration-300 ease-in-out `}
      // onClick={() => catHandler(item?.id)}
    >
      <div className="w-full h-[110px] md:h-[245px]">
        <img
          src={image}
          width={"auto"}
          height={"auto"}
          alt="image"
          loading="lazy"
          className="w-full object-cover h-full object-top hover:opacity-75 transition-opacity duration-300 ease-in-out rounded"
        />
      </div>
      <div className="text-zinc-700 text-center text-sm lg:text-base capitalize group-hover:font-semibold transition-all duration-300">
        {item?.name}
      </div>
    </div>
  );
};

export default CategoryCard;

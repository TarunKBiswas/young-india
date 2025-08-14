/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categories }) => {
  const navigate = useNavigate();

  const catHandler = (id) => {
    navigate(`category/${id}`);
  };

  const item = categories;
  const image = item?.thumbnail?.url;

  // console.log(item);

  return (
    // <div
    //   key={item?.id}
    //   className={`flex items-center flex-col cursor-pointer gap-2 lg:gap-6 min-w-[110px] h-full lg:min-w-[200px] group transition-all duration-300 ease-in-out `}
    //   onClick={() => catHandler(item?.id)}
    // >
    //   <div className="w-full h-[110px] md:h-80">
    //     <img
    //       src={image}
    //       width={"auto"}
    //       height={"auto"}
    //       alt="image"
    //       loading="lazy"
    //       className="w-full object-cover h-full object-top hover:opacity-75 transition-opacity duration-300 ease-in-out rounded"
    //     />
    //   </div>
    //   <div className="text-zinc-700 font-semibold text-center text-sm lg:text-base capitalize group-hover:font-semibold transition-all duration-300">
    //     {item?.name}
    //   </div>
    // </div>
    <div
      key={item?.id}
      className={`flex flex-col items-center min-w-[150px] cursor-pointer gap-2 group transition-all duration-300 ease-in-out`}
      onClick={() => catHandler(item?.id)}
    >
      <div className="aspect-[16/9] w-full md:max-w-[500px] h-full overflow-hidden hover:opacity-75 transition-opacity duration-300 ease-in-out rounded">
        <img
          src={image}
          width={"auto"}
          height={"auto"}
          alt="image"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="capitalize">{item?.name}</div>
    </div>
  );
};

export default CategoryCard;

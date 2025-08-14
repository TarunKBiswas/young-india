/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { CategoryContainer } from "../UI/Wrappers/CategoryContainer";

const SubCategory = ({ subCategoriesData }) => {
  const navigate = useNavigate();

  const subCategoriesHandler = (id) => {
    navigate(`subCategories/${id}`);
  };

  return (
    <CategoryContainer>
      <div className="w-full flex items-start overflow-x-scroll scrollbar-hide max-w-[380px] sm:max-w-[600px] lg:max-w-[1240px] mx-auto px-2">
        <div
          key={subCategoriesData?.id}
          className="flex items-center flex-col cursor-pointer min-w-[110px] max-w-[200px] lg:min-w-[180px] mx-auto mt-3 "
          onClick={() => subCategoriesHandler(subCategoriesData?.id)}
        >
          <img
            src={subCategoriesData?.thumbnail?.formats?.thumbnail?.url}
            width={"auto"}
            height={"auto"}
            alt="image"
            className="w-full h-[75px] object-cover lg:h-[120px] object-top rounded-md"
          />
          <span className="text-black pt-2 text-xs lg:text-base">
            {subCategoriesData?.name}
          </span>
        </div>
      </div>
    </CategoryContainer>
  );
};

export default SubCategory;

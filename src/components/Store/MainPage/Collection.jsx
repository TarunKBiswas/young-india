/* eslint-disable react/prop-types */
import { CategoryContainer } from "../UI/Wrappers/CategoryContainer";
import CollectionCard from "./CollectionCard";

const Collection = ({ collection }) => {
  return (
    <CategoryContainer>
      {/* <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5  ">
      {collection?.map((item) => {
        return (
           <CollectionList collection={item} key={item.id} />
           )
          })}
          </div> */}
      {/* <h2 className="w-full flex items-start mt-3 lg:justify-center text-xl lg:text-3xl font-bold tracking-wider text-gray-900">
          Collection
        </h2> */}
      {/* <h2 className="w-full flex items-start mt-3 lg:justify-center text-xl lg:text-3xl font-bold tracking-wider text-gray-900">
        Collection
      </h2> */}
      <div className="w-full flex flex-col items-start overflow-x-scroll scrollbar-hide max-w-[380px] sm:max-w-[600px] lg:max-w-[1240px] mx-auto px-2">
        {collection?.map((item) => {
          return <CollectionCard collection={item} key={item.id} />;
        })}
      </div>
    </CategoryContainer>
  );
};

export default Collection;

/* eslint-disable react/prop-types */

import Container from "../UI/Wrappers/Container.Wrapper";
import ProductCard from "../UI/ProductCard";
import NoDataAnime from "../UI/NoDataAnime";

const CollectionCard = ({ collection }) => {
  return (
    <Container>
      <div className="mb-4 mt-8 lg:mt-10 px-1 h-full">
        <h2 className="w-full flex items-start text-md lg:text-2xl font-bold tracking-wider text-gray-900">
          {collection?.name}
        </h2>
        {collection?.products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-3 ">
            {collection?.products?.map((item) => {
              return <ProductCard product={item} key={item?.id} />;
            })}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center h-full mt-5">
            <NoDataAnime msg={"No Products Found"} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default CollectionCard;

// import { Container } from "postcss";
import { useEffect, useState } from "react";
import { getSubCategoryProduct } from "../../../utils/Store/Categories";
import ProductCard from "../UI/ProductCard";
import NoDataAnime from "../UI/NoDataAnime";
import { useParams } from "react-router-dom";

const SubCategoriesList = () => {
  const param = useParams();
  const [product, setProduct] = useState([]);

  const categoryProduct = async () => {
    try {
      let res = getSubCategoryProduct(param.id);
      if (res?.status === 200) {
        setProduct(res?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categoryProduct();
  }, []);

  return (
    // <Container>
    <div className="w-full flex items-center justify-center">
      {product?.length > 0 ? (
        <div className="w-full my-4 grid grid-cols-2 gap-2 lg:grid-cols-4 px-1 place-items-center">
          {product?.map((item, i) => {
            return <ProductCard product={item} key={i} />;
          })}
        </div>
      ) : (
        <div className="w-full ">
          <NoDataAnime />
        </div>
      )}
    </div>

    // {/* <div className="flex items-center justify-center w-full my-3">
    //   {page <= totalPageCount && (
    //     <button
    //       type="submit"
    //       onClick={handleShowMoreClick}
    //       className="flex items-center justify-center border rounded-md p-2 bg-themecolor text-white"
    //     >
    //       Show More
    //     </button>
    //   )}
    // </div> */}

    // </Container>
  );
};

export default SubCategoriesList;

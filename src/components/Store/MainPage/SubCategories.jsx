import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubCategoryProducts } from "../../../utils/categoryAPI";
import Container from "../UI/Wrappers/Container.Wrapper";
import ProductCard from "../UI/Cards/ProductCard";
import NoDataAnime from "../../Admin/UI/NoDataAnime";

const SubCategories = () => {
  const param = useParams();
  const [subCategoryProduct, setSubCategoryProduct] = useState([]);
  const [data, setData] = useState("");

  const getData = useCallback(async () => {
    try {
      let res = await getSubCategoryProducts(param.id);
      setSubCategoryProduct(res?.data?.data?.Product);
      setData(res?.data?.data?.Sub_category);
    } catch (error) {
      console.log(error);
    }
  }, [param.id]);

  useEffect(() => {
    getData();
  }, [getData, param.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={"px-2 min-h-[70vh]"}>
      <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between mt-4 lg:my-4">
        <p className="text-2xl font-semibold text-darkText capitalize my-2">
          {data?.name}
        </p>

        <div className="w-full flex item-center justify-end gap-5 md:w-auto mt-2"></div>
      </div>
      <div className="w-full ">
        {subCategoryProduct?.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-3">
            {subCategoryProduct?.map((item, i) => {
              return <ProductCard product={item} key={i} />;
            })}
          </div>
        ) : (
          <div className="mt-10">
            <NoDataAnime msg={"No Products Available"} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default SubCategories;

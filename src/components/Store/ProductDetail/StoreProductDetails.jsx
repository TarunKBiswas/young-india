/* eslint-disable react/prop-types */
import { useCallback, useEffect, memo } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Gallery from "./Gallery";
import Details from "./Details";
import { webState } from "../../../data/webStates";
import Container from "../UI/Wrappers/Container.Wrapper";
import ProductOtherDetails from "./ProductOtherDetails";
import ProductCard from "../UI/Cards/ProductCard";
import {
  ProductButtonSkeleton,
  ProductThumbnailSkeleton,
} from "../UI/Cards/Skeletons";
import { getProductDetail } from "../../../utils/Store/Products";
import ScrollAnimation from "../../../hooks/ScrollAnimation";

const StoreProductDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [productState, setProductState] = useState({
    productDetail: null,
    randomProducts: [],
    activeImage: null,
    error: null,
  });

  const [rating, setRating] = useState("");

  const MemoizedProductCard = memo(ProductCard);

  const SimilarProducts = memo(({ products }) => {
    if (!products?.length) return null;
    return (
      <div className="w-full flex flex-col items-center justify-center lg:justify-start mt-16">
        <span className="text-2xl font-semibold">Similar Products</span>
        <hr className="hidden lg:flex" />
        <div
          className="my-8 grid grid-cols-2 gap-3 lg:grid-cols-4 w-full px-2.5 lg:px-0"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {products?.map((item, index) => (
            <div
              key={item?.id}
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={index * 100}
              className="w-full"
            >
              <MemoizedProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    );
  });

  SimilarProducts.displayName = "SimilarProducts";

  const updateProductData = useCallback((data) => {
    setProductState((prev) => ({
      ...prev,
      productDetail: data?.product,
      randomProducts: data?.randomProducts,
      activeImage: data?.product?.thumbnail?.url,

      error: null,
    }));
    webState.singleProductInfo = data?.product;
  }, []);

  const fetchProductDetails = useCallback(async () => {
    setProductState((prev) => ({ ...prev }));
    try {
      const res = await getProductDetail(id);
      if (res?.status === 200) {
        updateProductData(res?.data?.data);
      }
    } catch (error) {
      setProductState((prev) => ({
        ...prev,
        error: error.message,
      }));
      console.error("Failed to fetch product details:", error);
    }
  }, [id, updateProductData]);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id, fetchProductDetails]);

  // useEffect(() => {
  //   if (!id) return;

  //   const navigateBack = () => navigate(-1);
  //   window.addEventListener("popstate", navigateBack);

  //   return () => window.removeEventListener("popstate", navigateBack);
  // }, [id, navigate]);

  const { productDetail, randomProducts, activeImage } = productState;

  ScrollAnimation();

  return (
    <Container className={"px-2"}>
      <div className="w-full flex flex-col mt-2 lg:mt-8 items-center justify-center gap-8">
        <div className={"w-full md:flex md:gap-3 lg:gap-5"}>
          {productDetail ? (
            <Gallery
              productDetail={productDetail}
              activeImage={activeImage}
              setActiveImage={(image) =>
                setProductState((prev) => ({ ...prev, activeImage: image }))
              }
            />
          ) : (
            <ProductThumbnailSkeleton />
          )}
          {productDetail ? (
            <Details rating={rating} productDetail={productDetail} />
          ) : (
            <ProductButtonSkeleton />
          )}
        </div>

        <ProductOtherDetails
          rating={rating}
          setRating={setRating}
          data={productDetail}
        />
        <SimilarProducts products={randomProducts} />
      </div>
    </Container>
  );
};

export default StoreProductDetails;

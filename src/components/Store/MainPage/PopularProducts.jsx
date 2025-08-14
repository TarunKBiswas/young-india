/* eslint-disable react/prop-types */
import { webState } from "../../../data/webStates";
import Container from "../UI/Wrappers/Container.Wrapper";
import { useSnapshot } from "valtio";
import { HeadingName, ViewButton } from "../UI/Buttons";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/Cards/ProductCard";
import { ProductSkeleton } from "../UI/Cards/Skeletons";

const PopularProducts = ({ products, title }) => {
  const snap = useSnapshot(webState);
  const dekstopProductSpan = snap.storeInfo?.product_list_span_desktop;
  const mobileProductSpan = snap.storeInfo?.product_list_span_mobile;

  const navigate = useNavigate();

  const handleShowMoreClick = () => {
    navigate("allProducts");
  };

  return (
    <Container>
      <div className="px-2.5 lg:px-0">
        <div className="w-full flex items-center justify-end mb-8">
          <HeadingName title={title} />
          <div className="hidden lg:flex w-full">
            <div className="w-full text-end ">
              <span
                onClick={handleShowMoreClick}
                className="border border-gray-200 px-3 py-2 rounded text-themecolor cursor-pointer hover:bg-stone-100 transition-all duration-300"
              >
                View all
              </span>
            </div>
          </div>
        </div>
        {products?.length > 0 ? (
          <div
            className={`w-full  grid grid-cols-${
              mobileProductSpan || 2
            } lg:grid-cols-${
              dekstopProductSpan || 4
            } gap-2.5 lg:gap-5 my-3 place-items-start`}
          >
            {products?.map((item, index) => {
              return (
                <div
                  key={item?.id}
                  data-aos="fade-up"
                  data-aos-duration="300"
                  data-aos-delay={index * 100}
                  data-aos-anchor-placement="center-bottom"
                  className="w-full"
                >
                  <ProductCard product={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <ProductSkeleton />
        )}

        <div className="lg:hidden">
          <ViewButton text={"View All"} action={handleShowMoreClick} />
        </div>
      </div>
    </Container>
  );
};

export default PopularProducts;

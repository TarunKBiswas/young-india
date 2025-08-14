/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailPublic } from "../utils/Store/Products";

const ProductPage = () => {
  const param = useParams();
  const [pId, setPId] = useState(param.id);
  const [activeImage, setActiveImage] = useState(null);
  const [productDetail, setProductDetail] = useState(null);

  const getProductDetails = async (pId) => {
    try {
      let res = await getProductDetailPublic(pId);
      if (res?.status === 200) {
        setProductDetail(res?.data?.data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pId !== null) {
      getProductDetails(pId);
    }
  }, [pId]);

  useEffect(() => {
    if (productDetail !== null) {
      setActiveImage(productDetail?.thumbnail?.url);
    }
  }, [productDetail]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:mx-24 mt-10">
        <div className="w-full lg:w-2/4 flex flex-col-reverse lg:flex-row lg:gap-8">
          <div
            className={`flex lg:flex-col justify-between  gap-2 overflow-y-auto scrollbar-hide `}
          >
            <>
              <img
                src={productDetail?.thumbnail?.url}
                alt="Image"
                width={"auto"}
                height={"auto"}
                className="w-24 h-28 object-cover shadow-sm cursor-pointer"
                onClick={() => setActiveImage(productDetail?.thumbnail?.url)}
              />
            </>

            {productDetail?.gallery?.map((img) => {
              return (
                <>
                  <img
                    src={img?.url}
                    width={"auto"}
                    height={"auto"}
                    alt="image"
                    className="w-24 h-28 object-cover  shadow-sm cursor-pointer"
                    onClick={() => setActiveImage(img?.url)}
                  />
                </>
              );
            })}
          </div>
          {activeImage !== null ? (
            <div className="flex flex-col gap-6 lg:w-3/4">
              <img
                src={activeImage}
                width={"auto"}
                height={"auto"}
                alt="image"
                className="w-full h-[400px] aspect-video object-cover shadow-md"
              />
            </div>
          ) : null}
        </div>

        {/* ABOUT */}
        <div className="flex flex-col gap-4 lg:w-2/4 mb-4 lg:mb-0">
          <div>
            <h1 className="text-3xl font-bold">{productDetail?.name}</h1>
          </div>
          <p className="text-gray-700">{productDetail?.description}</p>

          <div className="w-full flex items-center gap-4 ">
            <div>
              <span className="bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                {productDetail?.category?.name}
              </span>
              <span className="bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                {productDetail?.sub_category?.name}
              </span>
            </div>

            <div>
              {productDetail?.variants?.map((variant) => {
                return (
                  <span className="bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    {" "}
                    {variant?.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

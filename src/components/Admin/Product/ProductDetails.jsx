import { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { getSingleProductDetail } from "../../../utils/productsAPI.js";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
import Gallery from "./Gallery.jsx";

const ProductDetails = () => {
  const param = useParams();
  const [pId] = useState(param.id);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();

  const getProductDetail = async (pId) => {
    try {
      let res = await getSingleProductDetail(pId);

      if (res?.status === 200) {
        setProduct(res?.data?.data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pId !== null) {
      getProductDetail(pId);
    }
  }, [pId]);

  useEffect(() => {
    if (product !== null) {
      setActiveImage(product?.thumbnail?.url);
    }
  }, [product]);

  const showBulkPriceHandler = (data) => {
    state.variantDetails = data;
    state.bulkPricingDetailModal = true;
  };

  return (
    <>
      <div className="text-[#222222] my-2">
        <IoMdArrowRoundBack
          className="hover:scale-125 transition-all duration-500 cursor-pointer text-xl"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-2 lg:px-10 ">
        <div className="w-full lg:w-2/4 flex flex-col-reverse lg:flex-row lg:gap-8 ">
          <Gallery
            product={product?.gallery}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>

        {/* ABOUT */}
        <div className="flex flex-col gap-3 lg:w-2/4">
          <div className="w-full flex items-center gap-3 ">
            <h1 className="text-2xl font-bold">{product?.name} </h1>
          </div>
          <p className="text-gray-700">
            <span
              dangerouslySetInnerHTML={{
                __html: product?.description,
              }}
            />
          </p>

          <div>
            <span className="bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {product?.category?.name}
            </span>
          </div>

          <h6 className="text-2xl font-semibold">
            {"₹ " + product?.product?.variants[0]?.price}
          </h6>

          {product?.variants?.length > 0 && (
            <div className="w-full flex flex-col lg:flex-row gap-2 mt-6 max-h-[410px] overflow-y-scroll scrollbar-hide border p-2 rounded">
              <div className="relative overflow-x-auto w-full ">
                <h1 className="mb-2 font-semibold text-lg">Variant Info</h1>
                <XTable>
                  <THead>
                    <TR>
                      <TH>Name</TH>
                      <TH>Quantity</TH>
                      <TH>Price</TH>
                      <TH>Strike Price</TH>
                      <TH>Premium Price</TH>
                      <TH></TH>
                    </TR>
                  </THead>

                  <TBody>
                    {product?.variants?.map((data) => {
                      return (
                        <TR className="bg-white border-b w-full" key={data?.id}>
                          <TH
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {data?.name}
                          </TH>
                          <TD className="px-6 py-4">{data?.quantity}</TD>
                          <TD className="px-6 py-4">{data?.price}</TD>
                          <TD className="px-6 py-4">{data?.strikePrice}</TD>
                          <TD className="px-6 py-4">
                            {data?.premiumPrice || "Not Available"}
                          </TD>
                          {data?.bulk_pricings?.data?.length > 0 ? (
                            <TD className="px-6 py-4">
                              <button
                                className="submitButton"
                                onClick={() => showBulkPriceHandler(data)}
                              >
                                Bulk pricing
                              </button>
                            </TD>
                          ) : null}
                        </TR>
                      );
                    })}
                  </TBody>
                </XTable>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

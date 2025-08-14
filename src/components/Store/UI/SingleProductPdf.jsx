/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../public/assets/images/logo/logo.png";
import { pdfMakerAPI } from "../../../utils/const_API";
import { PdfCategoryBadge, PdfVariantBadge } from "../../Admin/UI/Badges";
import { IP } from "../../../utils/Store/Constant";
import { IoLogoWhatsapp } from "react-icons/io";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { getBrandDetail } from "../../../utils/Store/Homepage";

const SingleProductPdf = () => {
  const [pData, setPData] = useState(null);
  const [brandInfo, setBrandInfo] = useState(null);

  let params = useParams();
  const snap = useSnapshot(webState);
  const thumbnailPhoto = webState.brandInfo;

  useEffect(() => {
    var listOfIds = params.data.split("_");
    callAPI(listOfIds);
  }, [params]);

  const callAPI = async (products) => {
    try {
      let res = await pdfMakerAPI(products);
      if (res?.status === 200) {
        setPData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandDetails = async () => {
    try {
      let res = await getBrandDetail();
      setBrandInfo(res?.data?.data?.attributes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrandDetails();
  }, []);

  const ProductListing = () => {
    return (
      <>
        {pData?.map((item) => {
          return (
            <ProductCard product={item} key={item?.id} phone={params?.phone} />
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="h-screen bg-themecolor text-white flex justify-center items-center flex-col gap-2">
        <img
          src={brandInfo?.logo?.data?.attributes?.url}
          alt="logo"
          width={"auto"}
          height={"auto"}
          className="w-40 md:w-56"
        />
        <h1 className="text-3xl md:text-6xl font-bold">{brandInfo?.name}</h1>
      </div>

      <div className="bg-gray-100 flex flex-col items-start">
        {pData !== null ? <ProductListing /> : null}
      </div>
    </>
  );
};

const ProductCard = (props) => {
  let product = props?.product;
  let thumbnail = product?.thumbnail?.url;
  return (
    <div className="w-full flex flex-col px-2 md-px-0 bg-white rounded border items-start gap-3 h-screen overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[788px] mx-auto flex flex-col lg:gap-8 lg:mt-4  ">
        <div className={`max-h-[1200px] flex flex-col gap-2  lg:mt-0`}>
          <div className="flex items-start justify-start w-full ">
            <img
              src={thumbnail}
              id=""
              className="object-contain w-full h-[80vh] "
              alt="thumbnail"
              width={"auto"}
              height={"auto"}
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <img
              src={thumbnail}
              width={"auto"}
              height={"auto"}
              alt="image"
              className="w-24 max-h-28 object-fill rounded-sm shadow-sm cursor-pointer"
            />
            {product?.gallery?.map((img, i) => {
              return (
                <img
                  src={img?.url}
                  width={"auto"}
                  height={"auto"}
                  alt="image"
                  className="w-24 max-h-28 object-fill rounded-sm shadow-sm cursor-pointer"
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start w-full gap-1 md:px-6">
        <span className="text-3xl font-bold">{product?.name}</span>
        <span className="text-themecolor font-medium text-lg">
          ₹ {props.product.product_variants[0].price}
        </span>
        <PdfVariantBadge variant={product?.product_variants} />
        <a
          className="btn btn-primary w-full text-xl"
          href={`https://wa.me/${props.phone}`}
        >
          {/* <IoLogoWhatsapp className="text-green-900 w-6 h-6 "/> */}
          Buy Now
        </a>
        <span className="text-clip">{product?.desc}</span>
      </div>
    </div>
  );
};

export default SingleProductPdf;

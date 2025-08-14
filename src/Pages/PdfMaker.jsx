/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { pdfMakerAPI } from "../utils/const_API";
import {
  PdfCategoryBadge,
  PdfVariantBadge,
} from "../components/Admin/UI/Badges";
import { useSnapshot } from "valtio";
import { webState } from "../data/webStates";
import { getBrandDetail } from "../utils/Store/Homepage";

// import { IP } from "../utils/Store/Constant";

const PdfMaker = () => {
  const [pData, setPData] = useState(null);
  let params = useParams();
  const snap = useSnapshot(webState);

  const getBrandDetails = async () => {
    try {
      let res = await getBrandDetail();
      webState.brandInfo = res?.data?.data?.attributes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrandDetails();
  }, []);

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
      <div
        className={`h-screen bg-green-700 text-white flex justify-center items-center flex-col gap-3`}
      >
        <img
          src={snap.brandInfo?.logo?.data?.attributes?.url}
          alt="logo"
          className="w-56"
          width={"auto"}
          height={"auto"}
        />
        <h1 className="text-2xl font-semibold tracking-widest">
          {snap?.brandInfo?.tagline}
        </h1>
      </div>

      <div className="bg-gray-100 flex flex-col items-start ">
        {pData !== null ? <ProductListing /> : null}
      </div>
    </>
  );
};

const ProductCard = (props) => {
  let product = props?.product;
  let thumbnail = product?.thumbnail?.url;
  return (
    <div className="w-full flex flex-col  bg-white rounded border items-start gap-3 h-screen overflow-x-hidden overflow-y-auto">
      <div className="flex items-start justify-start w-full ">
        <img
          src={thumbnail}
          id=""
          className="object-contain w-full h-[90vh] "
          alt="thumbnail"
          width={"auto"}
          height={"auto"}
        />
      </div>
      <div className="w-full flex items-start justify-between px-4">
        <div className="flex flex-col items-start justify-start w-full gap-1 ">
          <span className="text-3xl font-bold">{product?.name}</span>
          <PdfCategoryBadge
            category={product?.category?.name}
            subCat={product?.sub_category?.name}
          />

          <PdfVariantBadge variant={product?.product_variants} />
          <a
            className="btn btn-primary w-full text-xl"
            href={`https://wa.me/${props.phone}`}
          >
            Buy Now{" "}
          </a>
          <span className="text-clip">{product?.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default PdfMaker;

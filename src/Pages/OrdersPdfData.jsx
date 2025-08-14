/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { exportOrdersPdf } from "../utils/const_API";
import {
  PdfCategoryBadge,
  PdfVariantBadge,
} from "../components/Admin/UI/Badges";

const OrdersPdfData = () => {
  const [orderData, setOrderData] = useState(null);
  let params = useParams();

  useEffect(() => {
    var listOfIds = params.data.split("_");
    callAPI(listOfIds);
  }, [params]);

  const callAPI = async (products) => {
    try {
      let res = await exportOrdersPdf(products);

      if (res?.status === 200) {
        setOrderData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ProductListing = () => {
    return (
      <>
        {orderData?.map((item) => {
          return <OrderCard product={item} key={item?.id} />;
        })}
      </>
    );
  };

  return (
    <>
      <div className="h-screen bg-green-700 text-white flex justify-center items-center flex-col gap-2">
        {/* <img src={logo} alt="logo" className="w-56" /> */}
        <h1 className="text-6xl font-bold">Company Name</h1>
      </div>

      <div className="bg-gray-100 flex flex-col items-start">
        {orderData !== null ? <ProductListing /> : null}
      </div>
    </>
  );
};

const OrderCard = (props) => {
  let product = props?.product;
  let thumbnail = product?.thumbnail?.url;
  return (
    <div className="w-full flex flex-col  bg-white rounded border items-start gap-3 h-screen overflow-x-hidden overflow-y-auto">
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
      <div className="w-full flex items-start justify-between px-4">
        <div className="flex flex-col items-start justify-start w-full gap-1 ">
          <span className="text-3xl font-bold">{product?.name}</span>
          <PdfCategoryBadge
            category={product?.category?.name}
            subCat={product?.sub_category?.name}
          />
          <PdfVariantBadge variant={product?.product_variants} />

          <span className="text-clip">{product?.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersPdfData;

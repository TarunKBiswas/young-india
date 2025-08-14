/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductDetail } from "../../../utils/productsAPI.js";
import EditProductForm from "./EditProductForm.jsx";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const EditProduct = () => {
  const param = useParams();
  const snap = useSnapshot(state);

  const [pId] = useState(param.id);
  const [productInfo, setProductInfo] = useState(null);
  const [cod_enabled, setIsCodAllowed] = useState(null);
  const [is_active, setIsActive] = useState(null);
  const [enquiry_enabled, setEnquiry] = useState(null);
  const [show_price, setShowPrice] = useState(null);
  const [product_return, setProductReturn] = useState(null);

  const getProductDetail = async () => {
    try {
      let res = await getSingleProductDetail(pId);
      if (res?.status === 200) {
        setProductInfo(res?.data?.data?.product);
        setIsCodAllowed(res?.data?.data?.product?.cod_enabled);
        setIsActive(res?.data?.data?.product?.is_active);
        setEnquiry(res?.data?.data?.product?.enquiry_enabled);
        setShowPrice(res?.data?.data?.product?.show_price);
        setProductReturn(res?.data?.data?.product?.product_return);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
    state.refreshEditProductComponent = false;
  }, [snap.refreshEditProductComponent]);

  return (
    <OutletWrapper>
      {productInfo && cod_enabled !== null ? (
        <EditProductForm
          productInfo={productInfo}
          cod_enabled={cod_enabled}
          setIsCodAllowed={setIsCodAllowed}
          is_active={is_active}
          setIsActive={setIsActive}
          enquiry_enabled={enquiry_enabled}
          setEnquiry={setEnquiry}
          show_price={show_price}
          setShowPrice={setShowPrice}
          product_return={product_return}
          setProductReturn={setProductReturn}
        />
      ) : null}
    </OutletWrapper>
  );
};

export default EditProduct;

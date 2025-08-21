/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from "react";
import { useState } from "react";
import { getOrderDetail } from "../../../utils/Orders.js";
import { useNavigate, useParams } from "react-router-dom";
import { state } from "../../../data/state.js";
import moment from "moment";
import { useSnapshot } from "valtio";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlinePrinter } from "react-icons/ai";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DeliverySlip from "./DeliverySlip.jsx";
import ActionPanel from "./ActionPanel.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const param = useParams();
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const pdfRef = useRef();

  const getDetail = async (param) => {
    try {
      let res = await getOrderDetail(param);
      // console.log(res?.data);
      setOrderDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail(param.id);
    state.refreshOrdersDetails = false;
  }, [snap.refreshOrdersDetails]);

  let address = orderDetails?.order?.address;
  const userDetails = orderDetails?.order;

  const downloadPDF = () => {
    const capture = pdfRef.current;
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4", true);
      const pfdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pfdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pfdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      doc.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      doc.save("receipt.pdf");
    });
  };
  console.log(orderDetails);
  return (
    <>
      <OutletWrapper>
        <div className="w-full pb-3 flex items-center justify-between">
          <IoMdArrowRoundBack
            className="hover:scale-125 transition-all duration-500 cursor-pointer text-xl"
            onClick={() => navigate(-1)}
          />
          <div className="w-full flex items-end gap-4">
            <ActionPanel orderData={orderDetails} />
            <AiOutlinePrinter
              className="hover:scale-125 transition-all duration-500 cursor-pointer text-2xl fill-themecolor"
              onClick={downloadPDF}
            />
          </div>
        </div>

        <div className="w-full ">
          <div className="w-full flex items-center justify-between bg-[#222222] py-2 px-3 text-white rounded">
            <div className="flex gap-4 items-center">
              <span className="font-medium ">
                Order ID #{orderDetails?.order?.slug}
              </span>
              <span className=" font-medium text-xs px-3 py-1 border bg-[#222222]/70 rounded-full text-white">
                {orderDetails?.status}
              </span>
            </div>
            <span className="font-thin text-xs">
              {moment(orderDetails?.createdAt)?.format("DD MMM YYYY hh:mm")}
            </span>
          </div>

          <div className="mt-3 w-full flex flex-col gap-3  ">
            <div className="w-full flex items-start bg-white shadow-sm rounded-lg overflow-hidden border">
              <div className="h-full" key={orderDetails?.id}>
                <img
                  className="h-full object-cover rounded-l-lg max-h-40"
                  src={orderDetails?.variant?.product?.thumbnail?.url}
                  alt="varient Image"
                  width={"auto"}
                  height={"auto"}
                />
              </div>

              <div className="w-full px-4  flex flex-col items-start  ">
                <div className="flex items-start justify-between w-full my-1">
                  <div className="max-w-[80%] mt-2">
                    <div className="text-gray-700 text-xs lg:text-base flex flex-col gap-3  ">
                      <span className="font-medium ">
                        {"Name - "}
                        {orderDetails?.variant?.product?.name}
                      </span>
                      <span className="text-gray-700 text-xs lg:text-base">
                        <span className="font-medium">
                          {"Quantity - "}
                          {orderDetails?.quantity}
                          {" Pcs"}
                        </span>
                      </span>
                      {orderDetails?.selectedWeightId == null ? (
                        <span className="font-medium capitalize">
                          {"Variant - "}
                          {orderDetails?.variant?.name}
                        </span>
                      ) : (
                        <span className="flex gap-2">
                          <span className="font-medium capitalize">
                            {"Flavour - "}
                            {orderDetails?.variant?.primary_attribute?.value}
                          </span>
                          <span className="font-medium capitalize">
                            {"Weight - "}
                            {orderDetails?.selectedWeight?.weight}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full max-w-[20%] flex flex-col items-end justify-between">
                    <div>
                      <span className=" font-medium text-xs px-3 py-1 border  rounded-full">
                        {orderDetails?.order?.payment_mode}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700 text-xs lg:text-base">
                        <span className="font-medium">
                          {"Price - "}
                          {/* {"₹ " + orderDetails?.price} */}
                         ₹ { orderDetails?.variant?.price || orderDetails?.selectedWeight?.price}
                        </span>
                      </p>
                      <p className="text-gray-700 text-xs lg:text-base">
                        <span className="font-medium">
                          {"Total - "}
                          {/* {"₹ " + orderDetails?.price * orderDetails?.quantity} */}
                          {/* {"₹ " + orderDetails?.price} */}
                           ₹ { orderDetails?.price || orderDetails?.selectedWeight?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {orderDetails?.sellingPrice ? (
                  <h1 className="text-gray-700 font-bold text-sm my-1">
                    {"Selling Price - " + "₹ "}
                    {orderDetails?.selling_price}
                  </h1>
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-2 mt-4">
            <div className="w-full ">
              <div className="order-success">
                <div className="row g-4">
                  <span className="font-bold text-base">Billing address</span>
                  <div className="order-details mt-2 flex flex-col gap-2">
                    <span className="font-medium">{address?.name}</span>
                    <span>{address?.addressLine1}</span>
                    <span>
                      {address?.area} {address?.city}, {address?.state}
                    </span>
                    <span>
                      Contact - {address?.phone}, {address?.pincode},
                      {address?.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* user */}
            <div className="w-full flex items-start justify-end">
              <div className="order-success">
                <div className="row g-4">
                  <span className="text-base font-bold">Order By</span>
                  <ul className="order-details mt-2 font-medium">
                    <li>Name: {userDetails?.store_user?.name}</li>
                    <li>Email: {userDetails?.store_user?.email}</li>
                    <li>Phone: {userDetails?.store_user?.phone}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OutletWrapper>

      <div className="mt-10 opacity-0 ">
        <DeliverySlip pdfRef={pdfRef} details={orderDetails} />
      </div>
    </>
  );
};

export default OrderDetails;

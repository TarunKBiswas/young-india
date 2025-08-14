/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from "react";
import OrderProductCard from "./OrderProductCard";
import { webState } from "../../../../data/webStates";
import { getStoreUserOrders, cancelOrder } from "../../../../utils/Store/Setting";
import NoDataAnime from "../../../Admin/UI/NoDataAnime";
import { useSnapshot } from "valtio";
import SingleOrderInfo from "./SingleOrderInfo";
import OrdersFilter from "./OrdersFilter";
import SkeletonLoader from "../../UI/SkeletonLoader";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SuccessAlert, FailureAlert } from "../../../Toast";

const WebOrders = () => {
  const [orders, setOrders] = useState([]);
  const [singleInfo, setSingleInfo] = useState(false);
  const [status, setStatus] = useState();
  const [mode, setMode] = useState();
  const [filterApplied, setFilterApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const orderListRef = useRef(null);
  const snap = useSnapshot(webState);

  const getOrders = async (status, mode, page, size) => {
    setIsLoading(true);
    try {
      let res = await getStoreUserOrders(status, mode, page, size);

      if (res?.status === 200) {
        setOrders(res?.data?.data);
        setFilterApplied(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrders(status, mode, currentPage, pageSize);
    webState.refreshOrderList = false;
  }, [snap.refreshOrderList, filterApplied, currentPage, pageSize]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterHandler = async () => {
    setFilterApplied(true);
  };

  const resetHandler = () => {
    setStatus(undefined);
    setMode(undefined);
    setCurrentPage(1);
    getOrders();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    orderListRef.current.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    orderListRef.current.scrollTo(0, 0);
  };

  const handleCancelOrder = async (id) => {
    const res = await cancelOrder(id);
    if (res?.status === 200) {
      SuccessAlert(res?.data?.message || "Order cancelled successfully!");
      getOrders(); // Refresh orders
    } else {
      FailureAlert("Failed to cancel order.");
    }
  };

  return (
    <div className="px-5 py-4 lg:p-0 bg-white w-full flex flex-col items-center justify-center max-w-[1440px] mx-auto">
      <div className={`w-full ${singleInfo ? "hidden" : "grid gap-1.5"}`}>
        <div className="w-full flex items-start justify-between gap-2">
          <span className="w-full text-lg lg:text-2xl font-medium text-darkText">
            Your Orders
          </span>

          <div className="w-full flex-1 items-center justify-end gap-3 hidden lg:flex">
            <OrdersFilter
              setStatus={setStatus}
              setMode={setMode}
              filterHandler={filterHandler}
              resetHandler={resetHandler}
            />
          </div>
        </div>

        <div
          ref={orderListRef}
          className={`w-full h-full lg:max-h-[calc(90vh_-_200px)] ${
            orders?.length > 5 && "lg:overflow-y-scroll thinScrollbar"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-full h-full grid grid-cols-1 gap-4 lg:grid-cols-2">
                <SkeletonLoader count={4} />
                <SkeletonLoader count={4} />
              </div>
            </>
          ) : orders?.length > 0 ? (
            <div className="w-full h-full grid grid-cols-1 gap-4 lg:grid-cols-2">
              <OrderProductCard
                orders={orders}
                singleInfo={singleInfo}
                setSingleInfo={setSingleInfo}
                handleCancelOrder={handleCancelOrder}
              />
            </div>
          ) : (
            <div className="w-full h-full grid grid-cols-1 gap-4">
              <div
                className={`flex w-full  items-center justify-center mt-20 lg:mt-0`}
              >
                <NoDataAnime mg={"No Data found"} />
              </div>
            </div>
          )}
        </div>

        {orders?.length > 6 && (
          <div className="flex max-w-max gap-10 justify-between mx-auto mt-4">
            <button
              className="cursor-pointer"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {/* Previous */}
              <ArrowLeft />
            </button>
            <span>Page {currentPage}</span>
            <button
              className="cursor-pointer"
              onClick={handleNextPage}
              disabled={orders.length < pageSize}
            >
              <ArrowRight />
              {/* Next */}
            </button>
          </div>
        )}
      </div>

      {singleInfo ? (
        <SingleOrderInfo
          singleInfo={singleInfo}
          setSingleInfo={setSingleInfo}
        />
      ) : null}
    </div>
  );
};

export default WebOrders;

/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useSnapshot } from "valtio";
import OrderStats from "./OrderStats.jsx";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { state } from "../../../data/state.js";
import NoDataAnime from "../UI/NoDataAnime.jsx";
import CustomerInfoCard from "../UI/CustomerInfoCard.jsx";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
import {
  bulkAccOrder,
  bulkRejOrder,
  getOrdersByStatus,
} from "../../../utils/Orders.js";
import PaginationContainer from "../UI/PaginationContainer.jsx";
import ActionPanel from "./ActionPanel.jsx";
import ProductInfoCard from "../Product/ProductInfoCard.jsx";
import { PaymentStatus } from "../../Store/UI/Badges.jsx";
import { SuccessAlert } from "../../Toast.jsx";
import DeleteModalLayout from "../Modals/DeleteModalLayout.jsx";

const OrdersListing = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [accepetAllOrders, setAccepetAllOrders] = useState(false);
  const [rejectAllOrders, setRejectAllOrders] = useState(false);

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders?.length === orders?.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
  };

  const navigate = useNavigate();
  const snap = useSnapshot(state);
  const orders = snap.orderProductDetails;
  const pagination = snap.ordersPagination;

  const getOrderList = useCallback(async (tag, page) => {
    try {
      const res = await getOrdersByStatus(tag, page, pagination.pageSize);
      // console.log(res);
      if (res?.status === 200) {
        state.orderProductDetails = res?.data?.data;
        state.ordersPagination = {
          ...pagination,
          page: res?.data?.meta?.pagination?.page,
          pageSize: res?.data?.meta?.pagination?.pageSize,
          pageCount: res?.data?.meta?.pagination?.pageCount,
          total: res?.data?.meta?.pagination?.total,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getOrderList(snap.selectedTag, pagination.page);
    state.refreshOrdersList = false;
  }, [snap.refreshOrdersList, snap.selectedTag, pagination.page]);

  const orderDetailsHandler = (id) => {
    navigate(`${id}`);
  };

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.ordersPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.ordersPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const acceptAllOrdersHandler = async () => {
    try {
      let res = await bulkAccOrder(selectedOrders);

      if (res?.status === 200) {
        SuccessAlert("All Orders Accepted");
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
        state.refreshOrdersDetails = true;
        closeAccepeModal();
        setSelectedOrders([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectAllOrdersHandler = async () => {
    try {
      let res = await bulkRejOrder(selectedOrders);

      if (res?.status === 200) {
        SuccessAlert("All Orders Rejected");
        state.refreshOrderStats = true;
        state.refreshOrdersList = true;
        state.refreshOrdersDetails = true;
        closeRejectModal();
        setSelectedOrders([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeAccepeModal = () => {
    setAccepetAllOrders(false);
  };

  const closeRejectModal = () => {
    setRejectAllOrders(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between pb-4 pt-2 ">
        <span className="text-2xl font-semibold">Orders</span>
      </div>

      <OrderStats />

      {orders?.length > 0 ? (
        <XTable>
          <THead>
            <TR>
              {orders?.some((order) => order.status === "NEW") && (
                <TH>
                  <input
                    type="checkbox"
                    className="rounded border-gray-400 ring-0 active:ring-0"
                    checked={selectedOrders?.length === orders?.length}
                    onChange={handleSelectAll}
                  />
                </TH>
              )}
              <TH>Product</TH>
              <TH>Name</TH>
              <TH>Quantity</TH>
              <TH>Customer</TH>
              <TH>Payment Mode</TH>
              <TH>Date/Time</TH>
              <TH>
                {selectedOrders?.length > 1 && (
                  <div className="w-full flex items-center justify-end gap-2">
                    <button
                      className="py-2.5 px-3.5 text-red-500 border text-xs capitalize rounded hover:bg-red-100 transition duration-150 font-normal"
                      onClick={() => setRejectAllOrders(true)}
                    >
                      Reject All
                    </button>
                    <button
                      className="py-2.5 px-3.5 bg-[#222222] text-white text-xs capitalize rounded hover:bg-[#222222] transition duration-150 font-normal"
                      onClick={() => setAccepetAllOrders(true)}
                    >
                      Accept All
                    </button>
                  </div>
                )}
              </TH>
            </TR>
          </THead>
          <TBody>
            {orders?.map((order) => {
              return (
                <TR key={order?.id}>
                  {order?.status === "NEW" && (
                    <TD>
                      <input
                        type="checkbox"
                        className="rounded border-gray-400 ring-0 active:ring-0"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </TD>
                  )}
                  <TD>
                    <ProductInfoCard
                      prod={order}
                      orderDetailsHandler={orderDetailsHandler}
                    />
                  </TD>
                  <TD>{order?.variant?.product?.name?.slice(0, 30)}</TD>
                  <TD>{order?.quantity}</TD>
                  <TD>
                    <CustomerInfoCard data={order?.order} />
                  </TD>
                  <TD>
                    <PaymentStatus status={order?.order?.payment_mode} />
                  </TD>
                  <TD>
                    {moment(order?.createdAt).format("DD MMM YYYY hh:mm")}
                  </TD>
                  <TD>
                    {order !== null ? <ActionPanel orderData={order} /> : null}
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </XTable>
      ) : (
        <NoDataAnime msg={"No Orders Found"} />
      )}

      {orders?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
        />
      )}

      {accepetAllOrders && (
        <DeleteModalLayout
          type={"accept"}
          closeModalHandler={closeAccepeModal}
          action={acceptAllOrdersHandler}
          confirmMsg={"Accepet All Orders"}
          btnText={"Accept"}
          msg={"Are you sure you want to Accept All Order?"}
        />
      )}

      {rejectAllOrders && (
        <DeleteModalLayout
          closeModalHandler={closeRejectModal}
          action={rejectAllOrdersHandler}
          confirmMsg={"Reject All Orders"}
          btnText={"Reject"}
          msg={"Are you sure you want to Reject All Orders ?"}
        />
      )}
    </>
  );
};

export default OrdersListing;

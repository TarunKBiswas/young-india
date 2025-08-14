/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import { getOrderStats } from "../../../utils/Orders.js";
import { OrderProgessCard } from "../../../data/OrderStatsData.js";
import OrdersListing from "./OrdersListing.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const Orders = () => {
  const snap = useSnapshot(state);

  const getAllOrderData = useCallback(async () => {
    try {
      const res = await getOrderStats();
      if (res?.status === 200) {
        let orderStats = OrderProgessCard(res?.data?.data);
        state.orderStatsInfo = orderStats;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllOrderData();
    state.refreshOrderStats = false;
    state.refreshOrdersList = false;
  }, [snap.refreshOrderStats, snap.refreshOrdersList]);

  return (
    <OutletWrapper>
      <OrdersListing />
    </OutletWrapper>
  );
};

export default Orders;

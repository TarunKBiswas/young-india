/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
// import { state } from "../../../data/state.js";
import { getActivity } from "../../../utils/Activity.js";
import moment from "moment";
// import SubscriberAvatar from "../UI/UserInfoCard.jsx";
import PaginationContainer from "../UI/PaginationContainer.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const eventMap = new Map([
  ["ADMIN_LOG_IN", "Admin Login"],
  ["USER_LOG_IN", "User Login"],
  ["RESELLER_LOG_IN", "Login"],
  ["ORDER_PLACED", "Order Placed"],
  ["ORDER_ACCEPTED", "Order Accepted"],
  ["ORDER_DECLINED", "Order Declined"],
  ["ORDER_SHIPPED", "Order Shipped"],
  ["ORDER_DELIVERED", "Order Delivered"],
  ["SUBSCRIPTION_ADDED", "Subscription Added"],
  ["NEW_CAMPAIGN_ADDED", "Campaign Started"],
  ["NEW_PRODUCT_ADDED", "Product Added"],
  ["NEW_COLLECTION_ADDED", " Collection Added"],
  ["NEW_TUTORIAL_ADDED", "Tutorial Added"],
  ["NEW_LEAD_ADDED", "Lead Added"],
  ["NEW_GROUP_ADDED", "Group Added"],
  ["LEAD_COMPLETED", "Lead Completed "],
  ["RESELLER_WITHDRAW", "Withdrawal"],
  ["RESELLER_PAYOUT", "Payout"],
  ["WALLET_DEBIT", "Wallet Debited"],
  ["WALLET_CREDIT", "Wallet Credit"],
]);

const ActivityLogs = () => {
  const [activityLog, setActivityLog] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  });

  const getData = async (page) => {
    try {
      let res = await getActivity(page, pagination?.pageSize);

      if (res?.status === 200) {
        setActivityLog(res?.data?.data);
        setPagination({
          ...pagination,
          page: res?.data?.meta?.pagination?.page,
          pageSize: res?.data?.meta?.pagination?.pageSize,
          pageCount: res?.data?.meta?.pagination?.pageCount,
          total: res?.data?.meta?.pagination?.total,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(pagination?.page);
  }, [pagination.page, pagination.pageSize]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      setPagination({
        ...pagination,
        page: pagination?.page - 1,
      });
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      setPagination({
        ...pagination,
        page: pagination?.page + 1,
      });
    }
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2">
        <span className="text-black text-2xl font-semibold">Activity</span>
      </div>

      {activityLog?.length > 0 && (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Description</TH>
              <TH>Event</TH>
              <TH>Date/Time</TH>
            </TR>
          </THead>
          <TBody>
            {activityLog?.map((act) => (
              <TR key={act?.id}>
                <TD>{act?.id}</TD>
                <TD>{act?.description}</TD>
                <TD>
                  <span className="text-xs py-1 px-2 bg-[#222222]/80 text-white rounded-full font-mono">
                    {eventMap?.get(act?.event)}
                  </span>
                </TD>
                <TD>
                  {moment(act?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      )}
      {activityLog?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
        />
      )}
    </OutletWrapper>
  );
};

export default ActivityLogs;

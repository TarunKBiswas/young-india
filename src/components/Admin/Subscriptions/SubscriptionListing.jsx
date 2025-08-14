/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { getSubscribersList } from "../../../utils/Subscription.js";
import { useSnapshot } from "valtio";
import CreateButton from "../UI/Buttons/CreateButton.jsx";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
import SubscriberAvatar from "../UI/UserInfoCard.jsx";
import NoDataAnime from "../UI/NoDataAnime.jsx";
import PaginationContainer from "../UI/PaginationContainer.jsx";
import moment from "moment";
import StatusBadge from "./StatusBadge.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const SubscriptionListing = () => {
  const snap = useSnapshot(state);
  const [subsList, setSubsList] = useState([]);
  const pagination = snap.subscribersPagination;

  const getList = async (page) => {
    try {
      let res = await getSubscribersList(page, pagination.pageSize);
      if (res?.status === 200) {
        setSubsList(res?.data?.data);
        state.subscribersPagination = {
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
  };
  useEffect(() => {
    getList(pagination.page);
    state.refreshSubscriptionList = false;
  }, [snap.refreshSubscriptionList, pagination.page]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.subscribersPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.subscribersPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const addSubsHandler = () => {
    state.showAddSubscriptionModal = true;
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2">
        <span className="text-black text-2xl font-semibold">Subscriptions</span>
        <CreateButton title={"Create New"} action={addSubsHandler} />
      </div>

      {subsList.length > 0 ? (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>User</TH>
              <TH>Plan</TH>
              <TH>Status</TH>
              <TH>From</TH>
              <TH>To</TH>
            </TR>
          </THead>
          <TBody>
            {subsList?.map((subs) => (
              <TR key={subs?.id}>
                <TD>{subs?.id}</TD>
                <TD>
                  <SubscriberAvatar user={subs?.store_user} />
                </TD>
                <TD>{subs?.plan?.name}</TD>
                <TD>
                  <StatusBadge status={subs?.status} />
                </TD>
                <TD>{moment(subs?.valid_from).format("DD MMM YYYY ")}</TD>
                <TD>{moment(subs?.valid_to).format("DD MMM YYYY")}</TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      ) : (
        <NoDataAnime msg={"No Subscription Found"} />
      )}

      {subsList.length > 0 ? (
        <PaginationContainer
          pagination={pagination}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
        />
      ) : null}
    </OutletWrapper>
  );
};

export default SubscriptionListing;

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import CreateButton from "../UI/Buttons/CreateButton.jsx";
import { state } from "../../../data/state.js";
import { getWallet } from "../../../utils/wallet.js";
import { useSnapshot } from "valtio";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
// import Actions from "../UI/Actions.jsx";
import SubscriberAvatar from "../UI/UserInfoCard.jsx";
import NoDataAnime from "../UI/NoDataAnime.jsx";
import PaginationContainer from "../UI/PaginationContainer.jsx";
import moment from "moment";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const Wallet = () => {
  const [walletList, setWalletList] = useState([]);
  const snap = useSnapshot(state);
  const pagination = snap.walletPagination;

  const getData = async (currentpage) => {
    try {
      let res = await getWallet(currentpage, pagination.dataPerPage);
      if (res?.status === 200) {
        setWalletList(res?.data?.data);
        state.walletPagination = {
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
    getData(pagination.page);
    state.refreshWalletList = false;
  }, [snap.refreshWalletList, pagination.page]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.walletPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.walletPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const addWalletHandler = async () => {
    state.showAddWalletModal = true;
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2">
        <span className="text-black text-2xl font-semibold">Wallet</span>
        <CreateButton action={addWalletHandler} title={"Add New"} />
      </div>

      {walletList?.length > 0 ? (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>User</TH>
              <TH>Amount</TH>
              <TH>Type</TH>
              <TH>Remark</TH>
              <TH>Date</TH>
            </TR>
          </THead>
          <TBody>
            {walletList?.map((wallet) => (
              <TR key={wallet?.id}>
                <TD>{wallet?.id}</TD>
                <TD>
                  <SubscriberAvatar user={wallet?.store_user} />
                </TD>
                <TD>
                  {"₹ "} {wallet?.amount}
                </TD>
                <TD>{wallet?.transaction_type}</TD>
                <TD>{wallet?.remark}</TD>
                <TD>{moment(wallet?.createdAt).format("DD MMM YYYY")}</TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      ) : (
        <NoDataAnime msg={"No Data Avaiable"} />
      )}

      {walletList?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
        />
      )}
    </OutletWrapper>
  );
};

export default Wallet;

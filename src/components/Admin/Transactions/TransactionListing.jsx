/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { getTransacationList } from "../../../utils/Transactions.js";
import { BiRupee } from "react-icons/bi";
import moment from "moment";
import NoDataAnime from "../UI/NoDataAnime.jsx";
import PaginationContainer from "../UI/PaginationContainer.jsx";
import { useSnapshot } from "valtio";
import TransactionFilters from "./Filters.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";
import { FaArrowDown, FaArrowUp, FaCoins } from "react-icons/fa";
import UserAvatarInfo from "../UI/UserAvatarInfo.jsx";

const TransactionListing = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [mode, setMode] = useState("");
  const [type, setType] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const snap = useSnapshot(state);
  const pagination = snap.transactionPagination;

  const getTransactionData = async (page) => {
    try {
      let res = await getTransacationList(
        page,
        pagination.pageSize,
        purpose,
        type,
        mode
      );
      if (res?.status === 200) {
        setTransactionList(res?.data?.data);
        state.transactionPagination = {
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
    getTransactionData(pagination.page);
  }, [pagination.page, filterApplied]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.transactionPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.transactionPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const filterTrxHandler = () => {
    setFilterApplied(true);
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2 ">
        <span className="text-black text-2xl font-semibold">
          All Transactions
        </span>

        <div className="flex items-center justify-end">
          <TransactionFilters
            setPurpose={setPurpose}
            setMode={setMode}
            setType={setType}
            filterTrxHandler={filterTrxHandler}
          />
        </div>
      </div>

      {transactionList?.length > 0 ? (
        <div className="w-full flex flex-col">
          {transactionList?.map((trx) => (
            <div
              className="bg-gray-100 grid grid-cols-4 p-2 mt-2 cursor-pointer w-full"
              key={trx?.id}
            >
              <div>
                <UserAvatarInfo user={trx.user} />
              </div>
              <div className="flex flex-col ">
                <p className="font-semibold uppercase text-[11px]">
                  {"#"}
                  {trx?.txn_id}
                </p>
                <p className="flex items-center">
                  {trx?.mode === "MONEY" ? (
                    <span>
                      <BiRupee className="text-[#222222] text-lg font-semibold" />
                    </span>
                  ) : (
                    <span>
                      <img
                        src={FaCoins}
                        className="pr-1 h-4 w-full"
                        width={"auto"}
                        height={"auto"}
                        alt="image"
                      />
                    </span>
                  )}
                  <span className="font-semibold text-base">{trx?.amount}</span>
                </p>
                <p className="text-[11px]">
                  {moment(trx?.createdAt).format("DD MMM YYYY hh:mm")}
                </p>
              </div>
              <div className="w-full">{trx?.remark}</div>
              <div className="flex justify-center items-center gap-4">
                <div className=" text-center">
                  {trx?.txn_type === "CREDIT" ? (
                    <FaArrowDown className="text-red-600" />
                  ) : (
                    <FaArrowUp className="text-green-600" />
                  )}
                </div>
                <div className=" text-end">
                  <span className="bg-[#222222] text-[10px] capitalize px-2 py-1 rounded-full text-green-100 font-semibold">
                    {trx?.purpose}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataAnime msg={"No Transaction Found"} />
      )}

      {transactionList?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
        />
      )}
    </OutletWrapper>
  );
};

export default TransactionListing;

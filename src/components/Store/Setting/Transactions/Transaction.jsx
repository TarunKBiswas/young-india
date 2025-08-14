/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import TransactionCard from "./TransactionCard";
import { useEffect } from "react";
// import Pagination from "../../UI/Pagination";
import { getTransacations } from "../../../../utils/Store/Transaction";
import NoDataAnime from "../../../Admin/UI/NoDataAnime";

const WebTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  const getData = async () => {
    try {
      let res = await getTransacations();

      if (res?.status === 200) {
        setTransactions(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-5 py-4 lg:p-0 bg-white w-full flex flex-col items-center justify-center max-w-[1440px] mx-auto">
      <div className="grid gap-1.5 w-full h-full">
        <span className="w-full text-lg lg:text-2xl font-medium text-darkText">Transactions</span>

        <div className="w-full h-full lg:overflow-y-scroll thinScrollbar">
          {transactions?.length > 0 ? (
            <div className="w-full flex items-center flex-col gap-3">
              {transactions?.map((data, i) => {
                return <TransactionCard data={data} i={i} key={i} />;
              })}
            </div>
          ) : (
            <NoDataAnime msg={"No Transaction Found"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WebTransaction;

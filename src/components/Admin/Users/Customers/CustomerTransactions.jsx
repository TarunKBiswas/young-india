/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React from "react";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";

const UserTransactions = ({ transactionData }) => {
  return (
    <XTable>
      <THead>
        <TR>
          <TH>ID</TH>
          <TH className="text-start">Amount</TH>
          <TH>Mode</TH>
          <TH>Purpose</TH>
          <TH>Transaction Type</TH>
          <TH>Remark</TH>
          <TH>Date</TH>
        </TR>
      </THead>

      <TBody>
        {transactionData?.map((trx) => (
          <TR key={trx?.id}>
            <TD>{trx?.id}</TD>
            <TD className="text-start">
              {"₹"} {trx?.amount}
            </TD>
            <TD>{trx?.mode}</TD>
            <TD>{trx?.purpose}</TD>
            <TD>{trx?.txn_type}</TD>
            <TD>{trx?.remark}</TD>
            <TD>{moment(trx?.createdAt).format("DD MMM YYYY hh:mm")}</TD>
          </TR>
        ))}
      </TBody>
    </XTable>
  );
};

export default UserTransactions;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React from "react";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";

const UserWalletList = ({ walletData }) => {
  return (
    <XTable>
      <THead>
        <TR>
          <TH>ID</TH>
          <TH className="text-start">Amount</TH>
          <TH>Reason</TH>
          <TH>Transaction Type</TH>
          <TH>Remark</TH>
          <TH>Date</TH>
        </TR>
      </THead>

      <TBody>
        {walletData?.map((wallet) => (
          <TR key={wallet?.id}>
            <TD>{wallet?.id}</TD>
            <TD className="text-start">
              {"₹"} {wallet?.amount}
            </TD>
            <TD>{wallet?.reasons}</TD>
            <TD>{wallet?.transaction_type}</TD>
            <TD>{wallet?.remark}</TD>
            <TD>{moment(wallet?.createdAt).format("DD MMM YYYY hh:mm")}</TD>
          </TR>
        ))}
      </TBody>
    </XTable>
  );
};

export default UserWalletList;

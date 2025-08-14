/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";

const UserOrdersList = ({ orderData }) => {
  return (
    <XTable>
      <THead>
        <TR>
          <TH>ID</TH>
          <TH>Consumer Name</TH>
          <TH>Payment Mode</TH>
          <TH>Consumer Phone</TH>
          <TH>Status</TH>
          <TH>Date</TH>
        </TR>
      </THead>

      <TBody>
        {orderData?.map((user) => (
          <TR key={user?.id}>
            <TD>{user?.id}</TD>
            <TD>{user?.order?.consumer_name}</TD>
            <TD>{user?.order?.consumer_phone}</TD>
            <TD>{user?.order?.payment_mode}</TD>
            <TD>
              {user?.isPaid ? (
                <span className="font-semibold text-green-600">PAID</span>
              ) : (
                <span className="font-semibold text-red-600">UN-PAID</span>
              )}
            </TD>
            <TD>{moment(user?.createdAt).format("DD MMM YYYY hh:mm")}</TD>
          </TR>
        ))}
      </TBody>
    </XTable>
  );
};

export default UserOrdersList;

export const OrderProgessCard = (data) => {
  return [
    // {
    //     statsTitle: 'All',
    //     statsValue: data?.totalOrders || 0,
    //     id: 'ALL'
    // },
    {
      statsTitle: "New Orders",
      statsValue: data?.NEW || 0,
      id: "NEW",
    },
    {
      statsTitle: "Accepted",
      statsValue: data?.ACCEPTED || 0,
      id: "ACCEPTED",
    },
    {
      statsTitle: "Rejected",
      statsValue: data?.DECLINED || 0,
      id: "DECLINED",
    },
    {
      statsTitle: "Cancelled",
      statsValue: data?.CANCELLED || 0,
      id: "CANCELLED",
    },
    // {
    //     statsTitle: 'Processing',
    //     statsValue: data?.processing || 0,
    //     id: 'PROCESSING'
    // },
    {
      statsTitle: "In Transit",
      statsValue: data?.INTRANSIT || 0,
      id: "INTRANSIT",
    },
    // {
    //     statsTitle: 'Out For Delivery',
    //     statsValue: data?.out_for_delivery || 0,
    //     id: 'OUT_FOR_DELIVERY'
    // },

    {
      statsTitle: "Delivered",
      statsValue: data?.DELIVERED || 0,
      id: "DELIVERED",
    },
    {
      statsTitle: "completed",
      statsValue: data?.COMPLETED || 0,
      id: "COMPLETED",
    },
    {
      statsTitle: "Return to Origin",
      statsValue: data?.RTO || 0,
      id: "RTO",
    },
    {
      statsTitle: "Return Request",
      statsValue: data?.RETURN_REQUEST || 0,
      id: "RETURN_REQUEST",
    },
    {
      statsTitle: "Return Accepted",
      statsValue: data?.RETURN_ACCEPTED || 0,
      id: "RETURN_ACCEPTED",
    },
    {
      statsTitle: "Return Declined",
      statsValue: data?.RETURN_DECLINED || 0,
      id: "RETURN_DECLINED",
    },
    {
      statsTitle: "Return Received",
      statsValue: data?.RETURN_RECEIVED || 0,
      id: "RETURN_RECEIVED",
    },
    // {
    //   statsTitle: "Return Pending",
    //   statsValue: data?.RETURN_PENDING || 0,
    //   id: "RETURN_PENDING",
    // },
  ];
};

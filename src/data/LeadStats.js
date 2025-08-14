export const leadStatsData = (data) => {
  
  return [
    {
      statsTitle: "OPEN",
      statsValue: data?.OPEN || 0,
      id: "OPEN",
    },
    {
      statsTitle: "CANCELLED",
      statsValue: data?.CANCELLED || 0,
      id: "CANCELLED",
    },
    {
      statsTitle: "FOLLOWUP",
      statsValue: data?.FOLLOWUP || 0,
      id: "FOLLOWUP",
    },
    {
      statsTitle: "ON_HOLD",
      statsValue: data?.ON_HOLD || 0,
      id: "ON_HOLD",
    },
    {
      statsTitle: "COMFIRMED",
      statsValue: data?.COMFIRMED || 0,
      id: "COMFIRMED",
    },
    {
      statsTitle: "COMPLETED",
      statsValue: data?.COMPLETED || 0,
      id: "COMPLETED",
    },
    // {
    //   statsTitle: "PROSPECTS",
    //   statsValue: data?.PROSPECTS || 0,
    //   id: "PROSPECTS",
    // },
    {
      statsTitle: "UNDER CONNECTION",
      statsValue: data?.UNDER_CONNECTION || 0,
      id: "UNDER_CONNECTION",
    },
  ];
};

export const sourceLeadStats = (data) => {
  return [
    {
      statsTitle: "All",
      statsValue: data?.all || 0,
      id: "",
    },
    {
      statsTitle: "New Leads",
      statsValue: data?.new || 0,
      id: "NEW",
    },
    {
      statsTitle: "Calling",
      statsValue: data?.calling || 0,
      id: "CALLING",
    },
    {
      statsTitle: "Called",
      statsValue: data?.called || 0,
      id: "CALLED",
    },
    {
      statsTitle: "Converted",
      statsValue: data?.converted || 0,
      id: "CONVERTED",
    },
    {
      statsTitle: "Completed",
      statsValue: data?.completed || 0,
      id: "COMPLETED",
    },
  ];
};

export const typeLeadStats = (data) => {
  return [
    {
      statsTitle: "All",
      statsValue: data?.all || 0,
      id: "",
    },
    {
      statsTitle: "New Leads",
      statsValue: data?.new || 0,
      id: "NEW",
    },
    {
      statsTitle: "Calling",
      statsValue: data?.calling || 0,
      id: "CALLING",
    },
    {
      statsTitle: "Called",
      statsValue: data?.called || 0,
      id: "CALLED",
    },
    {
      statsTitle: "Converted",
      statsValue: data?.converted || 0,
      id: "CONVERTED",
    },
    {
      statsTitle: "Completed",
      statsValue: data?.completed || 0,
      id: "COMPLETED",
    },
  ];
};

export const sourceData = [
  {
    id: 1,
    name: "Website",
    value: "WEBSITE",
    current: "source",
  },
  {
    id: 2,
    name: "App",
    value: "APP",
    current: "source",
  },
  {
    id: 3,
    name: "Instagram",
    value: "INSTAGRAM",
    current: "source",
  },
  {
    id: 3,
    name: "Whatsapp",
    value: "WHATSAPP",
    current: "source",
  },
  {
    id: 3,
    name: "Youtube",
    value: "YOUTUBE_CHANNEL",
    current: "source",
  },
];

export const typeData = [
  {
    id: 1,
    name: "Hot Lead",
    value: "HOT_LEAD",
    current: "type",
  },
  {
    id: 2,
    name: "Warm Lead",
    value: "WARM_LEAD",
    current: "type",
  },
  {
    id: 3,
    name: "Cold Lead",
    value: "COLD_LEAD",
    current: "type",
  },
  {
    id: 4,
    name: "Not Connected",
    value: "NOT_CONNECTED",
    current: "type",
  },
];

export const statusData = [
  {
    id: 1,
    name: "Open",
    value: "OPEN",
    current: "status",
  },
  {
    id: 2,
    name: "Cancelled",
    value: "CANCELLED",
    current: "status",
  },
  {
    id: 3,
    name: "Confirmed",
    value: "CONFIRMED",
    current: "status",
  },
  {
    id: 4,
    name: "Completed",
    value: "COMPLETED",
    current: "status",
  },
  {
    id: 5,
    name: "Follow up",
    value: "FOLLOWUP",
    current: "status",
  },
  {
    id: 6,
    name: "On Hold",
    value: "ON_HOLD",
    current: "status",
  },
  {
    id: 2,
    name: "Under Conncection",
    value: "UNDER_CONNECTION",
    current: "status",
  },
];

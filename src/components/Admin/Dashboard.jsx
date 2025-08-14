/* eslint-disable react-hooks/exhaustive-deps */
import MainStats from "./Dashboard/MainStats.jsx";
import { getStatsData } from "../../utils/dashboard.js";
import { useEffect, useMemo, useState } from "react";
import { state } from "../../data/state.js";
import { dashboardStatsCard } from "../../data/DashboardStats.js";
import StoreLink from "./Dashboard/StoreLink.jsx";
import { io } from "socket.io-client";
import DateFilter from "./Dashboard/DateFilter.jsx";
import OutletWrapper from "../../Pages/OutletWrapper.jsx";
import { IP } from "../../utils/const_API.js";
// import LineChart from "./Dashboard/LineChart.jsx";

const Dashboard = () => {
  const dates = [7, 15, 30, 45, 60];
  // const [revenue, setRevenue] = useState([]);
  const [days, setDays] = useState(0);

  const getStats = async (count) => {
    try {
      let res = await getStatsData(days);
      // console.log(res);
      if (res?.status === 200) {
        let sData = dashboardStatsCard(res?.data?.data, count);
        state.statsData = sData;
        // setRevenue(res?.data?.data.revenue_over_time?.monthly_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const socket = useMemo(
    () =>
      io(IP, {
        query: {
          subdomain: window.location.host.split(".")[0],
        },
      }),
    []
  );

  useEffect(() => {
    getStats();
  }, [days]);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("liveUsersUpdate", () => {});

    socket.on("disconnect", () => {});
    socket.on("liveUsersUpdate", (data) => {
      if (data.subdomain === window.location.host.split(".")[0]) {
        getStats(data.liveUsersCount);
      }
    });
  }, []);

  return (
    <div className="w-full flex flex-col bg-[#f9f9f9f]">
      {window.location.href?.includes("socialseller.in") && <StoreLink />}
      <OutletWrapper>
        <div className="w-full flex flex-col gap-4">
          <DateFilter setDays={setDays} dates={dates} />
          <MainStats />
        </div>

        {/* <div className="w-full mt-20 flex items-center gap-4 max-w-3xl  ">
          <LineChart revenue={revenue} />
        </div> */}
      </OutletWrapper>
    </div>
  );
};

export default Dashboard;

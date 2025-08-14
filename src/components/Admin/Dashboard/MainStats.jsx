import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import { useNavigate } from "react-router-dom";
import StateCard from "./StateCard.jsx";

const MainStats = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const navigationHandler = (link) => {
    navigate(`${link}`);
  };

  return (
    <div className=" w-full grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-8 ">
      {snap.statsData?.map((data, i) => {
        return (
          <div className="w-full" key={i}>
            <StateCard data={data} navigationHandler={navigationHandler} />
          </div>
        );
      })}
    </div>
  );
};

export default MainStats;

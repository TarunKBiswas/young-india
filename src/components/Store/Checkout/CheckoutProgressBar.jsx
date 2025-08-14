import { useEffect, useState } from "react";
import { checkoutProgressTitles } from "../../../utils/Store/Constant";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";

const CheckoutProgressBar = () => {
  const snap = useSnapshot(webState);
  const [currentStage, setCurrentStage] = useState(snap.checkoutStage);

  const stageHandler = (stage) => {
    if (stage < currentStage) {
      webState.checkoutStage = stage;
    }
  };

  useEffect(() => {
    setCurrentStage(snap.checkoutStage);
  }, [snap.checkoutStage]);

  return (
    <div className="w-full flex flex-col">
      <div className="lg:px-[30px] sm:px-[15px]">
        <div className="co-pr-title flex justify-between m-1 mr-0">
          {checkoutProgressTitles.map((item, i) => (
            <p
              key={i}
              className="text-sm font-medium cursor-pointer capitalize"
              onClick={() => stageHandler(item.stage)}
            >
              {item.title}
            </p>
          ))}
        </div>
        <div
          className={`bg-[#A39C9C]/25 w-full relative rounded-md h-[10px] my-[5px] ml-1 mx-auto transition-all duration-1000`}
        >
          <div
            className={`flex top-0 left-0 bg-black rounded-full transition-all h-full duration-1000`}
            style={{ width: currentStage }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgressBar;

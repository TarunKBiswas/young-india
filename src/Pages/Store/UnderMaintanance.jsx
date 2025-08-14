/* eslint-disable react-hooks/exhaustive-deps */
import Lottie from "react-lottie-player";
import animation from "../../assets/animations/maintenance.json";
import { useSnapshot } from "valtio";
import { webState } from "../../data/webStates";
import { useLayoutEffect, useState } from "react";

const UnderMaintanance = () => {
  const [message, setMessage] = useState();
  const snap = useSnapshot(webState);

  useLayoutEffect(() => {
    if (snap.storeInfo?.is_maintenance_mode) {
      setMessage(snap.storeInfo?.store_maintenance_message);
    }
  }, [snap.storeInfo?.is_maintenance_mode]);

  return (
    <div className="w-full max-w-5xl mx-auto h-screen flex flex-col items-center justify-between">
      <div className=" flex-1 flex flex-col items-center justify-center text-center px-4 lg:px-0">
        <Lottie
          loop
          animationData={animation}
          play
          style={{ width: 500, height: 300 }}
        />
        <p className="text-4xl font-bold text-gray-700 capitalize tracking-wide mt-8">
          {message || (
            <div className="flex flex-col gap-2">
              <span>Website is under maintenance.</span>
              <span className="text-3xl">Please Wait some time</span>
              <span className="text-2xl">We Will be back soon</span>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default UnderMaintanance;

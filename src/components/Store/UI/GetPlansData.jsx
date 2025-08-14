/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { webState } from "../../../data/webStates";
import { useSnapshot } from "valtio";
import { premiumPlansData } from "../../../utils/Store/Setting";

const GetPlansData = ({ children }) => {
  const snap = useSnapshot(webState);

  const getPlans = async () => {
    try {
      let res = await premiumPlansData();

      if (res?.status === 200) {
        webState.premiumPlansData = res?.data?.data?.length;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    if (!snap.premiumPlansData) {
      getPlans();
    }
  }, [snap.premiumPlansData]);

  return <>{<>{children}</>}</>;
};

export default GetPlansData;

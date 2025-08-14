/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
import { useEffect } from "react";
import { userInfoData } from "../../../utils/Store/Setting";
import { webState } from "../../../data/webStates";

const UserInfoData = ({ children }) => {
  const snap = useSnapshot(webState);

  const getUserData = async () => {
    try {
      let res = await userInfoData();
      if (res?.status === 200) {
        webState.userData = res?.data;
        snap.refreshUserInfo = true;
      } else {
        sessionStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (snap.refreshUserInfo) {
      getUserData();
    }
  }, [snap.refreshUserInfo, snap.userData]);

  useEffect(() => {
    if (!snap.userData && snap.resellerToken) {
      getUserData();
    }
  }, [snap.userData, snap.resellerToken]);

  return (
    <>
      {
        <div className="flex  flex-col items-start justify-start gap-2">
          {children}
        </div>
      }
    </>
  );
};

export default UserInfoData;

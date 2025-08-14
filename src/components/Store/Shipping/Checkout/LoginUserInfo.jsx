import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { userInfoData } from "../../../../utils/Store/Setting";
import { useEffect } from "react";

const LoginUserInfo = () => {
  const snap = useSnapshot(webState);
  const userInfo = snap?.userData?.data;

  const getUserData = async () => {
    try {
      let res = await userInfoData();
      if (res?.status === 200) {
        webState.userData = res?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!snap?.userData) {
      getUserData();
    }
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 border p-3">
        {userInfo?.avatar ? (
          <img
            width={"auto"}
            height={"auto"}
            alt="image"
            src={userInfo?.avatar?.url}
            className="rounded-full w-12 h-12 object-cover object-top"
          />
        ) : (
          <div className="bg-themecolor text-white border rounded-full text-[24px] flex items-center justify-center font-semibold w-12 h-12">
            {userInfo?.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-medium leading-6 tracking-wide capitalize">
            {userInfo?.name}
          </span>
          <span className="text-xs font-medium leading-3 tracking-wide">
            {userInfo?.email}
          </span>
          <span className="text-xs font-medium leading-3 tra      cking-wide">
            {userInfo?.phone?.split("+91").join("")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginUserInfo;

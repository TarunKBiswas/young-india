import { useSnapshot } from "valtio";
import { state } from "../../../data/state";

const HeaderProfile = () => {
  const snap = useSnapshot(state);

  let name = snap.brandInfo?.name;
  let email = snap.brandInfo?.email;

  return (
    <div className="w-full ">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-9 h-9 rounded-full object-contain border flex items-center justify-center bg-green-500">
          <span className="text-xl text-white uppercase">{name?.[0]}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-roboto hidden lg:block">
            <span className=" text-sm">{name}</span>
          </span>
          <span className="hidden lg:block text-sm font-medium leading-none">
            {email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;

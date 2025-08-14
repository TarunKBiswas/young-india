import ModalBody from "./ModalBody";
import { webState } from "../../../../data/webStates";

const Logout = () => {
  const closeModalHandler = () => {
    webState.showLogotModal = false;
  };

  const logOut = () => {
    (webState.userData = null),
      (webState.resellerToken = null),
      sessionStorage.removeItem("usertoken");
    sessionStorage.removeItem("userdata");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("_grecaptcha");
    sessionStorage.removeItem("activeButton");
    webState.loggedinUserData = null;
    webState.showLogotModal = false;
  };

  return (
    <ModalBody closeModalHandler={closeModalHandler}>
      <div className="text-[18px] text-themecolor font-semibold w-full flex justify-center my-2">
        Are you sure you want to Logout
      </div>
      <div className="min-w-[7vw] md:min-w-[12vw] lg:min-w-[25vw]">
        <div className="flex items-center justify-center gap-5 mt-6 w-full ">
          <button
            onClick={closeModalHandler}
            className="text-sm lg:text-[16px] text-themecolor border border-1 border-themecolor px-12 py-2 hover:scale-95 transition-all duration-300 rounded"
          >
            Cancel
          </button>
          <button
            className="text-sm lg:text-[16px] text-themecolor border border-themecolor px-12 py-2 hover:scale-95 transition-all duration-300 rounded"
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </ModalBody>
  );
};

export default Logout;

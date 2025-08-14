import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import { deleteAddress } from "../../../utils/addresses.js";
import { thankyouModalHandler } from "../../../utils/const_API.js";

const DeleteAddressModal = () => {
  const snap = useSnapshot(state);
  const id = snap.selectedAddressID;

  const deleteAddressHandler = async () => {
    state.showDeleteAddressModal = false;

    try {
      let res = await deleteAddress(id);
      if (res === true) {
        state.refreshAddressList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-black/[.50] fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center">
        <div className="relative p-4 w-full max-w-xl  md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow w-full">
            <button
              onClick={() => {
                state.showDeleteAddressModal = false;
              }}
              type="button"
              className="absolute top-3 right-2.5 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 lg:p-8">
              <h3 className="text-xl font-bold text-gray-900 text-center">
                Are You Sure?
              </h3>
              <div className="w-full flex items-center justify-center pt-6">
                <button
                  className="cButton"
                  onClick={() => (state.showDeleteAddressModal = false)}
                >
                  No
                </button>
                <button className="dButton" onClick={deleteAddressHandler}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAddressModal;

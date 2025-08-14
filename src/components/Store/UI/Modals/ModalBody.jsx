import { RxCross2 } from "react-icons/rx";

/* eslint-disable react/prop-types */
const ModalBody = ({ closeModalHandler, children }) => {
  return (
    <div className="bg-black/[.50] fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-xl  md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white  shadow w-full rounded">
          <button
            onClick={closeModalHandler}
            type="button"
            className="absolute top-1 right-2.5 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray- text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-toggle="authentication-modal"
          >
            <RxCross2 className="h-6 w-6" />
          </button>
          <div className="p-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalBody;

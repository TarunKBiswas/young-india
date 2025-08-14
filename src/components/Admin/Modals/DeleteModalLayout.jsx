/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { CiWarning } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { CancelButton, DeleteButton } from "../UI/Buttons/Delete&CancelButton";
import { FaCircleCheck } from "react-icons/fa6";

const DeleteModalLayout = ({
  closeModalHandler,
  action,
  msg,
  confirmMsg,
  btnText,
  type,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // onClick={closeModalHandler}
        className=" bg-black/[.50] fixed inset-0 z-[99999] flex items-center justify-center cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "20deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white  border rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="w-full flex items-center justify-end">
            <span className="px-4 pt-4 cursor-pointer">
              <RxCross2
                className="h-4 w-4 hover:animate-spin"
                onClick={closeModalHandler}
              />
            </span>
          </div>
          <div className="w-full flex px-6">
            <div
              className={`rounded-full border border-gray-300 flex items-center justify-center w-12 h-12 ${
                type === "accept" ? "bg-green-100" : "bg-red-100"
              } `}
            >
              {type === "accept" ? (
                <FaCircleCheck className="h-7 w-7 text-green-800" />
              ) : (
                <CiWarning className="h-7 w-7 text-red-800" />
              )}
            </div>
            <div className=" ml-4 text-start">
              <span className="font-bold text-lg">{confirmMsg}</span>
              <br />
              <span className="text-sm text-gray-400 mt-1">{msg}</span>
            </div>
          </div>
          <div className="w-full flex items-end justify-end gap-2  bg-gray-100 p-3 mt-3">
            <CancelButton func={closeModalHandler} />
            <DeleteButton title={btnText} func={action} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteModalLayout;

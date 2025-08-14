/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const CheckoutModalBody = ({ children, closeModalHandler }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`bg-black/[.90] fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll scrollbar-hide p-4  `}
      >
        <motion.div
          initial={{ scale: 0, rotate: "20deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white border rounded-lg w-full max-w-5xl shadow-xl cursor-default relative overflow-y-scroll scrollbar-hide h-fit  `}
        >
          <div className="w-full flex items-center justify-end lg:hidden">
            <span className="px-4 pt-4 cursor-pointer">
              <RxCross2
                className="h-6 w-6 hover:animate-spin "
                onClick={closeModalHandler}
              />
            </span>
          </div>
          <div className="w-full flex items-center ">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModalBody;

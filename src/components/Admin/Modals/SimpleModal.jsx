/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const SimpleModal = ({
  children,
  closeModalHandler,
  modalSize,
  position,
  padding,
  height,
  modalColor,
  className,
  closeIconColor,
  modalshadow,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`bg-black/70 ${
          padding || "p-8"
        } fixed inset-0 z-[100] flex ${
          position || "items-center "
        } justify-center pt-16 overflow-y-scroll scrollbar-hide cursor-pointer `}
        // onClick={closeModalHandler}
      >
        <motion.div
          initial={{ scale: 0, rotate: "20deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className={`border rounded-lg w-full ${modalSize || "max-w-lg"} ${
            modalshadow || "shadow-xl"
          } cursor-default relative overflow-y-scroll scrollbar-hide ${height} ${
            modalColor || "bg-white"
          } ${className}`}
        >
          <div className="w-full flex items-center justify-end ">
            <span className="px-4 pt-4 cursor-pointer">
              <RxCross2
                className={`h-6 w-6 hover:scale-90 transition-all duration-300 ${
                  closeIconColor || ""
                }`}
                onClick={closeModalHandler}
              />
            </span>
          </div>
          <div className="w-full">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SimpleModal;

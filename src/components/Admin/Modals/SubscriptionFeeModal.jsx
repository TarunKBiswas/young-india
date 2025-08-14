/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiWarning } from "react-icons/ci";
import PlansModal from "./PlansModal";

const SubscriptionFeeModal = () => {
  const [showPlansModal, setShowPlansModal] = useState(false);

  const paymentHandler = () => {
    setShowPlansModal(true);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black/[.95] fixed inset-0 z-20 flex  items-center justify-center pt-16 overflow-y-scroll scrollbar-hide"
        >
          <motion.div
            initial={{ scale: 0, rotate: "20deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border rounded-lg w-full max-w-2xl shadow-xl cursor-default relative overflow-y-scroll scrollbar-hide"
          >
            <div className="flex flex-col lg:flex-row items-start px-6 mt-10">
              <div
                className={`rounded-full border border-gray-300 flex items-center justify-center w-12 h-12  bg-red-100
               flex-shrink-0 mx-auto`}
              >
                <CiWarning className="h-8 w-8 text-red-700" />
              </div>

              <div className="w-full ml-4 lg:text-start mt-1">
                <span
                  className="font-bold text-center
                 text-xl lg:text-2xl text-red-600"
                >
                  Server Payment Required
                </span>
                <br />
                <span className="capitalize text-base font-medium text-black/90 mt-3 tracking-wider">
                  Please initiate server payment to keep your account activated.
                  Non payment of due amount will permanently
                  <span className="text-red-600 font-bold pl-1">
                    Disable your website.
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full flex items-end justify-end gap-2 p-3 mt-3">
              <button
                className="bg-blue-600 text-white px-4 py-2.5 text-base rounded"
                onClick={paymentHandler}
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {showPlansModal && <PlansModal setShowPlansModal={setShowPlansModal} />}
    </>
  );
};

export default SubscriptionFeeModal;

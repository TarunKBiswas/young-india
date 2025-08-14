/* eslint-disable react/prop-types */
import { ChevronDown } from "lucide-react";
import BulkPricing from "./BulkPricing";

const BulkPricingSection = ({
  bulkPData,
  showBulkPriceChart,
  setShowBulkPriceChart,
}) => {
  return (
    <div className="w-full flex flex-col items-start mt-2">
      <div
        onClick={() => setShowBulkPriceChart(!showBulkPriceChart)}
        className="flex items-center gap-2 text-neutral-800 cursor-pointer text-sm lg:text-base font-medium leading-tight mt-3"
      >
        Bulk Quantity Pricing{" "}
        <span>
          <ChevronDown
            className={`h-6 transition-all ease-in-out duration-500 ${
              showBulkPriceChart ? "-rotate-180" : ""
            }`}
          />
        </span>
      </div>
      {/* {showBulkPriceChart && ( */}
      <div
        className={`w-[300px] flex items-center gap-2 mt-2 overflow-hidden capitalize text-gray-300 transition-all duration-500 ease-in-out ${
          showBulkPriceChart ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <BulkPricing data={bulkPData} />
      </div>
      {/* )} */}
    </div>
  );
};

export default BulkPricingSection;

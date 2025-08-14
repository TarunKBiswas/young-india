/* eslint-disable react/prop-types */
import { Switch } from "@headlessui/react";

const ResellingSection = ({
  storeType,
  showResellerInput,
  setShowReselerInput,
  resellengPrice,
  resellingPriceHandler,
  price,
  quantity,
  variantDetails,
  prodPrice,
}) => {
  return (
    <>
      {storeType === "RESELLER-ECOMMERCE" && (
        <div className="h-10 flex justify-start items-center gap-3 mt-3">
          <div className=" flex items-center">
            <Switch
              value={showResellerInput}
              checked={showResellerInput}
              onChange={() => setShowReselerInput(!showResellerInput)}
              className={`${showResellerInput ? "bg-[#176DFD]" : "bg-[#C9C9C9]"}
                    relative flex h-[21px] w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
              <span
                aria-hidden="true"
                className={`${
                  showResellerInput ? "translate-x-4" : "translate-x-0"
                }
                        pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-start text-neutral-800 text-xs lg:text-sm font-medium leading-normal">
            Are you a Online Reseller ?
          </div>
        </div>
      )}

      {showResellerInput && (
        <div className="w-full flex flex-col items-center gap-3  mb-3">
          <div className="w-full">
            <input
              type="number"
              className="webInputStyle text-sm "
              placeholder="Reselling Price"
              defaultValue={resellengPrice}
              onChange={(e) => resellingPriceHandler(e.target.value)}
            />
            {resellengPrice < price && (
              <span className="text-[11px] text-red-400">
                Reselling Price needs to be grater than product price
              </span>
            )}
          </div>

          <table className="w-full text-sm text-left text-gray-500  border-none ">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr className="px-6 py-2 ">
                <th
                  scope="col"
                  className="text-neutral-800 px-6 py-0.5 text-opacity-70 text-xs font-semibold text-start uppercase leading-normal tracking-wide"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="text-neutral-800 px-6 py-2 text-opacity-70 text-xs font-semibold uppercase text-start leading-normal tracking-wide"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="border-x  bg-white">
              <tr className="border-b border-gray-300 border-t ">
                <td className="px-6 py-2 border-gray-300">
                  <span className="text-neutral-800 text-opacity-70 text-xs font-medium leading-normal">
                    {quantity} Pcs - ₹ {price}
                  </span>
                </td>
                <td className="px-6 py-2 border-gray-300">
                  <span className="text-neutral-800 text-opacity-70 text-xs font-medium leading-normal">
                    ₹ {quantity * variantDetails?.price}
                  </span>
                </td>
              </tr>
              {resellengPrice >= parseInt(prodPrice) && (
                <tr className="border-b">
                  <td className="px-6 py-2 border-gray-300">
                    <span className="text-neutral-800 text-xs font-medium leading-normal">
                      Total Margin
                    </span>
                  </td>
                  <td className="px-6 py-2 border-gray-300 ">
                    <span className="text-neutral-800 text-xs font-medium leading-normal">
                      ₹ {quantity * resellengPrice - quantity * price}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ResellingSection;

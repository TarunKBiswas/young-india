/* eslint-disable react/prop-types */

import CheckTabInput from "../UI/Inputs/CheckTabInput";

const PricingSettings = ({ settingsData, inputData, setInputData, updateSetting, cod_enabled, setCodEnabled }) => {
  return (
    <>
      <div className="w-full flex items-center justify-center flex-col gap-3 max-w-6xl">
        <div className="w-full flex items-center gap-6">
          <div className="w-full">
            <span className="text-sm font-semibold ">COD Prepaid Type :</span>
            <div className="relative flex  items-center mt-3 gap-3">
              <div className="w-full flex items-center cursor-pointer gap-3">
                <input
                  type="radio"
                  className="h-5 w-5 checked:text-[#222222] !ring-0 !ring-offset-0 !shadow-none cursor-pointer"
                  defaultChecked={settingsData?.cod_prepaid_type === "PRICE"}
                  name={"shippingType"}
                  id="codpt_price"
                  onChange={() =>
                    setInputData({
                      ...inputData,
                      cod_prepaid_type: "PRICE",
                    })
                  }
                />
                <label htmlFor="codpt_price" className="cursor-pointer">
                  Amount
                </label>
              </div>
              <div className="w-full flex items-center cursor-pointer gap-3">
                <input
                  type="radio"
                  className="h-5 w-5 checked:text-[#222222] !ring-0 !ring-offset-0 !shadow-none cursor-pointer"
                  defaultChecked={settingsData?.cod_prepaid_type === "PERCENTAGE"}
                  name={"shippingType"}
                  id="codpt_percentage"
                  onChange={() =>
                    setInputData({
                      ...inputData,
                      cod_prepaid_type: "PERCENTAGE",
                    })
                  }
                />
                <label htmlFor="codpt_percentage" className="cursor-pointer">
                  Percentage
                </label>
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-semibold ">
              COD Prepaid
              {(inputData?.cod_prepaid_type ?? settingsData?.cod_prepaid_type) === "PRICE"
                ? " Amount (₹)"
                : " Percentage (%)"}
              :
            </label>
            <div className="relative flex items-center mt-6">
              <input
                className="form-control outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="number"
                placeholder={(inputData?.cod_prepaid_type ?? settingsData?.cod_prepaid_type) === "PRICE" ? "₹ " : " % "}
                defaultValue={settingsData?.cod_prepaid}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    cod_prepaid: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-semibold ">Withdrawal Limit</label>
            <div className="relative flex items-center mt-6">
              <input
                className="form-control outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="text"
                placeholder="Withdrawal Limit..."
                defaultValue={settingsData?.withdraw_limit}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    withdraw_limit: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-semibold ">COD Allowed</label>
            <div className="relative flex items-center mt-3">
              <CheckTabInput value={cod_enabled} setValue={setCodEnabled} position={"justify-start absolute"} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center flex-col gap-3 max-w-6xl mt-10">
        <div className="w-full flex items-center gap-4">
          <div className="w-full">
            <label className="text-sm font-semibold ">Prepaid Discount Type :</label>
            <div className="relative flex  items-center mt-3 gap-3">
              <div className="w-full flex items-start gap-3">
                <input
                  type="radio"
                  className="h-5 w-5 checked:text-[#222222]"
                  name="prepaid discount type"
                  defaultChecked={settingsData?.prepaid_discount_type === "PRICE"}
                  onChange={() =>
                    setInputData({
                      ...inputData,
                      prepaid_discount_type: "PRICE",
                    })
                  }
                />
                <label htmlFor="">Amount</label>
              </div>

              <div className="w-full flex items-start gap-3">
                <input
                  type="radio"
                  className="h-5 w-5 checked:text-[#222222]"
                  name="prepaid discount type"
                  defaultChecked={settingsData?.prepaid_discount_type === "PERCENTAGE"}
                  onChange={() =>
                    setInputData({
                      ...inputData,
                      prepaid_discount_type: "PERCENTAGE",
                    })
                  }
                />
                <label htmlFor="">Percentage</label>
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-semibold ">Prepaid Discount Value:</label>
            <div className="relative flex items-center mt-6">
              <input
                className="form-control outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="number"
                placeholder={inputData?.prepaid_discount_type === "PRICE" ? "₹ " : " % "}
                defaultValue={settingsData?.prepaid_discount}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    prepaid_discount: +e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-end mt-4">
        <button
          className={`submitButton py-[11px] rounded`}
          onClick={(e) =>
            updateSetting(
              {
                cod_prepaid: inputData?.cod_prepaid ?? settingsData?.cod_prepaid,
                cod_prepaid_type: inputData?.cod_prepaid_type ?? settingsData?.cod_prepaid_type,
                withdraw_limit: inputData?.withdraw_limit ?? settingsData?.withdraw_limit,
                cod_enabled: cod_enabled,
                prepaid_discount_type: inputData?.prepaid_discount_type ?? settingsData?.prepaid_discount_type,
                prepaid_discount: inputData?.prepaid_discount ?? settingsData?.prepaid_discount,
              },
              e
            )
          }
        >
          Update
        </button>
      </div>
    </>
  );
};

export default PricingSettings;

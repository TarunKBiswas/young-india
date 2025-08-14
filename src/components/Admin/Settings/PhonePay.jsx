/* eslint-disable react/prop-types */
const PhonePay = ({ settingsData, inputData, setInputData, updateSetting }) => {
  return (
    <div className="w-full">
      <div className="w-full flex-col flex items-center gap-4">
        <div className="w-full flex items-center gap-4">
          <div className="w-full">
            <label className="font-semibold text-sm">Key Index</label>
            <div className="relative flex items-center mt-6">
              <input
                className="w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="text"
                placeholder="Key Index..."
                defaultValue={settingsData?.phonepe_key_index}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    phonepe_key_index: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="font-semibold text-sm">Merchant ID</label>
            <div className="relative flex items-center mt-6">
              <input
                className="w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="text"
                placeholder="Merchant ID..."
                defaultValue={settingsData?.phonepe_merchant_id}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    phonepe_merchant_id: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="w-full">
            <label className="font-semibold text-sm">Merchant key</label>
            <div className="relative flex items-center mt-6">
              <input
                className="w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="text"
                placeholder="Merchant key..."
                defaultValue={settingsData?.phonepe_merchant_key}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    phonepe_merchant_key: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end my-6">
          <button
            className={`submitButton py-[11px] rounded absolute mt-2  `}
            onClick={(e) =>
              updateSetting(
                {
                  phonepe_key_index:
                    inputData?.phonepe_key_index ||
                    settingsData?.phonepe_key_index,
                  phonepe_merchant_id:
                    inputData?.phonepe_merchant_id ||
                    settingsData?.phonepe_merchant_id,
                  phonepe_merchant_key:
                    inputData?.phonepe_merchant_key ||
                    settingsData?.phonepe_merchant_key,
                },
                e
              )
            }
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhonePay;

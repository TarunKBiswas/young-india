/* eslint-disable react/prop-types */

const CashFree = ({ settingsData, inputData, setInputData, updateSetting }) => {
  return (
    <div className="w-full">
      <div className="w-full flex-col flex items-center gap-4">
        <div className="w-full flex items-center gap-4">
          <div className="w-full">
            <label className="font-semibold">Client ID</label>
            <div className="relative flex items-center mt-3">
              <input
                className="form-control outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="text"
                placeholder="Client ID..."
                defaultValue={settingsData?.cashfree_client_id}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    cashfree_client_id: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="font-semibold">Client Secret</label>
            <div className="relative flex items-center mt-3">
              <input
                className="form-control outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="text"
                placeholder="Client Secret..."
                defaultValue={settingsData?.cashfree_client_secret}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    cashfree_client_secret: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end mb-6">
          <button
            className={`submitButton py-[11px] rounded absolute mt-2  `}
            onClick={(e) =>
              updateSetting(
                {
                  cashfree_client_id:
                    inputData?.cashfree_client_id ||
                    settingsData?.cashfree_client_id,
                  cashfree_client_secret:
                    inputData?.cashfree_client_secret ||
                    settingsData?.cashfree_client_secret,
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

export default CashFree;

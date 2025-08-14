/* eslint-disable react/prop-types */

const ShipRocketSetting = ({
  settingsData,
  inputData,
  setInputData,
  updateSetting,
}) => {

  return (
    <div className="w-full max-w-5xl ">
      <div className="w-full flex-col flex items-center gap-4 ">
        <div className="w-full flex items-center gap-4">
          <div className="w-full">
            <label className="font-semibold">Shiprocket Username</label>
            <div className="relative flex items-center mt-6">
              <input
                className="w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="text"
                placeholder="Username..."
                defaultValue={settingsData?.shiprocket_username}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    shiprocket_username: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="font-semibold">Shiprocket Password</label>
            <div className="relative flex items-center mt-6">
              <input
                className="w-full outline-none border-gray-200 rounded ring-0 focus:ring-0 absolute"
                type="password"
                placeholder="Password..."
                defaultValue={settingsData?.shiprocket_password}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    shiprocket_password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-semibold ">Shipment Type :</label>
            <div className="relative flex  items-center mt-3 gap-3">
              <div className="w-full flex items-start gap-3">
                <input
                  type="radio"
                  className="h-5 w-5 checked:text-[#222222]"
                  defaultChecked={
                    settingsData?.selected_shipment === "CUSTOM_COURIER"
                  }
                  name={"shippingType"}
                  onChange={() =>
                    setInputData({
                      ...inputData,
                      selected_shipment: "CUSTOM_COURIER",
                    })
                  }
                />
                <label htmlFor="">Custom Courier</label>
              </div>
              <div className="w-full flex items-start gap-3">
                <input
                  type="radio"
                  className="h-5 w-5 checked:text-[#222222]"
                  defaultChecked={
                    settingsData?.selected_shipment === "SHIPROCKET"
                  }
                  name={"shippingType"}
                  onChange={() =>
                    setInputData({
                      ...inputData,
                      selected_shipment: "SHIPROCKET",
                    })
                  }
                />
                <label htmlFor="">Shiprocket</label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end my-2">
          <button
            className={`submitButton py-[11px] rounded absolute mt-2`}
            onClick={(e) =>
              updateSetting(
                {
                  shiprocket_password:
                    inputData?.shiprocket_password ||
                    settingsData?.shiprocket_password,
                  shiprocket_username:
                    inputData?.shiprocket_username ||
                    settingsData?.shiprocket_username,
                  selected_shipment:
                    inputData?.selected_shipment ||
                    settingsData?.selected_shipment,
                  is_shiprocket_enabled: true,
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

export default ShipRocketSetting;

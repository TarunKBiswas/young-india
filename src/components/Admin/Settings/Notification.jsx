/* eslint-disable react/prop-types */
const Notification = ({
  settingsData,
  inputData,
  setInputData,
  updateSetting,
}) => {
  return (
    <div className="w-full flex items-center justify-end flex-col gap-3 max-w-3xl ">
      <div className="w-full flex items-start mt-4 gap-2">
        <div>
          <label className="font-semibold">User Verification Type :</label>
          <div className="relative flex  items-center mt-3 gap-8">
            <div className="w-full flex items-start gap-2">
              <input
                type="radio"
                className="h-5 w-5 checked:text-[#222222]"
                name="verificationType"
                defaultChecked={
                  settingsData?.user_verification_method === "FIREBASE"
                }
                onChange={() =>
                  setInputData({
                    ...inputData,
                    user_verification_method: "FIREBASE",
                  })
                }
              />
              <label htmlFor="">FIREBASE</label>
            </div>
            <div className="w-full flex items-start gap-2">
              <input
                type="radio"
                className="h-5 w-5 checked:text-[#222222]"
                name="verificationType"
                defaultChecked={
                  settingsData?.user_verification_method === "MSG91"
                }
                onChange={() =>
                  setInputData({
                    ...inputData,
                    user_verification_method: "MSG91",
                  })
                }
              />
              <label htmlFor="">MSG91</label>
            </div>
            <div className="w-full flex items-start gap-2 ">
              <input
                type="radio"
                className="h-5 w-5 checked:text-[#222222]"
                name="verificationType"
                defaultChecked={
                  settingsData?.user_verification_method === "INTERAKT"
                }
                onChange={() =>
                  setInputData({
                    ...inputData,
                    user_verification_method: "INTERAKT",
                  })
                }
              />
              <label htmlFor="">INTERAKT</label>
            </div>
            <div className="w-full flex items-start gap-2">
              <input
                type="radio"
                className="h-5 w-5 checked:text-[#222222]"
                name="verificationType"
                defaultChecked={
                  settingsData?.user_verification_method === "MSGSSA"
                }
                onChange={() =>
                  setInputData({
                    ...inputData,
                    user_verification_method: "MSGSSA",
                  })
                }
              />
              <label htmlFor="">MSGSSA</label>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex flex-col items-start mt-6 max-w-3xl">
        <label className="font-semibold">Notification :</label>
        <div className="w-full flex items-center justify-center max-w-3xl">
          <div className="w-full flex items-start gap-2">
            <input
              type="radio"
              className="h-5 w-5 checked:text-[#222222]"
              name="verificationType"
              defaultChecked={
                settingsData?.firebase_notifications === "FIREBASE"
              }
              onChange={() =>
                setInputData({
                  ...inputData,
                  firebase_notifications: "FIREBASE",
                })
              }
            />
            <label htmlFor="">FIREBASE</label>
          </div>
          <div className="w-full flex items-start gap-2 mt-2">
            <input
              type="radio"
              className="h-5 w-5 checked:text-[#222222]"
              name="verificationType"
              defaultChecked={
                settingsData?.interakt_notifications === "INTERAKT"
              }
              onChange={() =>
                setInputData({
                  ...inputData,
                  interakt_notifications: "INTERAKT",
                })
              }
            />
            <label htmlFor="">INTERAKT</label>
          </div>
          <div className="w-full  flex items-start gap-2 mt-2">
            {inputData?.user_verification_method ||
            settingsData?.user_verification_method === "INTERAKT" ? (
              <input
                className=" outline-none border-gray-200 rounded ring-0 focus:ring-0 "
                type="text"
                placeholder="Interakt api key"
                defaultValue={settingsData?.interakt_api_key}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    shiprocket_password: e.target.value,
                  })
                }
              />
            ) : null}
          </div>
        </div>
      </div> */}
      <div className="w-full flex items-center mt-2">
        <div className="w-full flex items-center justify-end">
          <button
            className={`submitButton py-[11px] rounded absolute mt-4  `}
            onClick={(e) =>
              updateSetting(
                {
                  user_verification_method:
                    inputData?.user_verification_method ||
                    settingsData?.user_verification_method,
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

export default Notification;

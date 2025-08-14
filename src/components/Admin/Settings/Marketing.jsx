/* eslint-disable react/prop-types */
const Marketing = ({
  settingsData,
  inputData,
  setInputData,
  updateSetting,
}) => {
  return (
    <div className="w-full max-w-lg ">
      <div className="w-full flex flex-col gap-4">
        <p className="text-xl font-medium">Facebook Pixel Integration</p>

        <div className="w-full">
          <textarea
            className="outline-none border-gray-200 rounded ring-0 focus:ring-0"
            type="text"
            rows={15}
            cols={55}
            placeholder="Pixel Code..."
            defaultValue={settingsData?.facebook_pixel}
            onChange={(e) => {
              const cleanPixelCode = e.target.value
                .replace(/<script[^>]*>/gi, "")
                .replace(/<\/script>/gi, "");
              setInputData({
                ...inputData,
                facebook_pixel: cleanPixelCode,
              });
            }}
          />
        </div>
        <div className="w-full flex justify-end ">
          <button
            className={`submitButton py-[11px] rounded  `}
            onClick={(e) =>
              updateSetting(
                {
                  facebook_pixel:
                    inputData?.facebook_pixel || settingsData?.facebook_pixel,
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

export default Marketing;

/* eslint-disable react/prop-types */

const MediaInputUpdate = ({ state, setState, image, label, size, style }) => {
  const resizeImageFile = async (e) => {
    try {
      const file = e.target.files[0];
      setState(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${style || "flex items-center"}`}>
      <label className={`${size || "col-sm-3"}`}>{label}</label>
      <div className="w-full">
        <label className="flex justify-center items-center h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 form-group">
          <input
            type="file"
            onChange={resizeImageFile}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg, image/webp"
          />

          <div className="flex flex-col justify-center items-center p-6">
            {state ? (
              <img
                className="w-60 h-36 object-contain rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={URL.createObjectURL(state)}
                width={"auto"}
                height={"auto"}
                alt="image"
              />
            ) : (
              <>
                {image !== null ? (
                  <img
                    src={image}
                    width={"auto"}
                    height={"auto"}
                    alt="image"
                    className={`h-[150px] w-full object-contain rounded-md`}
                  />
                ) : (
                  <>
                    <svg
                      aria-hidden="true"
                      className="mb-1 w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-xs text-gray-500 ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (Recommended. 5:2)
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default MediaInputUpdate;

/* eslint-disable react/prop-types */
import { MdOutlineCloudUpload } from "react-icons/md";

const ProductInputMedia = ({
  label,
  image,
  setImage,
  required,
  data,
  size,
  recSize,
}) => {
  let file = data?.url;

  return (
    <div className="w-full">
      <label className="w-full">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full max-w-[400px]">
        <label
          className={`flex justify-center items-center 
          ${
            size || "h-40"
          } bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 form-group`}
        >
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />

          <div className="flex flex-col justify-center items-center p-6">
            {image ? (
              <>
                <img
                  className="w-60 h-36 object-contain rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={URL.createObjectURL(image)}
                  width={"auto"}
                  height={"auto"}
                  alt="image"
                />
              </>
            ) : (
              <>
                {!data ? (
                  <>
                    <MdOutlineCloudUpload className="h-8 w-8" />
                    <p className="mb-2 text-xs text-gray-500 ">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      (Recommended : {recSize || " 400 X 400 || 5:2"})
                    </p>
                  </>
                ) : (
                  <img
                    src={file}
                    width={"auto"}
                    height={"auto"}
                    alt="image"
                    className={`h-[150px] w-full object-cover rounded-md`}
                  />
                )}
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ProductInputMedia;

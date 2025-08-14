/* eslint-disable react/prop-types */

import { MdOutlineCloudUpload } from "react-icons/md";
import { resizeFile } from "../../../../utils/const_API";

const MediaInput = ({
  label,
  image,
  setImage,
  required,
  size,
  recSize,
  style,
}) => {
  const resizeImageFile = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={` ${style || "flex items-center"} `}>
      <label className={`${size || "col-sm-3"}`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full">
        <label className="flex justify-center items-center h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 form-group">
          <input type="file" onChange={resizeImageFile} className="hidden" />

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
                <MdOutlineCloudUpload className="h-8 w-8" />
                <p className="mb-2 text-xs text-gray-500 ">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500">
                  (Recommended : {recSize || " 400 X 400 || 5:2"})
                </p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default MediaInput;

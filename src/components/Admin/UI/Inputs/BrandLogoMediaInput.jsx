import { IoCloudUploadOutline } from "react-icons/io5";
import { resizeFile } from "../../../../utils/const_API";

/* eslint-disable react/prop-types */
const BrandLogoMediaInput = ({ label, img, setImage, logo }) => {
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
    <div>
      <label className="text-sm">{label}</label>
      <div className="w-full mt-1">
        <label className="flex justify-center items-center  h-40 w-40 lg:w-52 lg:h-52 bg-gray-200 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer form-group ">
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={resizeImageFile}
            className="hidden"
          />

          <div className="flex flex-col justify-center items-center p-6 ">
            {img ? (
              <>
                <img
                  className="w-60 h-36 object-contain rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={URL.createObjectURL(img)}
                  width={"auto"}
                  height={"auto"}
                  alt="image"
                />
              </>
            ) : (
              <>
                {!logo && !img ? (
                  <>
                    <IoCloudUploadOutline className="h-8 w-8 text-gray-400" />
                    <p className="mb-2 text-xs text-gray-400 ">
                      <span>Click to upload</span>
                    </p>
                  </>
                ) : (
                  <img
                    src={logo}
                    width={"auto"}
                    height={"auto"}
                    alt="image"
                    className={`h-[200px] w-full object-contain rounded-md`}
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

export default BrandLogoMediaInput;

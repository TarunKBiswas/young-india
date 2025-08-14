import { useState } from "react";
import { webState } from "../../../../data/webStates";
import { CheckOutButton } from "../Buttons";
import ModalBody from "./ModalBody";
import resizer from "../../../../utils/Store/resizer";

const BrandInfo = () => {
  const [logo, setLogo] = useState(null);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      resizer.imageFileResizer(
        file,
        400,
        400,
        "WEBP",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  // Image Resizer
  const resizeImageFile = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setLogo(image);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    webState.showBrandInfoModal = false;
  };

  return (
    <ModalBody closeModalHandler={closeModalHandler}>
      <div className="w-full max-w-[420px] mx-auto flex flex-col gap-3">
        {/* title and desc */}
        <div className="w-full flex items-center justify-center flex-col ">
          <span className="text-2xl text-black font-bold">Brand Info</span>
          <span className="text-sm font-normal">
            If you are a Reseller please provide your white label information
            here.
          </span>
        </div>
        {/* logo and instruction */}
        <div className="w-full flex items-center justify-center flex-col gap-2">
          <div className="flex items-center justify-center h-[100px] w-[100px] rounded-full border-themecolor border-4 ">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-4 bg-gray-50 rounded-lg "
            >
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                id="dropzone-file"
                onChange={resizeImageFile}
                className="hidden"
              />
              <div className="flex flex-col justify-center items-center">
                {logo ? (
                  <>
                    <img
                      className="h-[92px]  object-center object-cover rounded-full mt-2 ml-0"
                      src={URL.createObjectURL(logo)}
                      width={"auto"}
                      height={"auto"}
                      alt="image"
                    />
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="47"
                      height="47"
                      viewBox="0 0 47 47"
                      fill="none"
                    >
                      <path
                        d="M42.2266 17.625C42.2268 17.5227 42.2132 17.4208 42.1862 17.3221L39.5534 8.10566C39.3982 7.57045 39.074 7.0998 38.6293 6.76395C38.1846 6.4281 37.6432 6.24508 37.0859 6.24219H9.91406C9.35711 6.24547 8.81613 6.42868 8.3718 6.7645C7.92746 7.10031 7.60356 7.57075 7.4484 8.10566L4.81566 17.3221C4.788 17.4207 4.7738 17.5226 4.77344 17.625V20.5625C4.77297 21.6768 5.03941 22.775 5.55048 23.7652C6.06155 24.7554 6.80237 25.6088 7.71094 26.2539V38.1875C7.71094 38.8692 7.98174 39.523 8.46377 40.005C8.94579 40.487 9.59956 40.7578 10.2813 40.7578H36.7188C37.4004 40.7578 38.0542 40.487 38.5362 40.005C39.0183 39.523 39.2891 38.8692 39.2891 38.1875V26.2539C40.1976 25.6088 40.9384 24.7554 41.4495 23.7652C41.9606 22.775 42.227 21.6768 42.2266 20.5625V17.625ZM9.56707 8.71152C9.58872 8.63581 9.63413 8.56906 9.69661 8.52112C9.75909 8.47319 9.83532 8.44661 9.91406 8.44531H37.0859C37.1656 8.44543 37.2431 8.47146 37.3067 8.51948C37.3703 8.56751 37.4165 8.63491 37.4384 8.71152L39.6654 16.5234H7.34375L9.56707 8.71152ZM18.7266 18.7266H28.2734V20.5625C28.2734 21.8285 27.7705 23.0426 26.8753 23.9378C25.9801 24.833 24.766 25.3359 23.5 25.3359C22.234 25.3359 21.0199 24.833 20.1247 23.9378C19.2295 23.0426 18.7266 21.8285 18.7266 20.5625V18.7266ZM6.97656 18.7266H16.5234V20.5625C16.5234 21.8285 16.0205 23.0426 15.1253 23.9378C14.2301 24.833 13.016 25.3359 11.75 25.3359C10.484 25.3359 9.26986 24.833 8.37467 23.9378C7.47948 23.0426 6.97656 21.8285 6.97656 20.5625V18.7266ZM37.0859 38.1875C37.0859 38.2849 37.0473 38.3783 36.9784 38.4471C36.9095 38.516 36.8161 38.5547 36.7188 38.5547H10.2813C10.1839 38.5547 10.0905 38.516 10.0216 38.4471C9.95275 38.3783 9.91406 38.2849 9.91406 38.1875V27.293C11.3487 27.6834 12.8706 27.6052 14.2577 27.0698C15.6448 26.5345 16.8246 25.57 17.625 24.317C18.2546 25.3045 19.1229 26.1174 20.1498 26.6805C21.1766 27.2437 22.3289 27.5389 23.5 27.5389C24.6711 27.5389 25.8234 27.2437 26.8502 26.6805C27.8771 26.1174 28.7454 25.3045 29.375 24.317C30.1754 25.57 31.3552 26.5345 32.7423 27.0698C34.1294 27.6052 35.6513 27.6834 37.0859 27.293V38.1875ZM35.25 25.3359C33.984 25.3359 32.7699 24.833 31.8747 23.9378C30.9795 23.0426 30.4766 21.8285 30.4766 20.5625V18.7266H40.0234V20.5625C40.0234 21.8285 39.5205 23.0426 38.6253 23.9378C37.7301 24.833 36.516 25.3359 35.25 25.3359Z"
                        fill="#222222"
                      />
                    </svg>
                  </>
                )}
              </div>
            </label>
          </div>
          <span className="text-sm text-themecolor">Upload Logo</span>
          <span className="text-xs">
            Image should be 200px X 200px & less than 1 MB
          </span>
        </div>
        {/* input */}
        <div className="w-full flex items-center justify-center flex-col my-2">
          <div className="w-full flex flex-col items-start">
            <label htmlFor="" className="text-base font-medium">
              Business Name
            </label>
            <input
              type="text"
              className="webInputStyle text-sm"
              placeholder="Business Name"
            />
          </div>
        </div>
        {/* finish and submit button */}
        <div className="w-full flex items-center justify-center flex-col gap-2 ">
          <CheckOutButton
            text={"Finish"}
            style={"rounded-lg px-2"}
            // action={varifyOtpHandler}
          />
          <span className="cursor-pointer text-gray-400 hover:text-gray-500 hover:font-semibold transition-all duration-300 ease-in-out">
            Skip
          </span>
        </div>
      </div>
    </ModalBody>
  );
};

export default BrandInfo;

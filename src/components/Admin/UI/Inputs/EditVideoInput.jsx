/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const EditVideoInput = ({
  label,
  video,
  setVideo,
  size,
  required,
  prevVideo,
}) => {
  const handleChange = (e) => {
    let url = e.target.files[0];
    setVideo(url);
  };

  const videoRef = useRef();
  useEffect(() => {
    videoRef.current?.load();
  }, [video, prevVideo]);

  return (
    <div className="flex items-center">
      <label className={`${size || "col-sm-3"}  font-medium`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full">
        <label className="flex justify-center items-center h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 form-group ">
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={(e) => handleChange(e)}
            className="hidden"
          />
          <div className="flex flex-col justify-center items-center p-6 ">
            {video !== null ? (
              <video ref={videoRef} width="80" height="10px" controls>
                <source src={URL.createObjectURL(video)} />
              </video>
            ) : (
              <video ref={videoRef} width="80" height="10px" controls>
                <source src={prevVideo} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default EditVideoInput;

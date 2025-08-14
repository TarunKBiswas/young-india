/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

const VideoInput = ({ label, video, setVideo, size, required, style }) => {
  const handleChange = (e) => {
    let url = e.target.files[0];
    setVideo(url);
  };

  const videoRef = useRef();
  useEffect(() => {
    videoRef.current?.load();
  }, [video]);

  return (
    <div className={` ${style || "flex items-center"} `}>
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
            {video ? (
              <video ref={videoRef} width="80" height="10px" controls>
                <source src={video || URL.createObjectURL(video)} />
                Your browser does not support the video tag.
              </video>
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default VideoInput;

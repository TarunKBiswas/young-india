/* eslint-disable no-unused-vars */
import React from "react";
// import Lottie from 'react-lottie-player';
// import error from '../assets/animations/404-error.json'

const Error404 = () => {
  return (
    <>
      <div className="grid min-h-screen place-content-center bg-white">
        <div className="w-full text-center h-full">
          <strong className="text-slate-700 font-extrabold flex items-center justify-center">
            <p className="text-9xl ">4</p>
            <p className="animate-bounce text-9xl ">0</p>
            <p className="text-9xl">4</p>
          </strong>

          {/* <Lottie
                        loop
                        animationData={error}
                        play
                        style={{ width: 600, height: 300 }}
                  /> */}
          <p className="mt-4 text-slate-800 font-bold text-3xl ">
            Page Not Found
          </p>
        </div>
      </div>
    </>
  );
};

export default Error404;

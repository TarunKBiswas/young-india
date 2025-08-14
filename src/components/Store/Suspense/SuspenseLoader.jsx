/* eslint-disable react/prop-types */
import { Suspense } from "react";

const SuspenseLoader = ({ children }) => {
  return (
    <Suspense fallback={<div className="text-4xl text-black"></div>}>
      {children}
    </Suspense>
  );
};

export default SuspenseLoader;

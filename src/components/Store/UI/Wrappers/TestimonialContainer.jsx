import React from "react";

const TestimonialContainer = ({ className ,children}) => {
  return (
    <div
      className={` w-full md:max-w-[900px] xl:max-w-[1150px] 2xl:max-w-[1400px] ${className} `}
    >
      {children}
    </div>
  );
};

export default TestimonialContainer;

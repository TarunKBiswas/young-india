/* eslint-disable react/prop-types */
// import React from "react";

import invertedComma from "../../../../assets/website/invertedcomma.png";

const TestimonialItem = ({ testimonial }) => {
  return (
    <div
      className="flex flex-col text-center items-center gap-3 w-full md:gap-6 max-w-3xl mx-auto mb-8"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div className="rounded-full overflow-hidden w-[60px] h-[60px] md:h-[120px] md:w-[120px]">
        <img
          src={testimonial?.thumbnail?.url}
          className="rounded-full object-top object-cover w-full h-full"
          alt={testimonial.name}
          width={"auto"}
          height={"auto"}
        />
      </div>
      <div className="relative flex flex-col items-center gap-3 lg:w-full">
        <img
          src={invertedComma}
          alt="Inverted Comma"
          width={"auto"}
          height={"auto"}
          className="w-[30px] h-[30px] md:h-[50px] md:w-[50px] object-cover"
        />
        <span
          className={`text-[14px] md:text-[18px] leading-6 font-light myPara text-center`}
        >
          {testimonial?.content}
        </span>
      </div>
      <span className="font-gotham capitalize text-[16px] font-medium leading-5">
        {testimonial?.name}
      </span>
    </div>
  );
};

export default TestimonialItem;

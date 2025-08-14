/* eslint-disable react/prop-types */
const TestimonialCard = ({ testimonial }) => {

  return (
    <div className="myTestimony">
      <div className="flex flex-col text-center items-center gap-3 md:gap-6 max-w-[887px] mx-auto">
        <div className="rounded-full overflow-hidden w-[60px] h-[60px] md:h-[120px] md:w-[120px]">
          <img
            src={testimonial.image}
            className="rounded-full object-cover w-full h-full"
            alt={testimonial.name}
            width={"auto"}
            height={"auto"}
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <span
            className={`text-[14px] md:text-[18px] leading-6 font-light myPara text-center text-[#F5F5F5]`}
          >
            {testimonial.content}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-gotham text-[16px] font-medium leading-5">
            {testimonial.name}
          </span>
          <span className="font-light text-xs leading-3">
            {testimonial.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

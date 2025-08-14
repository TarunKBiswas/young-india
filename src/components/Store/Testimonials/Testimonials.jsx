/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createRef, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import TestimonialsCard from "./TestimonialsCard";
import { getTestimonialData } from "../../../utils/Store/Homepage";

const Testimonials = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [products, setProducts] = useState(testimonial?.slice(0, 4));
  const [current, setCurrent] = useState(1);
  const [clickDirection, setClickDirection] = useState();

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 801 });
  const isTablet = useMediaQuery({ minDeviceWidth: 600, maxDeviceWidth: 800 });
  const isMobile = useMediaQuery({ maxDeviceWidth: 599 });
  const rightRef = createRef();
  const leftRef = createRef();

  const testimonialData = async () => {
    try {
      let res = await getTestimonialData();
      if (res?.status === 200) {
        setTestimonial(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    testimonialData();
  }, []);

  function CarouselButton(props) {
    const { onClick, className, buttonRef } = props;

    return (
      <button
        className={twMerge([
          "w-10 h-10  items-center pointer-events-auto transition-transform before:!text-[0px] justify-center active:scale-90 z-50 rounded-full border hidden  bg-themecolor/90 hover:!bg-themecolor lg:w-16 lg:h-16 focus:!bg-themecolor/90",
          className,
        ])}
        onClick={onClick}
        ref={buttonRef}
      >
        <IoIosArrowBack className="w-7 h-7 text-white" />
      </button>
    );
  }

  useEffect(() => {
    if (current === 1) {
      setProducts(testimonial?.slice(3, 6));
      setCurrent(2);
    } else {
      setProducts(testimonial?.slice(0, 3));
      setCurrent(1);
    }
  }, [clickDirection]);

  return (
    <div className="mt-8 w-full">
      {testimonial && testimonial?.length > 0 && (
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={isDesktopOrLaptop ? 3 : isTablet ? 2 : 1}
          slidesToScroll={isDesktopOrLaptop ? 3 : isTablet ? 2 : 1}
          prevArrow={<CarouselButton buttonRef={rightRef} />}
          nextArrow={<CarouselButton buttonRef={leftRef} />}
        >
          {testimonial?.map((data, i) => {
            return (
              <div className="" key={i}>
                <TestimonialsCard key={i} data={data} />
              </div>
            );
          })}
        </Slider>
      )}
      <div className="w-full flex gap-4 pb-4 mt-3">
        <div
          className="h-10 relative flex items-center justify-end w-full cursor-pointer"
          onClick={() => rightRef.current.click()}
        >
          <div className=" w-10 h-10 flex items-center justify-center  absolute bg-white shadow-sm border">
            <IoIosArrowBack />{" "}
          </div>
        </div>
        <div
          className="h-10 relative flex items-center justify-start w-full cursor-pointer"
          onClick={() => leftRef.current.click()}
        >
          <div className=" w-10 h-10 flex items-center justify-center  absolute bg-white shadow-sm border">
            <IoIosArrowBack className="rotate-180" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

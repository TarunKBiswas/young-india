/* eslint-disable react/prop-types */
import Container from "../../UI/Wrappers/Container.Wrapper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialItem from "./TestimonialItem";

const Testimonial = ({ data }) => {
  return (
    <Container>
      <div className="w-full flex flex-col gap-5 items-center justify-center px-5 md:px-0">
        <span className="text-neutral-800 text-2xl lg:text-4xl text-center font-semibold leading-10 tracking-wide">
          Testimonials
        </span>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          pagination={{
            dynamicBullets: true,
          }}
          loop={true}
          className="testimonySwiper w-full"
        >
          {data?.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialItem testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Testimonial;

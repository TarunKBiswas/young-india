import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ScrollAnimation = (options = {}) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
      ...options,
    });
    AOS.refresh();
  }, [options]);
};

export default ScrollAnimation;

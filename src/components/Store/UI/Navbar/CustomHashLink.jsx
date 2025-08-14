/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const CustomHashLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollWithOffset = (el) => {
    const yOffset = -170;
    const yCoordinate =
      el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: yCoordinate, behavior: "smooth" });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/", { state: { targetHash: to }, replace: true });
    } else {
      scrollWithOffset(document.querySelector(to));
    }
  };

  return (
    <HashLink scroll={scrollWithOffset} onClick={handleClick} {...props}>
      {children}
    </HashLink>
  );
};

export default CustomHashLink;

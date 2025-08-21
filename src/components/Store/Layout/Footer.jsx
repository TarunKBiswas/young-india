/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
// import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";
import { webState } from "../../../data/webStates";
import { data } from "../../../data/FooterData";
import Container from "../UI/Wrappers/Container.Wrapper";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const Footer = ({ footRef }) => {
  const snap = useSnapshot(webState);
  const { brandInfo } = snap;

  const logo = brandInfo?.logo_light?.url;
  const name = brandInfo?.name;
  const tagline = brandInfo?.tagline;
  const facebook = brandInfo?.facebook;
  const instagram = brandInfo?.instagram;
  const youtube = brandInfo?.youtube;
  // const twitter = brandInfo?.telegram;
  const callingNumber = brandInfo?.calling_number;
  const email = brandInfo?.email;

  const socialMediaLinks = useMemo(
    () => [
      { name: "facebook", href: facebook },
      { name: "instagram", href: instagram },
      { name: "youtube", href: youtube },
    ],
    [facebook, instagram, youtube]
  );

  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="bg-[#111111] relative text-textcolor px-4 md:px-0.5 border-t"
      ref={footRef}
    >
      <Container className="w-full mx-auto sm:px-3 lg:px-1 py-10">
        <div className="w-full flex flex-col lg:flex-row justify-between gap-10 lg:mb-8 smalllaptop:!gap-0">
          <div className="flex flex-col items-start justify-start gap-4 smalllaptop:max-w-[300px] minilaptop:max-w-[200px]">
            <div className="flex flex-col gap-2">
              {logo && (
                <img
                  className="h-auto cursor-pointer max-w-28"
                  src={logo}
                  alt="Brand Logo"
                  onClick={moveToTop}
                />
              )}
              <p className="text-sm capitalize mt-2">{tagline}</p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold leading-6 tracking-widest">
                Follow Us On
              </h3>
              <div className="flex gap-4">
                {socialMediaLinks.map(({ name, href }) => {
                  const IconComponent =
                    name === "facebook" ? (
                      <IoLogoFacebook className="h-8 w-8" aria-hidden="true" />
                    ) : name === "instagram" ? (
                      <IoLogoInstagram className="h-8 w-8" aria-hidden="true" />
                    ) : name === "youtube" ? (
                      <IoLogoYoutube className="h-8 w-8" aria-hidden="true" />
                    ) : (
                      <span className="text-gray-400">Unknown</span>
                    );

                  // console.log(name, href);

                  return (
                    <a
                      key={name}
                      href={href}
                      target={href && "_blank"}
                      className={`${
                        !href && "pointer-events-none cursor-default"
                      } text-offWhite`}
                      rel="noreferrer"
                      title={href}
                    >
                      {IconComponent}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-10 lg:flex lg:w-3/6 smalllaptop:w-auto">
            <div className="lg:min-w-[200px] smalllaptop:!min-w-[160px] minilaptop:min-w-[150px]">
              <h3 className="text-base font-semibold leading-6 tracking-widest">
                Company
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {data?.about?.map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} className="text-sm leading-6 capitalize">
                      {name}
                    </a>
                  </li>
                ))}
                <li>
                  <Link to="/blogs" className="text-sm leading-6 capitalize">
                  Blogs
                  </Link>
                </li>
                {/* <li>
                  <a
                    href="mission&vision"
                    className="text-sm leading-6 capitalize"
                  >
                    Mission & Vision
                  </a>
                </li> */}
              </ul>
            </div>

            <div className="lg:min-w-[200px] smalllaptop:!min-w-[160px] minilaptop:min-w-[150px]">
              <h3 className="text-base font-semibold leading-6 tracking-widest">
                More Info
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {data?.info?.map(({ name, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className="text-sm leading-6 font-normal capitalize"
                    >
                      {name}
                    </a>
                  </li>
                ))}
                {/* <li>
                  <a href="faq" className="text-sm leading-6 capitalize">
                    FAQ
                  </a>
                </li> */}
              </ul>
            </div>

            <div className="hidden lg:flex flex-col gap-4">
              <h3 className="text-base font-semibold leading-6 tracking-widest">
                Get in Touch
              </h3>
              <div className="w-full flex items-center gap-2">
                <FaPhone />
                <span className="text-offWhite cursor-pointer">
                  +91 {callingNumber}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <IoMdMail className="h-5 w-5 mt-0.5" />
                <span className="text-offWhite cursor-pointer">{email}</span>
              </div>
            </div>
          </div>

          {window.location.hostname?.includes("purecrop") && (
            <div className="lg:hidden">
              <h3 className="text-base font-semibold leading-6 tracking-widest">
                Get in Touch
              </h3>
              <div className="w-full flex items-center gap-2">
                <FaPhone />
                <span className="text-offWhite cursor-pointer">
                  +91 {callingNumber}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <IoMdMail className="h-5 w-5" />
                <span className="text-offWhite cursor-pointer">{email}</span>
              </div>
              <iframe
                style={{ border: "none" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d698.3492818505042!2d74.62857627893898!3d16.876474494944823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc123365ade3c77%3A0x6b9d006062c25e52!2sPureCrop%20Biotech%20PVT%20LTD!5e1!3m2!1sen!2sin!4v1726205735875!5m2!1sen!2sin"
                className="w-full h-full min-h-[200px] !border-0 !ring-0"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>

        <hr className="w-full my-3" />

        <div className="w-full flex flex-col lg:flex-row lg:gap-4 items-center justify-center sm:justify-between text-offWhite">
          <p className="text-xs capitalize font-normal leading-6">
            &copy; {name}. All rights reserved.
          </p>
          <p className="text-xs font-normal leading-6 tracking-wider flex flex-col xl:flex-row items-center">
            &copy; Designed and Developed by
            <a
              href="https://socialseller.in/"
              target="_blank"
              rel="noreferrer"
              className="px-1 text-xs flex items-center leading-6 tracking-wide text-green-500"
            >
              Social Seller Technology
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

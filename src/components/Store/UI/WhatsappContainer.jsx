/* eslint-disable react-hooks/exhaustive-deps */
import { BsWhatsapp } from "react-icons/bs";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";

const WhatsappContainer = () => {
  const snap = useSnapshot(webState);

  return (
    <>
      {/*desktop  */}
      <div className="hidden lg:flex ">
        <div
          className={`z-10 fixed right-8 bg-[#25d366] w-[55px] h-[55px] flex items-center justify-center text-white rounded-full text-center cursor-pointer bottom-10`}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <a
            href={`https://api.whatsapp.com/send?phone=${`${snap?.brandInfo?.whatsapp_number}`}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp
              className="h-6 w-6 text-white"
              data-aos="fade-up"
              data-aos-duration="1000"
            />
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex lg:hidden">
        <div
          className={`z-10 fixed right-8 bg-[#25d366] w-[55px] h-[55px] flex items-center justify-center text-white rounded-full text-center cursor-pointer bottom-10`}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <a
            href={`https://api.whatsapp.com/send?phone=${`+91 ${snap?.brandInfo?.whatsapp_number}`}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp className="h-6 w-6 text-white" />
          </a>
        </div>
      </div>
    </>
  );
};

export default WhatsappContainer;

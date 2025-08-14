import { IoLogoWhatsapp } from "react-icons/io";
import { webState } from "../../../../data/webStates";
import SimpleModal from "../../../Admin/Modals/SimpleModal";
import { useSnapshot } from "valtio";

const JoinCommunityModal = () => {
  const snap = useSnapshot(webState);
  const groupLink = snap.whatsappCommunityData[0]?.url;

  const closeModalHandler = () => {
    webState.joinCommunityModal = false;
  };

  const handleWhatsAppClick = () => {
    window.open(groupLink, "_blank");
  };

  return (
    <SimpleModal
      modalSize={"max-w-xl"}
      closeModalHandler={closeModalHandler}
      position={"items-center"}
    >
      <div className="py-8">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div>
            <IoLogoWhatsapp className="fill-green-500 h-12 w-12" />
          </div>
          <span className="w-full flex flex-col gap-1.5 capitalize text-center text-gray-900 text-xl">
            <span className="font-medium"> Join WhatsApp Community</span>{" "}
            <span className="text-sm text-gray-600 ">for Daily Updates</span>
          </span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center border-t border-gray-300">
        <a
          href={`https://api.whatsapp.com/send?phone=${`+91${snap?.brandInfo?.whatsapp_number}`}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block lg:hidden w-full hover:bg-gray-100 transition-all duration-300 text-black text-center px-4 py-3 text-sm lg:text-base rounded-l-none cursor-pointer"
        >
          Chat With Seller
        </a>
        <a
          href={`https://api.whatsapp.com/send?phone=${`${snap?.brandInfo?.whatsapp_number}`}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:block w-full hover:bg-gray-100 transition-all duration-300 text-black text-center px-4 py-3 text-sm lg:text-base rounded-l-none cursor-pointer"
        >
          Chat With Seller
        </a>

        <div
          className="w-full border-l border-gray-300 text-center hover:bg-gray-100 transition-all duration-300 text-black px-4 py-3 text-sm lg:text-base rounded-l-none cursor-pointer"
          onClick={handleWhatsAppClick}
        >
          Join Now
        </div>
      </div>
    </SimpleModal>
  );
};

export default JoinCommunityModal;

import Container from "../UI/Wrappers/Container.Wrapper";
import { PrimaryButton } from "../UI/Buttons";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";

const Contact = () => {
  const snap = useSnapshot(webState);
  const number = snap?.brandInfo?.whatsapp_number;

  const redirectToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?phone=${number}`, "_blank");
  };

  return (
    <Container>
      <div
        className="w-full flex flex-col items-center justify-center mb-10 md:my-20"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <span className="text-neutral-800 text-2xl lg:text-4xl text-center font-semibold leading-10 tracking-wide">
          Still Can’t Find What You Are Looking For ?
        </span>

        <PrimaryButton title={"Contact us"} onCLick={redirectToWhatsApp} />
      </div>
    </Container>
  );
};

export default Contact;

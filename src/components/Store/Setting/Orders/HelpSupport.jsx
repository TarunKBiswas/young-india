import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="border border-[#222222]/20 flex flex-col gap-2.5 p-2.5 mb-3 lg:mb-0">
        <span className="text-sm uppercase text-[#222222]/60">
          Need help with your order?
        </span>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => navigate("/contact_us")}
        >
          <span className="text-sm uppercase text-[#5D94F1]">
            help and support
          </span>
          <span className="rotate-180">
            <AiOutlineLeft />{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default HelpSupport;

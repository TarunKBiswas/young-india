/* eslint-disable react/prop-types */
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BreadCrumb = ({ page }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-center gap-2 mt-[30px] text-base font-normal leading-normal ">
      <div
        className={`flex items-center gap-1  ${
          page === "cart" ? "text-themecolor font-normal" : "text-darkText"
        } cursor-pointer`}
        onClick={() => navigate("/cart")}
      >
        <span className="text-sm">Cart</span>
        <AiOutlineRight className="h-3 w-3" />
      </div>
      <div
        className={`flex items-center gap-1 ${
          page === "checkout"
            ? " text-themecolor font-normal "
            : "text-[#8E9E8E]"
        } cursor-pointer`}
        onClick={() => navigate("/checkout")}
      >
        <span className="text-sm">Checkout</span>
        <AiOutlineRight className="h-3 w-3" />
      </div>
      <div
        className={`flex items-center gap-1 ${
          page === "payment" ? " text-themecolor font-normal" : "text-[#8E9E8E]"
        } cursor-pointer`}
        // onClick={() => navigate("/payment")}
      >
        <span className="text-sm">Payment</span>
      </div>
    </div>
  );
};

export default BreadCrumb;

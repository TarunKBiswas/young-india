import ModalBody from "./ModalBody";
import { webState } from "../../../../data/webStates";
import { useNavigate } from "react-router-dom";

const CartInfoModal = () => {
  const navigate = useNavigate();

  const closeModalHandler = () => {
    webState.cartInfoModal = false;
  };

  const cartHandler = () => {
    navigate("/cart");
    webState.cartInfoModal = false;
  };

  return (
    <ModalBody closeModalHandler={closeModalHandler}>
      <p className="w-full text-center text-base text-themecolor">
        This Product is already added on Your Cart{" "}
      </p>
      <div className="w-full flex items-center justify-center mt-3">
        <button
          className="border-1 border-themecolor cursor-pointer py-1 px-2.5 "
          onClick={() => cartHandler()}
        >
          <span className="text-themecolor text-sm">Go to Cart</span>
        </button>
      </div>
    </ModalBody>
  );
};

export default CartInfoModal;

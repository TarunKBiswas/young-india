import ModalBody from "./ModalBody";
import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import { notify } from "../HotToast";

const ItemRemoveModal = () => {
  const snap = useSnapshot(webState);

  const closeModalHandler = () => {
    webState.itemRemove = false;
  };

  const removeProductHandler = (productId) => {
    webState.cartProducts = webState.cartProducts?.filter(
      // (i) => i?.productId !== productId
      (i) => i?.selectedVariant?.id !== productId?.selectedVariant?.id
    );
    webState.itemRemove = false;
  };

  const addToWishlistHandler = (productId) => {
    const data = snap.cartProducts?.find((i) => i?.productId === productId);
    webState.wishListProducts?.push(data);
    webState.itemRemove = false;
    removeProductHandler(productId);
    notify("Moved to Wishlist");
  };

  return (
    <ModalBody closeModalHandler={closeModalHandler}>
      <p className="text-md text-themecolor">Remove item</p>
      <span className="text-sm capitalize font-normal mt-3">
        Are you sure you want to remove this item from cart
      </span>
      <hr className="w-full my-4" />
      <div className="flex items-center justify-center gap-5 mb-2 w-full">
        <button
          onClick={() => removeProductHandler(webState.selectCartProduct)}
          className="text-xs lg:text-sm font-medium text-themecolor border-[1px] border-gray-300 px-2.5 hover:scale-95 transition-all duration-300 py-1 rounded"
        >
          Remove
        </button>

        <button
          className="text-xs lg:text-sm font-medium text-themecolor border-[1px] border-gray-300 px-2.5 hover:scale-95 transition-all duration-300 py-1 rounded"
          onClick={() => addToWishlistHandler(webState.selectCartProduct)}
        >
          Move To Wishlist
        </button>
      </div>
    </ModalBody>
  );
};

export default ItemRemoveModal;

import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import SimpleModal from "../../Admin/Modals/SimpleModal";
import CouponCard from "../ProductDetail/CouponCard";

const CouponModal = () => {
  const snap = useSnapshot(webState);
  const data = snap.cartProducts;

  const closeModalHandler = () => {
    webState.showCouponModal = false;
  };

  return (
    <SimpleModal
      position={"lg:items-center"}
      closeModalHandler={closeModalHandler}
    >
      <div className="w-full p-6 grid grid-cols-2 gap-4">
        {data?.map((coupon) => {
          return (
            <div key={coupon?.id}>
              {coupon?.coupon?.map((data) => {
                return (
                  <div key={data?.id}>
                    <CouponCard data={data} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </SimpleModal>
  );
};

export default CouponModal;

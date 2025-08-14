import { useSnapshot } from "valtio";
import PaymentMethodCard from "./PaymentMethodCard";
import { webState } from "../../../../data/webStates";

const PaymentMehod = () => {
  const snap = useSnapshot(webState);
  return (
    <div className="w-full flex flex-col items-start bg-white p-3">
      <span className="text-lg text-darkText font-medium cursor-pointer flex items-center gap-2">
        Payment
      </span>
      <span className="text-xs mt-1">
        All transactions are secure and encrypted
      </span>
      <PaymentMethodCard
        text={"Complete Order"}
        data={snap.cartProducts}
      />
      {/* </div> */}
    </div>
  );
};

export default PaymentMehod;

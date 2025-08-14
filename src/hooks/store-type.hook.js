import { useState } from "react";
import { useSnapshot } from "valtio";
import { webState } from "../data/webStates";
import storeTypes from "../lib/store-types";

function useStoreType() {
  const snap = useSnapshot(webState);
  const [isEcomm, setIsEcomm] = useState(true);
  const [isResellEcom, setIsResellEcom] = useState(true);
  const [isB2B, setIsB2B] = useState(true);
  const [isWhatsapp, setIsWhatsapp] = useState(true);

  useState(() => {
    setIsEcomm(snap.storeType === storeTypes.ecomm);
    setIsResellEcom(snap.storeType === storeTypes.resellerEcom);
    setIsB2B(snap.storeType === storeTypes.b2b);
    setIsWhatsapp(snap.storeType === storeTypes.whatsappEcom);
  }, [snap.storeType]);

  return {
    isEcomm,
    isResellEcom,
    isB2B,
    isWhatsapp,
  };
}

export default useStoreType;

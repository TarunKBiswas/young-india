/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
import { webState } from "../../data/webStates";
import { useEffect, useState } from "react";

function StoreType({ show, children }) {
  const snap = useSnapshot(webState);
  const [showComp, setShowComp] = useState(true);

  useEffect(() => {
    setShowComp(show?.includes(snap.storeType));
  }, [snap.storeType]);

  return <>{showComp && <>{children}</>}</>;
}

export default StoreType;

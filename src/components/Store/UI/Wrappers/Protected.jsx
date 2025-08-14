/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";

const Protected = ({ children }) => {
  const [local, setLocal] = useState(false);
  const navigate = useNavigate();

  const snap = useSnapshot(webState);

  useEffect(() => {
    if (snap.resellerToken) {
      setLocal(true);
    } else {
      navigate("/");
    }
  }, [snap.resellerToken]);

  useEffect(() => {
    sessionStorage?.getItem("activeButton");
  }, [webState.selectPayment, sessionStorage?.getItem("activeButton")]);

  return <>{local && <>{children}</>}</>;
};

export default Protected;

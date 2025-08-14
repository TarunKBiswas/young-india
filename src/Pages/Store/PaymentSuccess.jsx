import { useEffect } from "react";
import Lottie from "react-lottie-player";
import success from "../../assets/animations/success.json";
import { useNavigate } from "react-router-dom";
import { webState } from "../../data/webStates";
import { trackPurchase } from "../../lib/FbPixelEvent";
import ConfettiExplosion from "react-confetti-explosion";
// import { useSnapshot } from "valtio";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPurchase();
  }, []);

  const navigateHandler = () => {
    webState.cartProducts = [];
    navigate("/");
    window.location.reload();
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, [2000]);
  };

  return (
    <div className="w-full max-w-[70vw] mx-auto h-screen flex flex-col items-center justify-center gap-3">
      <ConfettiExplosion
        force={0.8}
        duration={3000}
        particleCount={200}
        width={1600}
      />
      <Lottie
        loop
        animationData={success}
        play
        style={{ width: 500, height: 150 }}
      />
      <div className="w-full text-center flex flex-col gap-2 capitalize">
        <span className="text-themecolor text-3xl">Thank You!</span>
        <span className="text-lg">Order Placed Successfully</span>
      </div>
      <div
        onClick={navigateHandler}
        className="bg-black/60 cursor-pointer transition-all duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back To Shopping
      </div>
    </div>
  );
};

export default PaymentSuccess;

/* eslint-disable react/prop-types */
import Lottie from "react-lottie-player";
import animate from "../../../assets/animations/no_product.json";

const NoDataAnime = ({ msg }) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col ">
      <Lottie
        loop
        animationData={animate}
        play
        style={{ width: 500, height: 350 }}
      />
      <p className="mt-2 text-slate-500  text-xl ">{msg}</p>
    </div>
  );
};

export default NoDataAnime;

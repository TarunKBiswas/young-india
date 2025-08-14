import Lottie from "react-lottie-player";
import failed from "../../../assets/animations/anime_failed.json";

const FailureModal = () => {
  return (
    <div className="bg-black/[.50] fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-2xl  md:h-auto">
        <div className="relative bg-transparent rounded-lg w-full">
          <div className="p-6 lg:p-8">
            {/* <h3 className="text-xl font-bold text-gray-900 text-center">
              Are You Sure?
            </h3> */}
            <div className="w-full flex items-center justify-center pt-6">
              <Lottie
                loop
                animationData={failed}
                play
                style={{ width: 100, height: 100 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;

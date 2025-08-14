import Lottie from 'react-lottie-player';
import animate from '../../src/assets/animations/500-error.json'

const Error500 = () => {
    return (
        <div className="grid min-h-screen place-content-center bg-white">
            <div className="w-full text-center h-full">
                <Lottie
                    loop
                    animationData={animate}
                    play
                    style={{ width: 600, height: 300 }}
                />
                <p className="mt-8 text-slate-800 font-bold text-4xl ">
                    Under Maintanance
                </p>
            </div>
        </div>
    )
}

export default Error500
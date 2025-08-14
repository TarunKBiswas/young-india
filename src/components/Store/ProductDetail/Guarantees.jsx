/* eslint-disable react/prop-types */
import cod from "../../../assets/website/cod.png";
import paytm from "../../../assets/website/paytm.png";
import visa from "../../../assets/website/visa.png";
import mastercard from "../../../assets/website/mastercard.png";
import phonepe from "../../../assets/website/phonepe.png";

const data = [cod, paytm, visa, mastercard, phonepe];
const Guarantees = ({ showText }) => {
  return (
    <div className=" px-2  flex flex-col gap-3 mt-4 items-center justify-center">
      <p className="text-sm text-center 2xl:text-base font-medium text-black ">
        {showText && "Guaranteed Safe & Secure Checkout"}
      </p>
      <div className="w-full flex gap-4 items-center justify-evenly mt-1">
        {data.map((d, i) => {
          return (
            <div className="flex gap-6 items-center justify-center" key={i}>
              <img
                src={d}
                width={"auto"}
                height={"auto"}
                alt="image"
                className="w-10 h-10 2xl:w-12 2xl:h-12 object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Guarantees;

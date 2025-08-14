/* eslint-disable react/prop-types */
const OrderCardButton = ({ func, text, display }) => {
  return (
    <div
      className={` ${
        display ? display : "hidden"
      }  px-3 py-2 rounded justify-center bg-themecolor/5 border lg:h-8 items-center gap-1.5  cursor-pointer`}
      onClick={func}
    >
      <div className=" text-center text-neutral-800 text-xs uppercase leading-tight tracking-wide">
        {text}
      </div>
    </div>
  );
};

export default OrderCardButton;

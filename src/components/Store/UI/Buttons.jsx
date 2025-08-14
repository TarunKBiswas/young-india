/* eslint-disable no-sparse-arrays */
/* eslint-disable react/prop-types */
import { HiMinus, HiOutlinePlusSm } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import { IoIosArrowRoundForward } from "react-icons/io";

export const ApplyButton = ({ action, text }) => {
  return (
    <button
      className="w-20 h-9 text-center text-white text-sm font-medium leading-tight rounded bg-themecolor cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={action}
    >
      {text}
    </button>
  );
};

export const ResetButton = ({ action }) => {
  return (
    <button
      className="text-neutral-800 text-opacity-50 text-sm font-medium leading-tight cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={action}
    >
      Reset
    </button>
  );
};

export const QuantityButton = ({ quantity, addQuantityHandler, dec }) => {
  return (
    <div className="w-full py-2 lg:px-6 h-[60px] lg:h-[47px] bg-white rounded-md border border-gray-200  flex justify-center items-center gap-4 lg:gap-8">
      <span className="rounded-full px-2">
        <HiMinus className="w-5 h-5 cursor-pointer" onClick={dec} />
      </span>
      <span className="text-center text-neutral-800 text-base lg:text-xl font-semibold leading-normal">
        {quantity}
      </span>
      <span className="rounded-full px-2">
        <HiOutlinePlusSm
          className="h-5 w-5 text-black cursor-pointer"
          onClick={addQuantityHandler}
        />
      </span>
    </div>
  );
};

export const SecoundaryButton = ({ action, title, Icon }) => {
  return (
    <div
      className={`p-2 lg:px-4 h-[60px] lg:h-[47px] flex items-center justify-center gap-2 w-full rounded-md bg-themecolor text-center border-gray-200 text-textcolor text-xs lg:text-base font-medium leading-relaxed cursor-pointer `}
      onClick={action}
    >
      {Icon && <Icon className="w-6 h-6 text-textcolor " />}
      <span className="text-base font-normal text-textcolor">{title}</span>
    </div>
  );
};

export const CheckOutButton = ({ text, action, style }) => {
  return (
    <button
      type="submit"
      className={`hover:bg-themecolor py-3 rounded-md font-medium leading-normal
        cursor-pointer text-white bg-themecolor text-base ${style}`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export const OrderButton = ({ action, text, className }) => {
  return (
    <button
      onClick={action}
      className={` text-sm border rounded text-themecolor flex items-center justify-center h-12 text-center lg:text-base font-medium leading-normal ${className}`}
    >
      {text}
    </button>
  );
};

export const RegisterButton = ({ action, text }) => {
  return (
    <button
      type="submit"
      className={`w-full border border-transparent bg-white text-themecolor px-2 py-1 rounded text-base font-medium`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export const ActionButtons = ({ action, title, Icon, className }) => {
  return (
    <div
      className={`border border-gray-200 px-28 py-1.5 h-[60px] lg:h-[52px] rounded-md justify-center items-center gap-2 inline-flex cursor-pointer ${className}`}
      onClick={action}
    >
      {Icon && <Icon className={`w-5 h-5`} />}
      <span className="text-center min-w-max text-base font-normal leading-relaxed ">
        {title}
      </span>
    </div>
  );
};

export const PaymentMethodButton = ({
  activeButton,
  action,
  Icon,
  title,
  buttonNum,
  amount,
}) => {
  return (
    <div
      className={` flex items-center justify-between rounded-md h-[60px] w-full gap-1 cursor-pointer px-3  ${
        activeButton === buttonNum
          ? "border-[1px] bg-themecolor text-gray-200"
          : " border border-themecolor/95  "
      }`}
      onClick={() => action(buttonNum)}
    >
      <div className="w-full flex items-center gap-2">
        <Icon
          className={`w-5 h-5  ${
            activeButton === buttonNum
              ? " fill-gray-100"
              : "  border-themecolor/95  "
          }`}
        />
        <span className="text-sm font-medium ">{title}</span>
      </div>
      <div className="w-full flex items-center justify-end">
        {amount && (
          <span className="flex text-xs xl:text-sm">
            {amount === "₹ " + undefined || 0 ? "0" : amount}
          </span>
        )}
      </div>
    </div>
  );
};

export const HeadingName = ({ title, className, classNameTitle }) => {
  return (
    <div
      className={`lg:border-l-4 lg:border-themecolor w-full flex items-center justify-center lg:justify-start ${className} `}
    >
      <span
        className={`pl-2 font-medium text-xl lg:text-2xl uppercase tracking-wide ${classNameTitle}`}
      >
        {title}
      </span>
    </div>
  );
};

export const ViewButton = ({ text, action }) => {
  return (
    <div className="w-full flex items-center justify-center my-5">
      <div
        className="justify-start px-7 lg:px-10 py-2 rounded-md border border-1 border-themecolor items-center gap-1.5 flex cursor-pointer"
        onClick={action}
      >
        <div className=" text-base leading-7 tracking-normal">{text}</div>
      </div>
    </div>
  );
};

export const PrimaryButton = ({ onCLick, title, className }) => {
  return (
    <div
      className={`px-7 lg:px-10 py-2 bg-themecolor flex-col rounded-md justify-center cursor-pointer items-center gap-2.5 inline-flex mt-5  ${className}`}
      onClick={onCLick}
    >
      <div className="justify-start items-center gap-1.5 flex">
        <span className="text-textcolor font-medium text-base  leading-7 tracking-normal">
          {title}
        </span>
      </div>
    </div>
  );
};

export const FilterButton = ({ title, children }) => {
  return (
    <div className="w-full flex flex-col gap-2.5  ">
      <div className=" text-neutral-800 text-base font-medium leading-normal ">
        {title}
      </div>
      <div className="flex flex-col justify-start mt-2 gap-3 lg:gap-4 ">
        {children}
      </div>
    </div>
  );
};

export const FormButton = ({ title, description }) => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-2">
      <div className="text-neutral-800 text-3xl font-bold text-center">
        {title}
      </div>
      <div className="text-neutral-400 text-sm font-normal leading-tight">
        {description}
      </div>
    </div>
  );
};

export const CheckoutSubmitButton = ({ title, isLoading, action }) => {
  return (
    <div
      type="button"
      className="bg-themecolor hover:scale-95 transition-all duration-500 rounded text-textcolor border-0 outline-none h-[52px] text-[16px] flex content-center leading-[100%] items-center w-full cursor-pointer justify-center"
      onClick={action}
    >
      {isLoading ? (
        <CgSpinner size={20} className="mt-1 animate-spin" />
      ) : (
        <span className="flex text-base justify-center items-center gap-2 font-bold">
          {title}
          <IoIosArrowRoundForward className="h-5 w-5" />
        </span>
      )}
    </div>
  );
};

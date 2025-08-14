/* eslint-disable react/prop-types */
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FormContainer = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <IoMdArrowRoundBack
          className="hover:scale-125 transition-all duration-500 cursor-pointer text-2xl"
          onClick={() => navigate(-1)}
        />
        <span className="text-xl font-semibold">{title}</span>
      </div>
    </div>
  );
};

export default FormContainer;

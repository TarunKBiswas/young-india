/* eslint-disable react/prop-types */
import { BsInfoCircleFill, BsPencil, BsTrash } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi2";
import { SiMicrosoftexcel } from "react-icons/si";

const Actions = ({
  data,
  detailsHandler,
  editHandler,
  deleteHandler,
  infoHandler,
  exportHandler,
}) => {
  return (
    <div className="flex items-center gap-3">
      {detailsHandler ? (
        <HiOutlineEye
          className="h-5 w-5 cursor-pointer text-gray-500 hover:scale-90 transition-all duration-300"
          onClick={() => detailsHandler(data?.id)}
        />
      ) : null}

      {infoHandler ? (
        <BsInfoCircleFill
          className="h-5 w-5 cursor-pointer text-[#222222] hover:scale-90 transition-all duration-300"
          onClick={() => infoHandler(data?.id)}
        />
      ) : null}

      {exportHandler ? (
        <SiMicrosoftexcel
          className="h-5 w-5 cursor-pointer text-green-700 hover:scale-90 transition-all duration-300"
          onClick={() => exportHandler(data?.id)}
        />
      ) : null}

      {editHandler ? (
        <BsPencil
          className="h-4 w-4 cursor-pointer text-gray-500 hover:scale-90 transition-all duration-300"
          onClick={() => editHandler(data?.id)}
        />
      ) : null}

      {deleteHandler ? (
        <BsTrash
          className="h-5 w-5 cursor-pointer text-gray-500 hover:text-red-700 hover:scale-90 transition-all duration-200"
          onClick={() => deleteHandler(data?.id)}
        />
      ) : null}
    </div>
  );
};

export default Actions;

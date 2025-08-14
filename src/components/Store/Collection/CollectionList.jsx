/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const CollectionList = ({ collection }) => {
  const navigate = useNavigate();

  const collectionHandler = (id) => {
    navigate(`collection/${id}`);
  };

  const item = collection;

  return (
    <div
      key={item?.id}
      className="flex items-center flex-col cursor-pointer min-w-[110px] max-w-[200px] lg:min-w-[180px] mx-auto mt-3 "
      onClick={() => collectionHandler(item?.id)}
    >
      <img
        src={item?.thumbnail?.formats?.thumbnail?.url}
        width={"auto"}
        height={"auto"}
        alt="image"
        className="w-full h-[75px] object-cover lg:h-[120px] object-top rounded-md"
      />
      <span className="text-black pt-2 text-xs lg:text-base">{item?.name}</span>
    </div>
  );
};

export default CollectionList;
